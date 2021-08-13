/*
 *
 * AccountProvider reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  GET_CURRENT_ACCOUNT_PROCESSING,
  ADD_LOGIN_DATA,
  REMOVE_LOGIN_DATA,
  CHANGE_STAKED_IN_NEXT_PERIOD,
} from './constants';

export const initialState = fromJS({
  loading: true,
  error: null,
  account: null,
  balance: null,
  stakedInCurrentPeriod: null,
  stakedInNextPeriod: null,
  boost: null,
  lastUpdate: null,
  email: null,
  eosAccountName: null,
  authToken: null,
  passwordUserPart: null,
  encryptedKeys: null,
  hasOwnerEosKey: false,
  loginWithScatter: false,
  loginWithKeycat: false,
  loginWithFacebook: null,
});

function accountProviderReducer(state = initialState, action) {
  const {
    type,
    err,
    account,
    balance,
    stakedInCurrentPeriod,
    stakedInNextPeriod,
    boost,
    email,
    eosAccountName,
    authToken,
    passwordUserPart,
    encryptedKeys,
    hasOwnerEosKey,
    loginWithMetaMask,
  } = action;

  switch (type) {
    case GET_CURRENT_ACCOUNT_PROCESSING:
      return state.set('loading', true);
    case GET_CURRENT_ACCOUNT_SUCCESS:
      return state
        .set('loading', false)
        .set('lastUpdate', Date.now())
        .set('account', account || initialState.get('account'))
        .set('balance', balance || initialState.get('balance'))
        .set('boost', boost || initialState.get('boost'))
        .set(
          'stakedInCurrentPeriod',
          stakedInCurrentPeriod || initialState.get('stakedInCurrentPeriod'),
        )
        .set(
          'stakedInNextPeriod',
          stakedInNextPeriod || initialState.get('stakedInNextPeriod'),
        );
    case GET_CURRENT_ACCOUNT_ERROR:
      return state.set('loading', false).set('error', err);

    case ADD_LOGIN_DATA:
      return state
        .set('email', email)
        .set('eosAccountName', eosAccountName)
        .set('authToken', authToken)
        .set('passwordUserPart', passwordUserPart)
        .set('encryptedKeys', encryptedKeys)
        .set('hasOwnerEosKey', hasOwnerEosKey)
        .set('loginWithMetaMask', loginWithMetaMask);
    case REMOVE_LOGIN_DATA:
      return state
        .set('email', null)
        .set('eosAccountName', null)
        .set('authToken', null)
        .set('passwordUserPart', null)
        .set('encryptedKeys', null)
        .set('hasOwnerEosKey', null)
        .set('loginWithMetaMask', null);

    case CHANGE_STAKED_IN_NEXT_PERIOD:
      return state.set('stakedInNextPeriod', stakedInNextPeriod);

    default:
      return state;
  }
}

export default accountProviderReducer;
