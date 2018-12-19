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
} from './constants';

/*
 *
 * sendEmail actions
 *
 */

export function sendEmail(formData) {
  return {
    type: SEND_EMAIL,
    formData,
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

export function sendMessage(formData) {
  return {
    type: SEND_MESSAGE,
    formData,
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
