/*
 *
 * ShowChangeEmail actions
 *
 */

import {
  SEND_OLD_EMAIL,
  SEND_OLD_EMAIL_SUCCESS,
  SEND_OLD_EMAIL_ERROR,
  CONFIRM_OLD_EMAIL,
  CONFIRM_OLD_EMAIL_SUCCESS,
  CONFIRM_OLD_EMAIL_ERROR,
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_ERROR,
  SHOW_CHANGE_EMAIL_MODAL,
  HIDE_CHANGE_EMAIL_MODAL,
  OLD_EMAIL_FIELD,
  CODE_FIELD,
} from './constants';

export function showChangeEmailModal() {
  return {
    type: SHOW_CHANGE_EMAIL_MODAL,
  };
}

export function hideChangeEmailModal() {
  return {
    type: HIDE_CHANGE_EMAIL_MODAL,
  };
}

// Send old email actions

export function sendOldEmail(...args) {
  return {
    type: SEND_OLD_EMAIL,
    email: args[0].toJS()[OLD_EMAIL_FIELD],
    resetForm: args[2].reset,
  };
}

export function sendOldEmailSuccess() {
  return {
    type: SEND_OLD_EMAIL_SUCCESS,
  };
}

export function sendOldEmailErr(sendOldEmailError) {
  return {
    type: SEND_OLD_EMAIL_ERROR,
    sendOldEmailError,
  };
}

// Confirm old email actions

export function confirmOldEmail(...args) {
  return {
    type: CONFIRM_OLD_EMAIL,
    verificationCode: args[0].toJS()[CODE_FIELD],
    resetForm: args[2].reset,
  };
}

export function confirmOldEmailSuccess() {
  return {
    type: CONFIRM_OLD_EMAIL_SUCCESS,
  };
}

export function confirmOldEmailErr(confirmOldEmailError) {
  return {
    type: CONFIRM_OLD_EMAIL_ERROR,
    confirmOldEmailError,
  };
}

// Change email actions

export function changeEmail(...args) {
  return {
    type: CHANGE_EMAIL,
    values: args[0].toJS(),
    resetForm: args[2].reset,
  };
}

export function changeEmailSuccess() {
  return {
    type: CHANGE_EMAIL_SUCCESS,
  };
}

export function changeEmailErr(changeEmailError) {
  return {
    type: CHANGE_EMAIL_ERROR,
    changeEmailError,
  };
}
