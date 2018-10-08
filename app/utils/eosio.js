import Eosjs from 'eosjs';
import ScatterJS from 'scatter-js/dist/scatter.cjs';

import { makeSelectScatterInstance } from 'containers/EosioProvider/selectors';

const contractAccount = 'peerania.dev';

export function getEosio() {
  console.log('Initializing EOSIO provider without Scatter.');
  const eosioConfig = getEosioConfig();
  const eosio = Eosjs(eosioConfig);
  return eosio;
}

export async function getScatter() {
  const installed = await ScatterJS.scatter.connect('Peerania');
  let scatterInstance = null;

  if (installed) {
    console.log('Successfully connected to scatter.');
    scatterInstance = ScatterJS.scatter;
    window.scatter = null;
  }

  return scatterInstance;
}

export function getScatterEosio(scatterInstance) {
  console.log('Initializing Scatter EOSIO Provider.');
  const scatterConfig = getScatterConfig();
  const eosOptions = {};
  const eosInstance = scatterInstance.eos(scatterConfig, Eos, eosOptions);
  return eosInstance;
}

export function getSelectedAccount() {
  const scatter = makeSelectScatterInstance();

  /* const connected = await ScatterJS.scatter.connect('Peerania');

  return scatterNetwork;

  if (connected) {
    const scatter = ScatterJS.scatter;
    const requiredFields = { accounts: [scatterNetwork] };

    let result;
    try {
      result = await scatter.getIdentity(requiredFields);
    } catch (error) {
      return error;
    }

    const account = result.accounts.find(
      x => x.blockchain === scatterNetwork.blockchain,
    );

    const eosOptions = { expireInSeconds: 60 };

    window.eos = scatter.eos(scatterNetwork, Eosjs, eosOptions);

    return account.name;
  }

  return null; */
  return scatter.indentity.name;
}

export async function selectAccount() {}

export async function sendTransaction(actor, action, data) {
  return getEosio().transaction({
    actions: [
      {
        account: process.env.EOS_CONTRACT_ACCOUNT,
        name: action,
        authorization: [
          {
            actor,
            permission: 'active',
          },
        ],
        data: {
          ...data,
        },
      },
    ],
  });
}

export async function getTableRow(table, scope, primaryKey) {
  const request = {
    json: true,
    code: contractAccount,
    scope,
    table,
    lower_bound: primaryKey,
    limit: 1,
  };

  const response = await getEosio().getTableRows(request);

  if (response && response.rows && response.rows.length) {
    return response.rows[0];
  }

  return null;
}

export async function getTableRows(table, scope) {
  const request = {
    json: true,
    code: contractAccount,
    scope,
    table,
  };

  const response = await getEosio().getTableRows(request);

  if (response && response.rows) {
    return response.rows;
  }

  return [];
}

function getEosioConfig() {
  return {
    httpEndpoint: process.env.EOS_DEFAULT_HTTP_ENDPOINT,
    chainId: process.env.EOS_CHAIN_ID,
    broadcast: true,
    sign: true,
  };
}

function getScatterConfig() {
  return {
    blockchain: 'eos',
    protocol: process.env.EOS_SCATTER_PROTOCOL,
    host: process.env.EOS_SCATTER_HOST,
    port: process.env.EOS_SCATTER_PORT,
    chainId: process.env.EOS_CHAIN_ID,
  };
}
