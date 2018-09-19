import Eosjs from 'eosjs';

const contractAccount = 'peerania.dev';

const eosioConfig = {
  httpEndpoint: 'http://127.0.0.1:8888',
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  keyProvider: ['5JV2aCujE9j5dUkFKJGtyzeTsgMAHCovQ8QhxKHd9eZpJDfMDmZ'],
  broadcast: true,
  sign: true,
};

export function getEosio() {
  return Eosjs(eosioConfig);
}

export async function getTableRows(scope, table) {
  return await getEosio().getTableRows(true, contractAccount, scope, table);
}

export async function sendTransaction(actor, action, data) {
  return await getEosio().transaction({
    actions: [
      {
        account: actor,
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
