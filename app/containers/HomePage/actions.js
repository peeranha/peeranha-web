/*
 *
 * homepage actions
 *
 */

import {
  SEND_MESSAGE,
  SEND_EMAIL,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
} from './constants';

/*
 *
 * sendMessage actions
 *
 */

export function sendMessage(...val) {
  return {
    type: SEND_MESSAGE,
    val,
  };
}

export function sendEmail(...val) {
  return {
    type: SEND_EMAIL,
    val,
  };
}

export function sendMessageSuccess() {
  return {
    type: SEND_MESSAGE_SUCCESS,
  };
}

export function sendMessageErr(sendMessageError) {
  return {
    type: SEND_MESSAGE_ERROR,
    sendMessageError,
  };
}

export function sendEmailSuccess() {
  return {
    type: SEND_EMAIL_SUCCESS,
  };
}

export function sendEmailErr(sendMessageError) {
  return {
    type: SEND_EMAIL_ERROR,
    sendMessageError,
  };
}

export function showLoginModal() {
  return {
    type: SHOW_LOGIN_MODAL,
  };
}

export function hideLoginModal() {
  return {
    type: HIDE_LOGIN_MODAL,
  };
}
