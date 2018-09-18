import { getEosio } from './eosioFactory';

const contractAccount = 'peerania.dev';

export function isSignedIn() {
  // hardcoding initial version
  return true;
}

export function getCurrentAccountName() {
  // hardcoding for initial version
  return 'user1';
}

export function getTableRows(scope, table) {
  return getEosio().getTableRows(true, contractAccount, scope, table);
}

export function sendTransaction(actor, action, data) {
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
