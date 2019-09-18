/*
 *
 * Forgot password actions
 *
 */

import {
  SHOW_FORGOT_PASSWORD_MODAL,
  HIDE_FORGOT_PASSWORD_MODAL,
  GET_VERIFICATION_CODE,
  GET_VERIFICATION_CODE_SUCCESS,
  GET_VERIFICATION_CODE_ERROR,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  EMAIL_FIELD,
  VERIFICATION_CODE_FIELD,
  MASTER_KEY_FIELD,
  PASSWORD_FIELD,
} from './constants';

// Show | Hide (modal)

export function showForgotPasswordModal() {
  return {
    type: SHOW_FORGOT_PASSWORD_MODAL,
  };
}

export function hideForgotPasswordModal() {
  return {
    type: HIDE_FORGOT_PASSWORD_MODAL,
  };
}

// Get verification code actions

export function getVerificationCode(val) {
  return {
    type: GET_VERIFICATION_CODE,
    email: val.get(EMAIL_FIELD),
  };
}

export function getVerificationCodeSuccess() {
  return {
    type: GET_VERIFICATION_CODE_SUCCESS,
  };
}

export function getVerificationCodeErr(getVerificationCodeError) {
  return {
    type: GET_VERIFICATION_CODE_ERROR,
    getVerificationCodeError,
  };
}

// Verify email actions

export function verifyEmail(val) {
  return {
    type: VERIFY_EMAIL,
    verificationCode: val.get(VERIFICATION_CODE_FIELD),
  };
}

export function verifyEmailSuccess() {
  return {
    type: VERIFY_EMAIL_SUCCESS,
  };
}

export function verifyEmailErr(verifyEmailError) {
  return {
    type: VERIFY_EMAIL_ERROR,
    verifyEmailError,
  };
}

// Verify email actions

export function changePassword(val) {
  return {
    type: CHANGE_PASSWORD,
    masterKey: val.get(MASTER_KEY_FIELD),
    password: val.get(PASSWORD_FIELD),
  };
}

export function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
}

export function changePasswordErr(changePasswordError) {
  return {
    type: CHANGE_PASSWORD_ERROR,
    changePasswordError,
  };
}
