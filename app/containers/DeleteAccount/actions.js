/*
 *
 * ShowOwnerKey actions
 *
 */

import {
  SHOW_DELETE_ACCOUNT_MODAL,
  HIDE_DELETE_ACCOUNT_MODAL,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_ERROR,
  EMAIL_FIELD,
  SHOW_DELETE_ACCOUNT_MODAL_FB,
} from './constants';

export function showDeleteAccountModal() {
  return {
    type: SHOW_DELETE_ACCOUNT_MODAL,
  };
}

export function showDeleteAccountModalFB() {
  return {
    type: SHOW_DELETE_ACCOUNT_MODAL_FB,
  };
}

export function hideDeleteAccountModal() {
  return {
    type: HIDE_DELETE_ACCOUNT_MODAL,
  };
}

// sendEmail

export function sendEmail(...args) {
  return {
    type: SEND_EMAIL,
    email: args[0].toJS()[EMAIL_FIELD],
    resetForm: args[2].reset,
  };
}

export function sendEmailFacebook(email) {
  return {
    type: SEND_EMAIL,
    email,
    resetForm: null,
    withFacebook: true,
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

export function deleteAccount(...args) {
  return {
    type: DELETE_ACCOUNT,
    values: args[0].toJS(),
    resetForm: args[2].reset,
  };
}

export function deleteFacebookAccount(...args) {
  return {
    type: DELETE_ACCOUNT,
    values: args[0].toJS(),
    resetForm: args[2].reset,
    withFacebook: true,
  };
}

export function deleteAccountSuccess() {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
  };
}

export function deleteAccountErr(deleteAccountError) {
  return {
    type: DELETE_ACCOUNT_ERROR,
    deleteAccountError,
  };
}
