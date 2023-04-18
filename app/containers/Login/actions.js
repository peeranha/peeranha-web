/*
 *
 * Login actions
 *
 */

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  LOGIN_WITH_WALLET,
  LOGIN_WITH_WALLET_SUCCESS,
  LOGIN_WITH_WALLET_ERROR,
  LOGIN_WITH_SUI,
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

export function loginWithWallet({ t }, isNewPostCreationAfterLogin = false) {
  return {
    type: LOGIN_WITH_WALLET,
    t,
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

//SUI
export function loginWithSui(address, isNewPostCreationAfterLogin = false) {
  return {
    type: LOGIN_WITH_SUI,
    address,
    isNewPostCreationAfterLogin,
  };
}
