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
  LOGIN_WITH_SCATTER,
  LOGIN_WITH_SCATTER_SUCCESS,
  LOGIN_WITH_SCATTER_ERROR,
  FINISH_REGISTRATION,
  FINISH_REGISTRATION_SUCCESS,
  FINISH_REGISTRATION_ERROR,
  FINISH_REGISTRATION_REFERRAL_ERROR,
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

// Login with scatter

export function loginWithScatter() {
  return {
    type: LOGIN_WITH_SCATTER,
  };
}

export function loginWithScatterSuccess() {
  return {
    type: LOGIN_WITH_SCATTER_SUCCESS,
  };
}

export function loginWithScatterErr(loginWithScatterError) {
  return {
    type: LOGIN_WITH_SCATTER_ERROR,
    loginWithScatterError,
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
