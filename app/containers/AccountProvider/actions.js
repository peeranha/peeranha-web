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
  REWARD_REFER_ERROR,
} from './constants';

export const getCurrentAccount = () => ({
  type: GET_CURRENT_ACCOUNT,
});

export const getCurrentAccountProcessing = () => ({
  type: GET_CURRENT_ACCOUNT_PROCESSING,
});

export const getCurrentAccountSuccess = (account, balance) => ({
  type: GET_CURRENT_ACCOUNT_SUCCESS,
  account,
  balance,
});

export const getCurrentAccountError = err => ({
  type: GET_CURRENT_ACCOUNT_ERROR,
  err,
});

export const updateAccSuccess = () => ({
  type: UPDATE_ACC_SUCCESS,
});

export const updateAccErr = updateAccError => ({
  type: UPDATE_ACC_ERROR,
  updateAccError,
});

export const rewardReferErr = rewardReferError => ({
  type: REWARD_REFER_ERROR,
  rewardReferError,
});
