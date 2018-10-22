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
  RELOAD_APP,
  FORGET_IDENTITY,
  FORGET_IDENTITY_SUCCESS,
  FORGET_IDENTITY_ERROR,
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

/*
 *
 * selectAccount actions
 *
 */

export function forgetIdentity() {
  return {
    type: FORGET_IDENTITY,
  };
}

export function forgetIdentitySuccess() {
  return {
    type: FORGET_IDENTITY_SUCCESS,
  };
}

export function forgetIdentityErr(forgetIdentityError) {
  return {
    type: FORGET_IDENTITY_ERROR,
    forgetIdentityError,
  };
}

/*
 *
 * reload app action
 *
 */

export function reloadApp(reload) {
  localStorage.setItem(reload, true);
  window.location.reload();
  return {
    type: RELOAD_APP,
  };
}
