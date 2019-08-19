/*
 *
 * getCurrentAccount actions
 *
 */

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
} from './constants';

export function getCurrentAccount() {
  return {
    type: GET_CURRENT_ACCOUNT,
  };
}

export function getCurrentAccountSuccess(account) {
  return {
    type: GET_CURRENT_ACCOUNT_SUCCESS,
    account,
  };
}

export function getCurrentAccountError(err) {
  return {
    type: GET_CURRENT_ACCOUNT_ERROR,
    err,
  };
}
