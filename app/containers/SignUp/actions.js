/*
 *
 * SignUp actions
 *
 */

import {
  SET_REDUCER_DEFAULT,
  EMAIL_CHECKING,
  EMAIL_CHECKING_SUCCESS,
  EMAIL_CHECKING_ERROR,
  EMAIL_VERIFICATION,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  SIGN_UP_VIA_EMAIL,
  SIGN_UP_VIA_EMAIL_SUCCESS,
  SIGN_UP_VIA_EMAIL_ERROR,
  PUT_KEYS_TO_STATE,
  VERIFICATION_FIELD,
  SIGNUP_WITH_WALLET,
  SIGNUP_WITH_WALLET_SUCCESS,
  SIGNUP_WITH_WALLET_ERROR,
  SHOW_WALLET_SIGNUP_FORM,
  SHOW_WALLET_SIGNUP_FORM_ERROR,
  SEND_ANOTHER_CODE,
  SIGNUP_WITH_WALLET_REFERRAL_ERROR,
  SHOW_WALLET_SIGNUP_FORM_SUCCESS,
} from './constants';

/*
 *
 * email checking
 *
 */

export function checkEmail(email) {
  return {
    type: EMAIL_CHECKING,
    email,
  };
}

export function checkEmailSuccess() {
  return {
    type: EMAIL_CHECKING_SUCCESS,
  };
}

export function checkEmailErr(emailCheckingError) {
  return {
    type: EMAIL_CHECKING_ERROR,
    emailCheckingError,
  };
}

/*
 *
 * email verification
 *
 */

export function verifyEmail(values) {
  return {
    type: EMAIL_VERIFICATION,
    verificationCode: values.get(VERIFICATION_FIELD),
  };
}

export function verifyEmailSuccess() {
  return {
    type: EMAIL_VERIFICATION_SUCCESS,
  };
}

export function verifyEmailErr(verifyEmailError) {
  return {
    type: EMAIL_VERIFICATION_ERROR,
    verifyEmailError,
  };
}

export function sendAnotherCode() {
  return {
    type: SEND_ANOTHER_CODE,
  };
}

/*
 *
 * sign up via email and ethereum wallet creation
 *
 */

export function signUpViaEmailComplete(val) {
  return {
    type: SIGN_UP_VIA_EMAIL,
    val: val.toJS(),
  };
}

export function signUpViaEmailCompleteSuccess() {
  return {
    type: SIGN_UP_VIA_EMAIL_SUCCESS,
  };
}

export function signUpViaEmailCompleteError(signUpViaEmailError) {
  return {
    type: SIGN_UP_VIA_EMAIL_ERROR,
    signUpViaEmailError,
  };
}

/*
 *
 * sign up with metaMask
 *
 */

export function signUpWithWallet(val, { metaMask }) {
  return {
    type: SIGNUP_WITH_WALLET,
    val: val.toJS(),
    metaMask,
  };
}

export function signUpWithWalletSuccess() {
  return {
    type: SIGNUP_WITH_WALLET_SUCCESS,
  };
}

export function signUpWithWalletErr(signUpWithWalletError) {
  return {
    type: SIGNUP_WITH_WALLET_ERROR,
    signUpWithWalletError,
  };
}

export const signUpWithWalletReferralErr = signUpWithWalletReferralError => ({
  type: SIGNUP_WITH_WALLET_REFERRAL_ERROR,
  signUpWithWalletReferralError,
});

/*
 *
 * open window for scatter registration
 *
 */

export function showWalletSignUpForm({ metaMask }) {
  return {
    type: SHOW_WALLET_SIGNUP_FORM,
    metaMask,
  };
}

export function showWalletSignUpFormSuccess(ethereumUserAddress) {
  return {
    type: SHOW_WALLET_SIGNUP_FORM_SUCCESS,
    ethereumUserAddress,
  };
}

export function showWalletSignUpFormErr(showWalletSignUpFormError) {
  return {
    type: SHOW_WALLET_SIGNUP_FORM_ERROR,
    showWalletSignUpFormError,
  };
}

/*
 *
 * put keys to state
 *
 */

export function putKeysToState(keys) {
  return {
    type: PUT_KEYS_TO_STATE,
    keys,
  };
}

/*
 *
 * Reset reducer state
 *
 */

export function setReducerDefault() {
  return {
    type: SET_REDUCER_DEFAULT,
  };
}
