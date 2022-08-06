/*
 *
 * Login actions
 *
 */

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_ERROR,
  LOGIN_WITH_WALLET,
  LOGIN_WITH_WALLET_SUCCESS,
  LOGIN_WITH_WALLET_ERROR,
} from './constants';

// Show | Hide (modal)

export function showLoginModal() {
  return {
    type: SHOW_LOGIN_MODAL,
  };
}

export function hideLoginModal() {
  return {
    type: HIDE_LOGIN_MODAL,
  };
}

// Login with Wallet

export function loginWithWallet(
  { metaMask },
  isNewPostCreationAfterLogin = false,
) {
  return {
    type: LOGIN_WITH_WALLET,
    metaMask,
    isNewPostCreationAfterLogin,
  };
}

export function loginWithWalletSuccess() {
  return {
    type: LOGIN_WITH_WALLET_SUCCESS,
  };
}

export function loginWithWalletErr(loginWithWalletError) {
  return {
    type: LOGIN_WITH_WALLET_ERROR,
    loginWithWalletError,
  };
}

// login with email

export function loginWithEmail(val) {
  return {
    type: LOGIN_WITH_EMAIL,
    val: val.toJS(),
  };
}

export function loginWithEmailSuccess(content) {
  return {
    type: LOGIN_WITH_EMAIL_SUCCESS,
    content,
  };
}

export function loginWithEmailErr(loginWithEmailError) {
  return {
    type: LOGIN_WITH_EMAIL_ERROR,
    loginWithEmailError,
  };
}
