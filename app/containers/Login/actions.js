/*
 *
 * Login actions
 *
 */

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  SHOW_EMAIL_PASSWORD_MODAL,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_ERROR,
  EMAIL_FIELD,
  FINISH_REGISTRATION,
  FINISH_REGISTRATION_SUCCESS,
  FINISH_REGISTRATION_ERROR,
  FINISH_REGISTRATION_REFERRAL_ERROR,
  LOGIN_WITH_WALLET,
  LOGIN_WITH_WALLET_SUCCESS,
  LOGIN_WITH_WALLET_ERROR,
  FACEBOOK_LOGIN_PROCESSING,
  FACEBOOK_LOGIN_BUTTON_CLICK,
  FACEBOOK_LOGIN_DATA_RECEIVE,
  AUTOLOGIN_WITH_FACEBOOK,
  SET_FACEBOOK_USER_DATA,
  FACEBOOK_ERROR,
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

export function showEmailPasswordForm(val) {
  return {
    type: SHOW_EMAIL_PASSWORD_MODAL,
    email: val.get(EMAIL_FIELD),
  };
}

// Login with Wallet

export function loginWithWallet({ keycat, scatter }) {
  return {
    type: LOGIN_WITH_WALLET,
    keycat,
    scatter,
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

export function loginWithEmailSuccess(eosAccount, content) {
  return {
    type: LOGIN_WITH_EMAIL_SUCCESS,
    eosAccount,
    content,
  };
}

export function loginWithEmailErr(loginWithEmailError) {
  return {
    type: LOGIN_WITH_EMAIL_ERROR,
    loginWithEmailError,
  };
}

// Finish registration (enter display name)

export function finishRegistrationWithDisplayName(val) {
  return {
    type: FINISH_REGISTRATION,
    val: val.toJS(),
  };
}

export function finishRegistrationWithDisplayNameSuccess() {
  return {
    type: FINISH_REGISTRATION_SUCCESS,
  };
}

export function finishRegistrationWithDisplayNameErr(
  finishRegistrationWithDisplayNameError,
) {
  return {
    type: FINISH_REGISTRATION_ERROR,
    finishRegistrationWithDisplayNameError,
  };
}

export const finishRegistrationReferralErr = finishRegistrationReferralError => ({
  type: FINISH_REGISTRATION_REFERRAL_ERROR,
  finishRegistrationReferralError,
});

export const setFacebookLoginProcessing = facebookLoginProcessing => ({
  type: FACEBOOK_LOGIN_PROCESSING,
  facebookLoginProcessing,
});

export const handleFacebookButtonClick = () => ({
  type: FACEBOOK_LOGIN_BUTTON_CLICK,
});

export const handleFacebookLoginCallback = (data, isLogin) => ({
  type: FACEBOOK_LOGIN_DATA_RECEIVE,
  data,
  isLogin,
});

export const autoLoginWithFacebook = data => ({
  type: AUTOLOGIN_WITH_FACEBOOK,
  data,
  isLogin: true,
});

export const setFacebookUserData = facebookUserData => ({
  type: SET_FACEBOOK_USER_DATA,
  facebookUserData,
});

export const addFacebookError = facebookError => ({
  type: FACEBOOK_ERROR,
  facebookError,
});
