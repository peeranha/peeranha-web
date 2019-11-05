/*
 *
 * ShowOwnerKey actions
 *
 */

import {
  SHOW_OWNER_KEY_MODAL,
  HIDE_OWNER_KEY_MODAL,
  SHOW_OWNER_KEY,
  SHOW_OWNER_KEY_SUCCESS,
  SHOW_OWNER_KEY_ERROR,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  CODE_FIELD,
  REMOVE_OWNER_KEY,
} from './constants';

export function showOwnerKeyModal() {
  return {
    type: SHOW_OWNER_KEY_MODAL,
  };
}

export function hideOwnerKeyModal() {
  return {
    type: HIDE_OWNER_KEY_MODAL,
  };
}

// sendEmail

export function sendEmail(...args) {
  return {
    type: SEND_EMAIL,
    email: args[0].toJS()[EMAIL_FIELD],
    password: args[0].toJS()[PASSWORD_FIELD],
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

export function showOwnerKey(...args) {
  return {
    type: SHOW_OWNER_KEY,
    verificationCode: args[0].toJS()[CODE_FIELD],
    resetForm: args[2].reset,
  };
}

export function showOwnerKeySuccess(ownerKey) {
  return {
    type: SHOW_OWNER_KEY_SUCCESS,
    ownerKey,
  };
}

export function showOwnerKeyErr(showOwnerKeyError) {
  return {
    type: SHOW_OWNER_KEY_ERROR,
    showOwnerKeyError,
  };
}

export function removeOwnerKey() {
  return {
    type: REMOVE_OWNER_KEY,
  };
}
