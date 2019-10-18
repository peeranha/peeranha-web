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
  I_HAVE_EOS_ACCOUNT,
  I_HAVE_EOS_ACCOUNT_SUCCESS,
  I_HAVE_EOS_ACCOUNT_ERROR,
  I_HAVE_NOT_EOS_ACCOUNT,
  I_HAVE_NOT_EOS_ACCOUNT_SUCCESS,
  I_HAVE_NOT_EOS_ACCOUNT_ERROR,
  PUT_KEYS_TO_STATE,
  VERIFICATION_FIELD,
  SIGNUP_WITH_SCATTER,
  SIGNUP_WITH_SCATTER_SUCCESS,
  SIGNUP_WITH_SCATTER_ERROR,
  SHOW_SCATTER_SIGNUP_FORM,
  SHOW_SCATTER_SIGNUP_FORM_SUCCESS,
  SHOW_SCATTER_SIGNUP_FORM_ERROR,
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

export function verifyEmailSuccess(encryptionKey) {
  return {
    type: EMAIL_VERIFICATION_SUCCESS,
    encryptionKey,
  };
}

export function verifyEmailErr(verifyEmailError) {
  return {
    type: EMAIL_VERIFICATION_ERROR,
    verifyEmailError,
  };
}

/*
 *
 * i have eos account sign up
 *
 */

export function iHaveEosAccount(val) {
  return {
    type: I_HAVE_EOS_ACCOUNT,
    val: val.toJS(),
  };
}

export function iHaveEosAccountSuccess() {
  return {
    type: I_HAVE_EOS_ACCOUNT_SUCCESS,
  };
}

export function iHaveEosAccountErr(iHaveEosAccountError) {
  return {
    type: I_HAVE_EOS_ACCOUNT_ERROR,
    iHaveEosAccountError,
  };
}

/*
 *
 * i have NOT eos account sign up
 *
 */

export function idontHaveEosAccount(val) {
  return {
    type: I_HAVE_NOT_EOS_ACCOUNT,
    val: val.toJS(),
  };
}

export function idontHaveEosAccountSuccess() {
  return {
    type: I_HAVE_NOT_EOS_ACCOUNT_SUCCESS,
  };
}

export function idontHaveEosAccountErr(idontHaveEosAccountError) {
  return {
    type: I_HAVE_NOT_EOS_ACCOUNT_ERROR,
    idontHaveEosAccountError,
  };
}

/*
 *
 * sign up with scatter
 *
 */

export function signUpWithScatter(val) {
  return {
    type: SIGNUP_WITH_SCATTER,
    val: val.toJS(),
  };
}

export function signUpWithScatterSuccess() {
  return {
    type: SIGNUP_WITH_SCATTER_SUCCESS,
  };
}

export function signUpWithScatterErr(signUpWithScatterError) {
  return {
    type: SIGNUP_WITH_SCATTER_ERROR,
    signUpWithScatterError,
  };
}

/*
 *
 * open window for scatter registration
 *
 */

export function showScatterSignUpForm() {
  return {
    type: SHOW_SCATTER_SIGNUP_FORM,
  };
}

export function showScatterSignUpFormSuccess(eosAccountName) {
  return {
    type: SHOW_SCATTER_SIGNUP_FORM_SUCCESS,
    eosAccountName,
  };
}

export function showScatterSignUpFormErr(showScatterSignUpFormError) {
  return {
    type: SHOW_SCATTER_SIGNUP_FORM_ERROR,
    showScatterSignUpFormError,
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
