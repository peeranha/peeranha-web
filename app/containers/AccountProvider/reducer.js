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
} from './constants';

export const initialState = fromJS({
  loading: true,
  error: null,
  account: null,
  balance: null,
  stakedInCurrentPeriod: null,
  stakedInNextPeriod: null,
  lastUpdate: null,
  email: null,
  eosAccountName: null,
  authToken: null,
  passwordUserPart: null,
  encryptedKeys: null,
  hasOwnerEosKey: false,
  loginWithScatter: false,
});

function accountProviderReducer(state = initialState, action) {
  const {
    type,
    err,
    account,
    balance,
    stakedInCurrentPeriod,
    stakedInNextPeriod,
    email,
    eosAccountName,
    authToken,
    passwordUserPart,
    encryptedKeys,
    hasOwnerEosKey,
    loginWithScatter,
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
        .set('stakedInCurrentPeriod', stakedInCurrentPeriod || initialState.get('stakedInCurrentPeriod'))
        .set('stakedInNextPeriod', stakedInNextPeriod || initialState.get('stakedInNextPeriod'));
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
        .set('loginWithScatter', loginWithScatter);
    case REMOVE_LOGIN_DATA:
      return state
        .set('email', null)
        .set('eosAccountName', null)
        .set('authToken', null)
        .set('passwordUserPart', null)
        .set('encryptedKeys', null)
        .set('hasOwnerEosKey', null)
        .set('loginWithScatter', null);

    default:
      return state;
  }
}

export default accountProviderReducer;
