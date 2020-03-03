/* eslint no-param-reassign: 0, indent: 0, consistent-return: 0 */
import Eosjs16 from 'eosjs16';
import { Api, JsonRpc } from 'eosjs20';
import ecc from 'eosjs-ecc';
import { JsSignatureProvider } from 'eosjs20/dist/eosjs-jssig';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import { TextEncoder, TextDecoder } from 'text-encoding';
import orderBy from 'lodash/orderBy';

import { AUTOLOGIN_DATA } from 'containers/Login/constants';
import blockchainErrors from 'containers/ErrorPage/blockchainErrors';

import {
  BLOCKCHAIN_NAME,
  DEFAULT_EOS_PERMISSION,
  SCATTER_APP_NAME,
  EOS_IS_NOT_INIT,
  ENDPOINTS_LIST,
  SCATTER_TIMEOUT_ERROR,
  SCATTER_TIMEOUT_DURATION,
} from './constants';

import { parseTableRows, createPushActionBody } from './ipfs';
import { ApplicationError, BlockchainError } from './errors';
import { payForCpu } from './web_integration/src/wallet/pay-for-cpu/pay-for-cpu';
import { getNodes } from './web_integration/src/wallet/get-nodes/get-nodes';
import { getCookie } from './cookie';

if (!window.TextDecoder) {
  window.TextDecoder = TextDecoder;
}

if (!window.TextEncoder) {
  window.TextEncoder = TextEncoder;
}

class EosioService {
  #key;

  constructor() {
    this.initialized = false;
    this.scatterInstalled = null;
    this.node = null;
    this.isScatterWindowOpened = false;
    this.#key = null;
  }

  initScatter = async () => {
    ScatterJS.plugins(new ScatterEOS());

    const connected = await ScatterJS.scatter.connect(SCATTER_APP_NAME);

    if (!connected) throw new Error('No connection with Scatter');
  };

  initEosioWithScatter = async () => {
    try {
      await this.initScatter();
      this.node = await this.getNode();

      const scatterConfig = this.getScatterConfig();
      const eosOptions = {};

      this.selectedAccount = await this.selectAccount();
      this.initialized = true;
      this.scatterInstalled = true;

      const api = ScatterJS.scatter.eos(scatterConfig, Eosjs16, eosOptions);

      this.eosApi = {
        transaction: api.transaction,
        authorityProvider: {
          get_table_rows: api.getTableRows,
          history_get_key_accounts: api.getKeyAccounts,
          get_account: api.getKeyAccounts,
          get_block: api.getBlock,
        },
      };
    } catch (err) {
      this.scatterInstalled = false;
      this.initialized = false;
    }
  };

  initEosioWithoutScatter = async (key, acc) => {
    this.node = await this.getNode();

    const keys = key ? [key] : [];
    const signatureProvider = new JsSignatureProvider(keys);
    const rpc = new JsonRpc(this.node.endpoint, { fetch });

    this.eosApi = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
    this.initialized = true;
    this.selectedAccount = acc;
    this.#key = key;
  };

  privateToPublic = privateKey => {
    try {
      return ecc.privateToPublic(privateKey);
    } catch (err) {
      return null;
    }
  };

  publicToAccounts = async publicKey => {
    if (!publicKey) {
      return null;
    }

    const accounts = await this.eosApi.authorityProvider.history_get_key_accounts(
      publicKey,
    );

    if (accounts && accounts.account_names) {
      return accounts.account_names[0] || null;
    }

    return null;
  };

  getAccount = async eosName => {
    try {
      const accountInfo = await this.eosApi.authorityProvider.get_account(
        eosName,
      );

      return accountInfo;
    } catch (err) {
      return null;
    }
  };

  getSelectedAccount = async () => {
    const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

    if (!autoLoginData) return null;

    return this.selectedAccount;
  };

  forgetIdentity = async () => {
    try {
      if (ScatterJS.scatter && ScatterJS.scatter.identity) {
        await ScatterJS.scatter.forgetIdentity();
      }
    } catch ({ message }) {
      console.log(message);
    }
  };

  selectAccount = async () => {
    const requiredFields = { accounts: [this.getScatterConfig()] };

    let result;
    try {
      result = await ScatterJS.scatter.getIdentity(requiredFields);
    } catch (error) {
      return null;
    }

    const account = result.accounts.find(x => x.blockchain === BLOCKCHAIN_NAME);

    if (!account) {
      return null;
    }

    this.selectedAccount = account.name;

    return account.name;
  };

