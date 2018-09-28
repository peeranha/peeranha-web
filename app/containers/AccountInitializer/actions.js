/*
 *
 * AccountInitializer actions
 *
 */

import {
  REVIEW_ACCOUNT,
  REVIEW_ACCOUNT_SUCCESS,
  REVIEW_ACCOUNT_ERROR,
} from './constants';

export function reviewAccount() {
  return {
    type: REVIEW_ACCOUNT,
  };
}

export function reviewAccountSuccess(acc) {
  return {
    type: REVIEW_ACCOUNT_SUCCESS,
    acc,
  };
}

export function reviewAccountError(err) {
  return {
    type: REVIEW_ACCOUNT_ERROR,
    err,
  };
}
