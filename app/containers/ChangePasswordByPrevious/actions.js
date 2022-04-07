import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SUBMIT_EMAIL,
  SUBMIT_EMAIL_SUCCESS,
  SUBMIT_EMAIL_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  SHOW_CHANGE_PASSWORD_MODAL,
  HIDE_CHANGE_PASSWORD_MODAL,
  EMAIL_FIELD,
  CODE_FIELD,
  SEND_ANOTHER_CODE,
} from './constants';

export function sendAnotherCode() {
  return {
    type: SEND_ANOTHER_CODE,
  };
}

// Modal actions

export function showChangePasswordModal() {
  return {
    type: SHOW_CHANGE_PASSWORD_MODAL,
  };
}

export function hideChangePasswordModal() {
  return {
    type: HIDE_CHANGE_PASSWORD_MODAL,
  };
}

// Change password

export function changePassword(...args) {
  return {
    type: CHANGE_PASSWORD,
    values: args[0].toJS(),
    resetForm: args[2].reset,
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
