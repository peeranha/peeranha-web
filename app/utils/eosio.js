import Eosjs from 'eosjs';

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

export function getEosio() {
  return Eosjs(eosioConfig);
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
