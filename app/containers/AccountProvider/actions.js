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
  CHANGE_STAKED_IN_NEXT_PERIOD,
  GET_CURRENT_SUI_ACCOUNT,
} from './constants';

export const getCurrentAccount = () => ({
  type: GET_CURRENT_ACCOUNT,
});

export const getCurrentAccountProcessing = () => ({
  type: GET_CURRENT_ACCOUNT_PROCESSING,
});

export const getCurrentAccountSuccess = (account, balance, availableBalance, boost) => ({
  type: GET_CURRENT_ACCOUNT_SUCCESS,
  account,
  balance,
  availableBalance,
  boost,
});

export const getCurrentAccountError = (err) => ({
  type: GET_CURRENT_ACCOUNT_ERROR,
  err,
});

export const updateAccSuccess = () => ({
  type: UPDATE_ACC_SUCCESS,
});

export const updateAccErr = (updateAccError) => ({
  type: UPDATE_ACC_ERROR,
  updateAccError,
});

export const rewardReferErr = (rewardReferError) => ({
  type: REWARD_REFER_ERROR,
  rewardReferError,
});

export const addLoginData = (data) => ({
  type: ADD_LOGIN_DATA,
  ...data,
});

export const removeLoginData = () => ({
  type: REMOVE_LOGIN_DATA,
});

export const changeStakedInNextPeriod = (stakedInNextPeriod, availableBalance) => ({
  type: CHANGE_STAKED_IN_NEXT_PERIOD,
  stakedInNextPeriod,
  availableBalance,
});

export const getCurrentSuiAccount = (wallet) => ({
  type: GET_CURRENT_SUI_ACCOUNT,
  wallet,
});
