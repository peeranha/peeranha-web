/*
 *
 * AccountProvider reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  LOGIN_SIGNUP_SUCCESS,
  LOGIN_SIGNUP_ERROR,
  FORGET_IDENTITY_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: null,
  account: null,
  profileInfo: null,
  userIsInSystem: null,
  loginSignupError: null,
  forgetIdentityError: null,
});

function accountProviderReducer(state = initialState, action) {
  const {
    type,
    err,
    acc,
    profileInfo,
    loginSignupError,
    forgetIdentityError,
  } = action;

  switch (type) {
    case GET_CURRENT_ACCOUNT:
      return state.set('loading', true);
    case GET_CURRENT_ACCOUNT_SUCCESS:
      return state
        .set('loading', false)
        .set('userIsInSystem', !!profileInfo)
        .set('profileInfo', profileInfo)
        .set('account', acc);
    case GET_CURRENT_ACCOUNT_ERROR:
      return state.set('loading', false).set('error', err);
    case LOGIN_SIGNUP_SUCCESS:
      return state
        .set('account', acc)
        .set('userIsInSystem', !!profileInfo)
        .set('profileInfo', profileInfo);
    case LOGIN_SIGNUP_ERROR:
      return state.set('loginSignupError', loginSignupError);
    case FORGET_IDENTITY_ERROR:
      return state.set('forgetIdentityError', forgetIdentityError);
    default:
      return state;
  }
}

export default accountProviderReducer;
