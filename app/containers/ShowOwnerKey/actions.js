/*
 *
 * ShowOwnerKey actions
 *
 */

import {
  SHOW_OWNER_KEY,
  SHOW_OWNER_KEY_SUCCESS,
  SHOW_OWNER_KEY_ERROR,
  SHOW_OWNER_KEY_MODAL,
  HIDE_OWNER_KEY_MODAL,
  EMAIL_FORM,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
} from './constants';

export function showOwnerKeyModal(content) {
  return {
    type: SHOW_OWNER_KEY_MODAL,
    content: content || EMAIL_FORM,
  }
}

export function hideOwnerKeyModal() {
  return {
    type: HIDE_OWNER_KEY_MODAL,
  }
}

// sendEmail

export function sendEmail(args) {
  return {
    type: SEND_EMAIL,
    values: args[0].toJS(),
    resetForm: args[2].reset,
  };
}

export function sendEmailSuccess(verificationCode) {
  return {
    type: SEND_EMAIL_SUCCESS,
    verificationCode,
  };
}

export function sendEmailErr(sendEmailError) {
  return {
    type: SEND_EMAIL_ERROR,
    sendEmailError,
  };
}

// Show owner key

export function showOwnerKey(args) {
  return {
    type: SHOW_OWNER_KEY,
    values: args[0].toJS(),
    resetForm: args[2].reset,
  };
}

export function showOwnerKeySuccess() {
  return {
    type: SHOW_OWNER_KEY_SUCCESS,
  };
}

export function showOwnerKeyErr(showOwnerKeyError) {
  return {
    type: SHOW_OWNER_KEY_ERROR,
    showOwnerKeyError,
  };
}
