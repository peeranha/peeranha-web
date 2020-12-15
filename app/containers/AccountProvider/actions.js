import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  GET_CURRENT_ACCOUNT_PROCESSING,
  UPDATE_ACC_SUCCESS,
  UPDATE_ACC_ERROR,
  REWARD_REFER_ERROR,
  ADD_LOGIN_DATA,
  REMOVE_LOGIN_DATA,
} from './constants';

export const getCurrentAccount = () => ({
  type: GET_CURRENT_ACCOUNT,
});

export const getCurrentAccountProcessing = () => ({
  type: GET_CURRENT_ACCOUNT_PROCESSING,
});

export const getCurrentAccountSuccess = (
  account,
  balance,
  stakedInCurrentPeriod = 0,
  stakedInNextPeriod = 0,
) => ({
  type: GET_CURRENT_ACCOUNT_SUCCESS,
  account,
  balance,
  stakedInCurrentPeriod,
  stakedInNextPeriod,
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

export const addLoginData = data => ({
  type: ADD_LOGIN_DATA,
  ...data,
});

export const removeLoginData = () => ({
  type: REMOVE_LOGIN_DATA,
});
