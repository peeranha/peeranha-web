/*
 *
 * AccountProvider constants
 *
 */

const PATH = 'app/AccountProvider/';

export const GET_CURRENT_ACCOUNT = `${PATH}GET_CURRENT_ACCOUNT`;
export const GET_CURRENT_ACCOUNT_SUCCESS = `${PATH}GET_CURRENT_ACCOUNT_SUCCESS`;
export const GET_CURRENT_ACCOUNT_ERROR = `${PATH}GET_CURRENT_ACCOUNT_ERROR`;
export const GET_CURRENT_ACCOUNT_PROCESSING = `${PATH}GET_CURRENT_ACCOUNT_PROCESSING`;

export const UPDATE_ACC_SUCCESS = `${PATH}UPDATE_ACC_SUCCESS`;
export const UPDATE_ACC_ERROR = `${PATH}UPDATE_ACC_ERROR`;
export const REWARD_REFER_ERROR = `${PATH}REWARD_REFER_ERROR`;

export const ADD_LOGIN_DATA = `${PATH}ADD_LOGIN_DATA`;
export const REMOVE_LOGIN_DATA = `${PATH}REMOVE_LOGIN_DATA`;

export const CHANGE_STAKED_IN_NEXT_PERIOD = `${PATH}CHANGE_STAKED_IN_NEXT_PERIOD`;

export const UPDATE_ACC_PERIOD = 600000; // 10 min
export const REFERRAL_REWARD_RATING = 25;

export const REFERRAL_REWARD_RECEIVED = 'reward_received';
export const REFERRAL_REWARD_SENT = 'reward_sent';
export const NO_REFERRAL_INVITER = 'no_referral';

export const GET_CURRENT_SUI_ACCOUNT = `${PATH}GET_CURRENT_SUI_ACCOUNT`;