  isScatterClosed = async () => {
    // Race - if identity is unavailable - wait $SCATTER_TIMEOUT_DURATION -
    const identity = await Promise.race([
      ScatterJS.scatter.getIdentity(),
      new Promise(res => {
        setTimeout(() => {
          res(SCATTER_TIMEOUT_ERROR);
        }, SCATTER_TIMEOUT_DURATION);
      }),
    ]);

    if (identity === SCATTER_TIMEOUT_ERROR) {
      throw new Error(SCATTER_TIMEOUT_ERROR);
    }
  };

  sendTransaction = async (
    actor,
    action,
    data,
    account,
    waitForGettingToBlock,
  ) => {
    const { endpoint } = this.node;

    if (!this.initialized) throw new ApplicationError(EOS_IS_NOT_INIT);

    Object.keys(data).forEach(x => {
      if (typeof data[x] === 'string') {
        data[x] = data[x].trim();
      }
    });

    createPushActionBody(data);

    const transaction = {
      actions: [
        {
          account: account || process.env.EOS_CONTRACT_ACCOUNT,
          name: action,
          authorization: [
            {
              actor,
              permission: DEFAULT_EOS_PERMISSION,
            },
          ],
          data: {
            ...data,
          },
        },
      ],
    };

    const transactionHeader = {
      blocksBehind: 3,
      expireSeconds: 60,
    };

    const initializedWithScatter = !this.eosApi.signatureProvider;

    if (initializedWithScatter) {
      try {
        if (this.isScatterWindowOpened) {
          throw new ApplicationError('Scatter window is already opened');
        }

        this.isScatterWindowOpened = true;

        await this.isScatterClosed();

        const trx = await this.eosApi.transaction(transaction);

        if (waitForGettingToBlock) {
          await this.awaitTransactionToBlock(trx.processed.block_num);
        }

        this.isScatterWindowOpened = false;

        return;
      } catch ({ message }) {
        this.isScatterWindowOpened = false;
        throw new BlockchainError(message);
      }
    }

    try {
      const serverTransactionPushArgs = await payForCpu(
        transaction,
        transactionHeader,
      );

      if (!serverTransactionPushArgs) {
        throw new Error('No server args');
      }

      await this.eosApi.transact(transaction, {
        ...transactionHeader,
        sign: false,
        broadcast: false,
      });

      const requiredKeys = await this.eosApi.signatureProvider.getAvailableKeys();
      const serializedTx = serverTransactionPushArgs.serializedTransaction;
      const signArgs = {
        chainId: this.node.chainID,
        requiredKeys,
        serializedTransaction: serializedTx,
        abis: [],
      };

      const pushTransactionArgs = await this.eosApi.signatureProvider.sign(
        signArgs,
      );

      pushTransactionArgs.signatures.unshift(
        serverTransactionPushArgs.signatures[0],
      );

      const trx = await this.eosApi.pushSignedTransaction(pushTransactionArgs);

      if (waitForGettingToBlock) {
        await this.awaitTransactionToBlock(trx.processed.block_num);
      }
    } catch ({ message }) {
      const isHandled = Object.keys(blockchainErrors).find(x =>
        message.match(blockchainErrors[x].keywords.toLowerCase()),
      );

      if (isHandled) throw new BlockchainError(message);

      const method = this.sendTransaction.bind(
        null,
        actor,
        action,
        data,
        account,
        waitForGettingToBlock,
      );

      const res = await this.handleCaseWithInvalidNode(
        method,
        message,
        endpoint,
      );

      return res;
    }
  };

  awaitTransactionToBlock = async blockId => {
    let waitCycle = 0;
    let success = false;
    while (waitCycle < 20) {
      console.log('Waiting for transaction to complete...');
      try {
        // eslint-disable-next-line no-await-in-loop
        await this.eosApi.authorityProvider.get_block(blockId);
        success = true;
        break;
      } catch ({ message }) {
        if (!message.match('Could not find block')) {
          throw new Error(message);
        }
      }
      // eslint-disable-next-line no-await-in-loop
      await this.sleep(500);
      // eslint-disable-next-line no-plusplus
      waitCycle++;
    }

    if (!success) {
      console.log('Gave up on waiting for tx to complete.');
    }
  };

