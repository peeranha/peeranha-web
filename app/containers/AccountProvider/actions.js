/*
 *
 * getCurrentAccount actions
 *
 */

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  LOGIN_SIGNUP,
  LOGIN_SIGNUP_SUCCESS,
  LOGIN_SIGNUP_ERROR,
  RELOAD_APP,
  FORGET_IDENTITY,
  FORGET_IDENTITY_SUCCESS,
  FORGET_IDENTITY_ERROR,
} from './constants';

export function getCurrentAccount() {
  return {
    type: GET_CURRENT_ACCOUNT,
  };
}

export function getCurrentAccountSuccess(acc, userIsInSystem) {
  return {
    type: GET_CURRENT_ACCOUNT_SUCCESS,
    acc,
    userIsInSystem,
  };
}

export function getCurrentAccountError(err) {
  return {
    type: GET_CURRENT_ACCOUNT_ERROR,
    err,
  };
}

/*
 *
 * loginSignup actions
 *
 */

export function loginSignup(methods) {
  return {
    type: LOGIN_SIGNUP,
    methods,
  };
}

export function loginSignupSuccess(acc, userIsInSystem) {
  return {
    type: LOGIN_SIGNUP_SUCCESS,
    userIsInSystem,
    acc,
  };
}

export function loginSignupErr(loginSignupError) {
  return {
    type: LOGIN_SIGNUP_ERROR,
    loginSignupError,
  };
}

/*
 *
 * forgetIdentity actions
 *
 */

export function forgetIdentity() {
  return {
    type: FORGET_IDENTITY,
  };
}

export function forgetIdentitySuccess() {
  return {
    type: FORGET_IDENTITY_SUCCESS,
  };
}

export function forgetIdentityErr(forgetIdentityError) {
  return {
    type: FORGET_IDENTITY_ERROR,
    forgetIdentityError,
  };
}

/*
 *
 * reload app action
 *
 */

export function reloadApp(reload) {
  localStorage.setItem(reload, true);
  window.location.reload();
  return {
    type: RELOAD_APP,
  };
}
