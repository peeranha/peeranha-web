/*
 *
 * Logout actions
 *
 */

import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_ERROR } from './constants';

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutErr(logoutError) {
  return {
    type: LOGOUT_ERROR,
    logoutError,
  };
}