  getTableRow = async (table, scope, primaryKey, code) => {
    const limit = 1;

    const { rows } = await this.getTableRows(
      table,
      scope,
      primaryKey,
      limit,
      primaryKey,
      undefined,
      undefined,
      code,
    );

    return rows[0];
  };

  getTableRows = async (
    table,
    scope,
    lowerBound,
    limit,
    upperBound,
    indexPosition,
    keyType,
    code,
  ) => {
    const { endpoint } = this.node;

    if (!this.initialized) throw new ApplicationError(EOS_IS_NOT_INIT);

    try {
      const request = {
        json: true,
        code: code || process.env.EOS_CONTRACT_ACCOUNT,
        scope,
        table,
        lower_bound: lowerBound,
        upper_bound: upperBound,
        limit,
        index_position: indexPosition,
        key_type: keyType,
      };

      const response = await this.eosApi.authorityProvider.get_table_rows(
        request,
      );

      if (response && response.rows) {
        response.rows.forEach(x => parseTableRows(x));
        return response;
      }

      return [];
    } catch ({ message }) {
      const method = this.getTableRows.bind(
        null,
        table,
        scope,
        lowerBound,
        limit,
        upperBound,
        indexPosition,
        keyType,
        code,
      );

      const res = await this.handleCaseWithInvalidNode(
        method,
        message,
        endpoint,
      );

      return res;
    }
  };

  getScatterConfig = () => ({
    blockchain: BLOCKCHAIN_NAME,
    protocol: process.env.SCATTER_PROTOCOL || this.node.protocol,
    host: process.env.SCATTER_HOST || this.node.host,
    port: process.env.SCATTER_PORT || this.node.port,
    chainId: process.env.SCATTER_CHAINID || this.node.chainID,
  });

  handleCaseWithInvalidNode = async (method, errorMsg, endpoint) => {
    try {
      const { nodes, date } = this.getStoredNodes();

      if (!nodes.length && this.getDefaultEosConfig().endpoint === endpoint)
        throw new Error(errorMsg);

      if (nodes.find(x => x.endpoint === endpoint)) {
        localStorage.setItem(
          ENDPOINTS_LIST,
          JSON.stringify({
            date,
            nodes: nodes.filter(x => x.endpoint !== endpoint),
          }),
        );
      }

      const initializedWithScatter = this.eosApi
        ? Boolean(!this.eosApi.signatureProvider)
        : false;

      if (initializedWithScatter) {
        await this.initEosioWithScatter();
      } else {
        await this.initEosioWithoutScatter(this.#key, this.selectedAccount);
      }

      return await method();
    } catch (err) {
      throw err;
    }
  };

  getStoredNodes = () => {
    try {
      const { nodes, date } = JSON.parse(localStorage.getItem(ENDPOINTS_LIST));

      return {
        date,
        nodes: nodes || [],
      };
    } catch (err) {
      return { nodes: [] };
    }
  };

  getServerNode = async () => {
    try {
      const { allEndpoints } = await getNodes();

      if (!allEndpoints.length) throw new Error('No server nodes');

      const endpointsSortedByRating = orderBy(allEndpoints, 'rating', 'desc');

      const bestServerNode = endpointsSortedByRating[0];

      localStorage.setItem(
        ENDPOINTS_LIST,
        JSON.stringify({
          date: Date.now(),
          nodes: endpointsSortedByRating,
        }),
      );

      return bestServerNode
        ? { ...bestServerNode, chainId: bestServerNode.chainID }
        : null;
    } catch (err) {
      return this.getDefaultEosConfig();
    }
  };

  getDefaultEosConfig = () => ({
    host: process.env.EOS_HOST_DEFAULT,
    endpoint: process.env.EOS_ENDPOINT_DEFAULT,
    protocol: process.env.EOS_PROTOCOL_DEFAULT,
    port: process.env.EOS_PORT_DEFAULT,
    chainID: process.env.EOS_CHAINID_DEFAULT,
  });

  getNode = async () => {
    const { nodes, date } = this.getStoredNodes();
    let serverNodePromise;

    if (!date || Date.now() - +process.env.NEW_ENDPOINT_PERIOD > date) {
      serverNodePromise = this.getServerNode();
    }

    if (nodes.length) return nodes[0];

    const serverNode = await serverNodePromise;

    if (serverNode) return serverNode;

    return this.getDefaultEosConfig();
  };

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
}

export default EosioService;
