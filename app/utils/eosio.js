import Eosjs from 'eosjs';
import ScatterJS from 'scatter-js/dist/scatter.cjs';

import {
  BLOCKCHAIN_NAME,
  DEFAULT_EOS_PERMISSION,
  SCATTER_APP_NAME,
} from './constants';

class EosioService {
  constructor() {
    this.initialized = false;
    this.eosInstance = null;
    this.scatterInstance = null;
    this.scatterInstalled = null;
  }

  init = async () => {
    await this.initScatter();

    if (this.scatterInstalled) {
      this.initEosioWithScatter();
    } else {
      this.initEosioWithoutScatter();
    }

    this.initialized = true;
  };

  initScatter = async () => {
    const connected = await ScatterJS.scatter.connect(SCATTER_APP_NAME);
    this.scatterInstalled = connected === true;

    if (this.scatterInstalled) {
      console.log('Successfully connected to scatter.');
      this.scatterInstance = ScatterJS.scatter;
      window.scatter = null;
    } else {
      this.scatterInstance = null;
    }
  };

  initEosioWithoutScatter = () => {
    console.log('Initializing EOSIO provider without Scatter.');
    const eosioConfig = this.getEosioConfig();
    this.eosInstance = Eosjs(eosioConfig);
  };

  initEosioWithScatter = () => {
    console.log('Initializing Scatter EOSIO Provider.');
    const scatterConfig = this.getScatterConfig();
    const eosOptions = {};
    this.eosInstance = this.scatterInstance.eos(
      scatterConfig,
      Eosjs,
      eosOptions,
    );
    console.log('Successfully initialized Scatter EOSIO Provider.');
  };

  getSelectedAccount = () => {
    if (!this.initialized) throw new Error('EOS is not initialized.');

    if (!this.scatterInstalled) throw new Error('Scatter is not installed.');

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
  };

  selectAccount = async () => {
    if (!this.initialized) throw new Error('EOS is not initialized.');

    if (!this.scatterInstalled) throw new Error('Scatter is not installed.');

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

  sendTransaction = (actor, action, data) => {
    if (!this.initialized) throw new Error('EOS is not initialized.');

    return this.eosInstance.transaction({
      actions: [
        {
          account: process.env.EOS_CONTRACT_ACCOUNT,
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
  };

  getTableRow = async (table, scope, primaryKey) => {
    if (!this.initialized) throw new Error('EOS is not initialized.');

    const request = {
      json: true,
      code: process.env.EOS_CONTRACT_ACCOUNT,
      scope,
      table,
      lower_bound: primaryKey,
      limit: 1,
    };

    const response = await this.eosInstance.getTableRows(request);

    if (response && response.rows && response.rows.length) {
      return response.rows[0];
    }

    return null;
  };

  getTableRows = async (table, scope) => {
    if (!this.initialized) throw new Error('EOS is not initialized.');

    const request = {
      json: true,
      code: process.env.EOS_CONTRACT_ACCOUNT,
      scope,
      table,
    };

    const response = await this.eosInstance.getTableRows(request);

    if (response && response.rows) {
      return response.rows;
    }

    return [];
  };

  getEosioConfig = () => ({
    httpEndpoint: process.env.EOS_DEFAULT_HTTP_ENDPOINT,
    chainId: process.env.EOS_CHAIN_ID,
    broadcast: true,
    sign: true,
  });

  getScatterConfig = () => ({
    blockchain: BLOCKCHAIN_NAME,
    protocol: process.env.EOS_SCATTER_PROTOCOL,
    host: process.env.EOS_SCATTER_HOST,
    port: process.env.EOS_SCATTER_PORT,
    chainId: process.env.EOS_CHAIN_ID,
  });
}

export default EosioService;
