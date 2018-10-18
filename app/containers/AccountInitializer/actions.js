/*
 *
 * getCurrentAccount actions
 *
 */

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  INIT_SCATTER,
  INIT_SCATTER_SUCCESS,
  INIT_SCATTER_ERROR,
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
 * init Scatter actions
 *
 */

export function initScatter() {
  return {
    type: INIT_SCATTER,
  };
}

export function initScatterSuccess() {
  return {
    type: INIT_SCATTER_SUCCESS,
  };
}

export function initScatterError(errorScatterInit) {
  return {
    type: INIT_SCATTER_ERROR,
    errorScatterInit,
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

export function selectPopupAccountSuccess(userIsInSystem, acc) {
  return {
    type: SELECT_POPUP_ACCOUNT_SUCCESS,
    userIsInSystem,
    acc,
  };
}

export function selectPopupAccountError(selectAccountError) {
  return {
    type: SELECT_POPUP_ACCOUNT_ERROR,
    selectAccountError: selectAccountError.message,
  };
}
