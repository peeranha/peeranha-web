/*
 *
 * homepage actions
 *
 */

import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
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
