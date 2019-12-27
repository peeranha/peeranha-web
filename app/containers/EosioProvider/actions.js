/*
 *
 * EosioProvider actions
 *
 */

import { INIT_EOSIO, INIT_EOSIO_SUCCESS, INIT_EOSIO_ERROR } from './constants';

export function initEosio(key, initWithScatter, selectedAccount) {
  return {
    type: INIT_EOSIO,
    key,
    initWithScatter,
    selectedAccount,
  };
}

export function initEosioSuccess(eos, scatter) {
  return {
    type: INIT_EOSIO_SUCCESS,
    eos,
    scatter,
  };
}

export function initEosioError(error) {
  return {
    type: INIT_EOSIO_ERROR,
    error,
  };
}
