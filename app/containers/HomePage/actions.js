/*
 *
 * homepage actions
 *
 */

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  SHOW_HEADER_POPUP,
  CLOSE_HEADER_POPUP,
} from './constants';

/*
 *
 * sendEmail actions
 *
 */

export function sendEmail(formData, reset, pageInfo) {
  return {
    type: SEND_EMAIL,
    formData,
    reset,
    pageInfo,
  };
}

export function sendEmailSuccess() {
  return {
    type: SEND_EMAIL_SUCCESS,
  };
}

export function sendEmailErr(sendEmailError) {
  return {
    type: SEND_EMAIL_ERROR,
    sendEmailError,
  };
}

/*
 *
 * sendMessage actions
 *
 */

export function sendMessage(formData, reset, pageInfo) {
  return {
    type: SEND_MESSAGE,
    formData,
    reset,
    pageInfo,
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

/*
 *
 * HeaderPopup actions
 *
 */

export function showHeaderPopup(popupPosition) {
  return {
    type: SHOW_HEADER_POPUP,
    popupPosition,
  };
}

export function closeHeaderPopup() {
  return {
    type: CLOSE_HEADER_POPUP,
  };
}
