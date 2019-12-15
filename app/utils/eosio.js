import Eosjs from 'eosjs';
import ecc from 'eosjs-ecc';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

import { AUTOLOGIN_DATA } from 'containers/Login/constants';

import {
  BLOCKCHAIN_NAME,
  DEFAULT_EOS_PERMISSION,
  SCATTER_APP_NAME,
  EOS_IS_NOT_INIT,
  SCATTER_IN_NOT_INSTALLED,
  BEST_NODE_SERVICE,
  LOCAL_STORAGE_BESTNODE,
} from './constants';

import { parseTableRows, createPushActionBody } from './ipfs';
import { ApplicationError, BlockchainError } from './errors';

class EosioService {
  constructor() {
    this.initialized = false;
    this.eosInstance = null;
    this.scatterInstance = null;
    this.scatterInstalled = null;
    this.node = null;
    this.isScatterWindowOpened = false;
  }

  init = async (
    privateKey,
    initWithScatter = false,
    selectedAccount = null,
  ) => {
    const loginData = JSON.parse(
      sessionStorage.getItem(AUTOLOGIN_DATA) ||
        localStorage.getItem(AUTOLOGIN_DATA),
    );

    this.node = await this.getNode();

    if ((loginData && loginData.loginWithScatter) || initWithScatter) {
      await this.initScatter();

      if (this.scatterInstalled) {
        this.initEosioWithScatter();
      } else {
        this.initEosioWithoutScatter(privateKey);
      }
    } else {
      this.initEosioWithoutScatter(privateKey);
    }

    this.initialized = true;
    this.selectedAccount = selectedAccount;

    this.compareSavedAndBestNodes();
  };

  initScatter = async () => {
    ScatterJS.plugins(new ScatterEOS());

    const connected = await ScatterJS.scatter.connect(SCATTER_APP_NAME);

    this.scatterInstalled = connected === true;

    if (this.scatterInstalled) {
      this.scatterInstance = ScatterJS.scatter;
      window.scatter = null;
    } else {
      this.scatterInstance = null;
    }
  };

  initEosioWithoutScatter = key => {
    const eosioConfig = this.getEosioConfig(key);
    this.eosInstance = Eosjs(eosioConfig);
  };

  initEosioWithScatter = () => {
    const scatterConfig = this.getScatterConfig();
    const eosOptions = {};
    this.eosInstance = this.scatterInstance.eos(
      scatterConfig,
      Eosjs,
      eosOptions,
    );
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

    const accounts = await this.eosInstance.getKeyAccounts(publicKey);

    if (accounts && accounts.account_names) {
      return accounts.account_names[0] || null;
    }

    return null;
  };

  getAccount = async eosName => {
    try {
      const accountInfo = await this.eosInstance.getAccount(eosName);
      return accountInfo;
    } catch (err) {
      return null;
    }
  };

  getSelectedAccount = async () => {
    const loginData = JSON.parse(
      sessionStorage.getItem(AUTOLOGIN_DATA) ||
        localStorage.getItem(AUTOLOGIN_DATA),
    );

    if (!loginData) return null;

    if (loginData.email) {
      return this.selectedAccount;
    }

    if (loginData.loginWithScatter) {
      if (!this.initialized || !this.scatterInstalled) return null;

      if (
        this.scatterInstance.identity === undefined ||
        this.scatterInstance.identity == null
      )
        return null;

      const account = this.scatterInstance.identity.accounts.find(
        x => x.blockchain === BLOCKCHAIN_NAME,
      );

      if (!account) {
        return null;
      }

      return account.name;
    }

    return null;
  };

  forgetIdentity = async () => {
    if (this.scatterInstance && this.scatterInstance.identity) {
      await this.scatterInstance.forgetIdentity();
      return true;
    }

    return null;
  };

  selectAccount = async () => {
    if (!this.initialized) throw new ApplicationError(EOS_IS_NOT_INIT);

    if (!this.scatterInstalled)
      throw new ApplicationError(SCATTER_IN_NOT_INSTALLED);

    const requiredFields = { accounts: [this.getScatterConfig()] };

    let result;
    try {
      result = await this.scatterInstance.getIdentity(requiredFields);
    } catch (error) {
      return null;
    }

    const account = result.accounts.find(x => x.blockchain === BLOCKCHAIN_NAME);

    if (!account) {
      return null;
    }

    return account.name;
  };

  // TODO: test
  sendTransaction = async (actor, action, data, account) => {
    if (!this.initialized) throw new ApplicationError(EOS_IS_NOT_INIT);

    /* eslint no-param-reassign: 0 */
    Object.keys(data).forEach(x => {
      if (typeof data[x] === 'string') {
        data[x] = data[x].trim();
      }
    });

    createPushActionBody(data);

    if (this.isScatterWindowOpened) {
      throw new ApplicationError('Scatter window is already opened');
    }

    if (this.scatterInstance) {
      this.isScatterWindowOpened = true;
    }

    try {
      const res = await this.eosInstance.transaction({
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
      });

      this.isScatterWindowOpened = false;

      return res;
    } catch (err) {
      this.isScatterWindowOpened = false;
      throw new BlockchainError(err);
    }
  };

  getTableRow = async (table, scope, primaryKey, code) => {
    if (!this.initialized) throw new ApplicationError(EOS_IS_NOT_INIT);

    const request = {
      json: true,
      code: code || process.env.EOS_CONTRACT_ACCOUNT,
      scope,
      table,
      lower_bound: primaryKey,
      upper_bound: primaryKey,
      limit: 1,
    };

    const response = await this.eosInstance.getTableRows(request);

    if (response && response.rows && response.rows.length) {
      parseTableRows(response.rows[0]);
      return response.rows[0];
    }

    return null;
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

    const response = await this.eosInstance.getTableRows(request);

    if (response && response.rows) {
      response.rows.forEach(x => parseTableRows(x));
      return response.rows;
    }

    return [];
  };

  getEosioConfig = key => ({
    httpEndpoint: this.node.endpoint,
    chainId: this.node.chainID,
    keyProvider: [key],
    broadcast: true,
    sign: true,
  });

  getScatterConfig = () => ({
    blockchain: BLOCKCHAIN_NAME,
    protocol: process.env.SCATTER_PROTOCOL || this.node.protocol,
    host: process.env.SCATTER_HOST || this.node.host,
    port: process.env.SCATTER_PORT || this.node.port,
    chainId: process.env.SCATTER_CHAINID || this.node.chainID,
  });

  getNode = () => {
    const node = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BESTNODE));
    return node || this.getBestNode();
  };

  getBestNode = () =>
    fetch(process.env.WALLET_API_ENDPOINT + BEST_NODE_SERVICE, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ region: process.env.NODE_REGION }),
    }).then(x => x.json());

  compareSavedAndBestNodes = async () => {
    const savedNode = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BESTNODE));
    const bestNode = await this.getBestNode();

    if (!savedNode || savedNode.endpoint !== bestNode.endpoint) {
      localStorage.setItem(LOCAL_STORAGE_BESTNODE, JSON.stringify(bestNode));
    }
  };
}

export default EosioService;
