import {
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_SUCCESS,
} from './constants';

export function sendMessage(...val: any) {
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

export function sendMessageErr(sendMessageError: string) {
  return {
    type: SEND_MESSAGE_ERROR,
    sendMessageError,
  };
}
