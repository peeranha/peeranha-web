/*
 *
 * EosioProvider actions
 *
 */

import { INIT_EOSIO, INIT_EOSIO_SUCCESS, INIT_EOSIO_ERROR } from './constants';

export function initEosio() {
  return {
    type: INIT_EOSIO,
  };
}

export function initEosioSuccess(
  eosioInstance,
  scatterInstalled,
  scatterInstance,
) {
  return {
    type: INIT_EOSIO_SUCCESS,
    eosioInstance,
    scatterInstalled,
    scatterInstance,
  };
}

export function initEosioError(error) {
  return {
    type: INIT_EOSIO_ERROR,
    error,
  };
}
