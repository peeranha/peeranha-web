/*
 *
 * SignUp actions
 *
 */

import {
  FETCH_REGISTER_ACC,
  REGISTER_ACC_SUCCESS,
  REGISTER_ACC_ERROR,
  SET_REDUCER_DEFAULT,
  SHOW_SIGN_UP_MODAL,
  SHOW_DEFAULT_SIGNUP_MODAL,
  HIDE_SIGN_UP_MODAL,
} from './constants';

/*
 *
 * register actions
 *
 */

export function fetchRegisterAcc(obj) {
  return {
    type: FETCH_REGISTER_ACC,
    obj,
  };
}

export function registerAccSuccess() {
  return {
    type: REGISTER_ACC_SUCCESS,
  };
}

export function registerAccError(error) {
  return {
    type: REGISTER_ACC_ERROR,
    error,
  };
}

export function setReducerDefault() {
  return {
    type: SET_REDUCER_DEFAULT,
  };
}

/*
 *
 * signUp modal window actions
 *
 */

export function showSignUpModal(content) {
  return {
    type: SHOW_SIGN_UP_MODAL,
    content: content || SHOW_DEFAULT_SIGNUP_MODAL,
  };
}

export function hideSignUpModal() {
  return {
    type: HIDE_SIGN_UP_MODAL,
  };
}
