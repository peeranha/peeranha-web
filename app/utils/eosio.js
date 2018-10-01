import Eosjs from 'eosjs';
import ScatterJS from 'scatter-js/dist/scatter.cjs';

const contractAccount = 'peerania.dev';

const eosioConfig = {
  httpEndpoint: 'http://127.0.0.1:8888',
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  keyProvider: [
    '5JUnu1jgVifdznEHpc9eVedpLXsyDPwu69xziMm9ZvbRSkVKEda',
    '5JV2aCujE9j5dUkFKJGtyzeTsgMAHCovQ8QhxKHd9eZpJDfMDmZ',
    '5KgZw1vCGLSvwQUPFWeBxJFeYHuhQvz6XLa5p6vupwpwhFbaLLF',
  ],
  broadcast: true,
  sign: true,
};

const scatterNetwork = {
  blockchain: 'eos',
  protocol: process.env.REACT_APP_EOS_PROTOCOL,
  host: process.env.EOS_HOST,
  port: process.env.EOS_PORT,
  chainId: process.env.EOS_CHAIN_ID,
};

export function getEosio() {
  return Eosjs(eosioConfig);
}

export async function connectToWallet() {
  const conneted = await ScatterJS.scatter.connect('Peerania');

  if (conneted) {
    scatter = ScatterJS.scatter;
    window.scatter = null;
  }

  return conneted;
}

export async function getSelectedAccount() {
  const connected = await ScatterJS.scatter.connect('Peerania');

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

  return null;
}

export async function sendTransaction(actor, action, data) {
  return getEosio().transaction({
    actions: [
      {
        account: contractAccount,
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

function getEosConfig() {}
