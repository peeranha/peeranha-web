/* eslint no-param-reassign: 0, indent: 0, consistent-return: 0 */
import { Api, JsonRpc } from 'eosjs';
import ecc from 'eosjs-ecc';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs2';
import { TextEncoder, TextDecoder } from 'text-encoding';
import orderBy from 'lodash/orderBy';

import { AUTOLOGIN_DATA } from 'containers/Login/constants';

import {
  BLOCKCHAIN_NAME,
  DEFAULT_EOS_PERMISSION,
  SCATTER_APP_NAME,
  EOS_IS_NOT_INIT,
  ENDPOINTS_LIST,
} from './constants';

import { parseTableRows, createPushActionBody } from './ipfs';
import { ApplicationError, BlockchainError } from './errors';
import { payForCpu } from './web_integration/src/wallet/pay-for-cpu/pay-for-cpu';
import { getNodes } from './web_integration/src/wallet/get-nodes/get-nodes';

if (!window.TextDecoder) {
  window.TextDecoder = TextDecoder;
}

if (!window.TextEncoder) {
  window.TextEncoder = TextEncoder;
}

class EosioService {
  constructor() {
    this.initialized = false;
    this.scatterInstalled = null;
    this.node = null;
    this.isScatterWindowOpened = false;
    this.isInvalidNodeHandling = false;
  }

  initScatter = async () => {
    this.node = await this.getNode();

    const scatterConfig = this.getScatterConfig();

    ScatterJS.plugins(new ScatterEOS());

    const network = ScatterJS.Network.fromJson(scatterConfig);
    const rpc = new JsonRpc(network.fullhost());
    const connected = await ScatterJS.connect(
      SCATTER_APP_NAME,
      { network },
    );

    if (!connected) throw new Error('No connection with Scatter');

    const eos = ScatterJS.eos(network, Api, { rpc });

    window.scatter = null;

    return {
      transact: eos.transact,
      authorityProvider: rpc,
    };
  };

  initEosioWithScatter = async scatterInstance => {
    if (!this.node) {
      this.node = await this.getNode();
    }

    this.selectedAccount = await this.selectAccount();
    this.initialized = true;
    this.scatterInstalled = Boolean(scatterInstance);
    this.eosApi = scatterInstance;
  };

  initEosioWithoutScatter = async (key, account) => {
    this.node = await this.getNode();

    const keys = key ? [key] : [];
    const signatureProvider = new JsSignatureProvider(keys);
    const rpc = new JsonRpc(this.node.endpoint, { fetch });

    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });

    this.eosApi = api;
    this.initialized = true;
    this.selectedAccount = account;
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
    const autologinData = JSON.parse(
      sessionStorage.getItem(AUTOLOGIN_DATA) ||
        localStorage.getItem(AUTOLOGIN_DATA),
    );

    if (!autologinData) return null;

    return this.selectedAccount;
  };

  forgetIdentity = async () => {
    if (ScatterJS.scatter && ScatterJS.scatter.identity) {
      await ScatterJS.scatter.forgetIdentity();
    }
  };

  selectAccount = async () => {
    await this.forgetIdentity();

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

  sendTransaction = async (
    actor,
    action,
    data,
    account,
    waitForGettingToBlock,
  ) => {
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
      if (this.isScatterWindowOpened) {
        throw new ApplicationError('Popup is already opened');
      }

      try {
        this.isScatterWindowOpened = true;

        const trx = await this.eosApi.transact(transaction, {
          ...transactionHeader,
        });

        if (waitForGettingToBlock) {
          await this.awaitTransactionToBlock(trx.processed.block_num);
        }

        this.isScatterWindowOpened = false;
        return;
      } catch (err) {
        this.isScatterWindowOpened = false;
        throw err;
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
      throw new BlockchainError(message);
    }
  };

  awaitTransactionToBlock = async blockId => {
    try {
      await this.eosApi.authorityProvider.get_block(blockId);
    } catch ({ message }) {
      if (message.match('Could not find block')) {
        await this.awaitTransactionToBlock(blockId);
      } else {
        throw new Error(message);
      }
    }
  };

  getTableRow = async (table, scope, primaryKey, code) => {
    const limit = 1;

    const res = await this.getTableRows(
      table,
      scope,
      primaryKey,
      limit,
      primaryKey,
      undefined,
      undefined,
      code,
    );

    return res[0];
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
        return response.rows;
      }

      return [];
    } catch (err) {
      await this.handleCaseWithInvalidNode(err.message);
    }
  };

  getScatterConfig = () => ({
    blockchain: BLOCKCHAIN_NAME,
    protocol: process.env.SCATTER_PROTOCOL || this.node.protocol,
    host: process.env.SCATTER_HOST || this.node.host,
    port: process.env.SCATTER_PORT || this.node.port,
    chainId: process.env.SCATTER_CHAINID || this.node.chainID,
  });

  handleCaseWithInvalidNode = async errorMsg => {
    try {
      if (!this.isInvalidNodeHandling) {
        this.isInvalidNodeHandling = true;

        const { nodes, date } = this.getStoredNodes();

        if (!nodes.length) throw new Error(errorMsg);

        nodes[0].isInvalid = true;

        localStorage.setItem(
          ENDPOINTS_LIST,
          JSON.stringify({
            date,
            nodes,
          }),
        );

        window.location.reload();
      }
    } catch (err) {
      this.isInvalidNodeHandling = false;
      throw err;
    }
  };

  getStoredNodes = () => {
    try {
      const { nodes, date } = JSON.parse(localStorage.getItem(ENDPOINTS_LIST));

      return {
        date,
        nodes: nodes && nodes.length > 0 ? nodes.filter(x => !x.isInvalid) : [],
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

      return bestServerNode;
    } catch (err) {
      return this.getDefaultEosConfig();
    }
  };

  getDefaultEosConfig = () => ({
    host: process.env.EOS_HOST_DEFAULT,
    endpoint: process.env.EOS_ENDPOINT_DEFAULT,
    protocol: process.env.EOS_PROTOCOL_DEFAULT,
    port: process.env.EOS_PORT_DEFAULT,
    chainId: process.env.EOS_CHAINID_DEFAULT,
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
}

export default EosioService;
