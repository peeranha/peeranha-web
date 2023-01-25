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
  CODE_FIELD,
  SEND_ANOTHER_CODE,
  GET_EMAIL_ADDRESS,
  GET_EMAIL_ADDRESS_SUCCESS,
  GET_EMAIL_ADDRESS_ERROR,
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
    email: args[2].emailAddress,
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
    code: args[0].toJS()[CODE_FIELD],
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

export function getEmailAddress(address) {
  return {
    type: GET_EMAIL_ADDRESS,
    address,
  };
}

export function getEmailAddressSuccess(email, isSubscribed) {
  return {
    type: GET_EMAIL_ADDRESS_SUCCESS,
    email,
    isSubscribed,
  };
}

export function getEmailAddressErr(getEmailAddressError) {
  return {
    type: GET_EMAIL_ADDRESS_ERROR,
    getEmailAddressError,
  };
}
