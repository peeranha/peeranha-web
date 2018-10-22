/*
 *
 * getCurrentAccount actions
 *
 */

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  SELECT_ACCOUNT,
  SELECT_ACCOUNT_SUCCESS,
  SELECT_ACCOUNT_ERROR,
} from './constants';

export function getCurrentAccount() {
  return {
    type: GET_CURRENT_ACCOUNT,
  };
}

export function getCurrentAccountSuccess(acc, eosInit) {
  return {
    type: GET_CURRENT_ACCOUNT_SUCCESS,
    acc,
    eosInit,
  };
}

export function getCurrentAccountError(err) {
  return {
    type: GET_CURRENT_ACCOUNT_ERROR,
    err,
  };
}

/*
 *
 * selectAccount actions
 *
 */

export function selectAccount(methods) {
  return {
    type: SELECT_ACCOUNT,
    methods,
  };
}

export function selectAccountSuccess(eosInit, acc) {
  return {
    type: SELECT_ACCOUNT_SUCCESS,
    eosInit,
    acc,
  };
}

export function selectAccError(selectAccountError) {
  return {
    type: SELECT_ACCOUNT_ERROR,
    selectAccountError,
  };
}
