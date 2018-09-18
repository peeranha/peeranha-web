import Eosjs from 'eosjs';

const eosioConfig = {
  httpEndpoint: '127.0.0.1:8888',
  chainId: '111',
  keyProvider: ['5JV2aCujE9j5dUkFKJGtyzeTsgMAHCovQ8QhxKHd9eZpJDfMDmZ'],
  broadcast: true,
  sign: true,
};

export function getEosio() {
  return Eosjs(eosioConfig);
}
