/*
 *
 * ShowChangeEmail actions
 *
 */

import {
  SEND_OLD_EMAIL,
  CONFIRM_OLD_EMAIL,
  CHANGE_EMAIL,
  SHOW_CHANGE_EMAIL_MODAL,
  HIDE_CHANGE_EMAIL_MODAL,
  OLD_EMAIL_FIELD,
  CODE_FIELD,
  SEND_ANOTHER_CODE,
} from './constants';

export function sendAnotherCode() {
  return {
    type: SEND_ANOTHER_CODE,
  };
}

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

// Confirm old email actions

export function confirmOldEmail(...args) {
  return {
    type: CONFIRM_OLD_EMAIL,
    verificationCode: args[0].toJS()[CODE_FIELD],
    resetForm: args[2].reset,
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
