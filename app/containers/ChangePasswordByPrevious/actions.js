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
  EMAIL_FORM,
  EMAIL_FIELD,
  CODE_FIELD,
} from './constants';

// Modal actions

export function showChangePasswordModal(content) {
  return {
    type: SHOW_CHANGE_PASSWORD_MODAL,
    content: content || EMAIL_FORM,
  };
}

export function hideChangePasswordModal() {
  return {
    type: HIDE_CHANGE_PASSWORD_MODAL,
  };
}

// Send email

export function sendEmail(args) {
  return {
    type: SEND_EMAIL,
    email: args[0].toJS()[EMAIL_FIELD],
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

// Submit email

export function submitEmail(args) {
  return {
    type: SUBMIT_EMAIL,
    verificationCode: args[0].toJS()[CODE_FIELD],
    resetForm: args[2].reset,
  };
}

export function submitEmailSuccess() {
  return {
    type: SUBMIT_EMAIL_SUCCESS,
  };
}

export function submitEmailErr(submitEmailError) {
  return {
    type: SUBMIT_EMAIL_ERROR,
    submitEmailError,
  };
}

// Change password

export function changePassword(args) {
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
