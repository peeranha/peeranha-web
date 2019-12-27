/*
 *
 * getCurrentAccount actions
 *
 */

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  GET_CURRENT_ACCOUNT_PROCESSING,
  UPDATE_ACC_SUCCESS,
  UPDATE_ACC_ERROR,
} from './constants';

export function getCurrentAccount() {
  return {
    type: GET_CURRENT_ACCOUNT,
  };
}

export function getCurrentAccountProcessing() {
  return {
    type: GET_CURRENT_ACCOUNT_PROCESSING,
  };
}

export function getCurrentAccountSuccess(account, balance) {
  return {
    type: GET_CURRENT_ACCOUNT_SUCCESS,
    account,
    balance,
  };
}

export function getCurrentAccountError(err) {
  return {
    type: GET_CURRENT_ACCOUNT_ERROR,
    err,
  };
}

export function updateAccSuccess() {
  return {
    type: UPDATE_ACC_SUCCESS,
  };
}

export function updateAccErr(updateAccError) {
  return {
    type: UPDATE_ACC_ERROR,
    updateAccError,
  };
}
