/*
 *
 * getCurrentAccount actions
 *
 */

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  SELECT_POPUP_ACCOUNT,
  SELECT_POPUP_ACCOUNT_SUCCESS,
  SELECT_POPUP_ACCOUNT_ERROR,
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

export function selectPopupAccount(callbackFunction) {
  return {
    type: SELECT_POPUP_ACCOUNT,
    callbackFunction,
  };
}

export function selectPopupAccountSuccess(eosInit, acc) {
  return {
    type: SELECT_POPUP_ACCOUNT_SUCCESS,
    eosInit,
    acc,
  };
}

export function selectPopupAccountError(selectAccountError) {
  return {
    type: SELECT_POPUP_ACCOUNT_ERROR,
    selectAccountError: selectAccountError.message,
  };
}
