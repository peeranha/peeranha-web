/*
 *
 * SendTokens actions
 *
 */

import {
  SHOW_SENDTOKENS_MODAL,
  HIDE_SENDTOKENS_MODAL,
  SEND_TOKENS,
  SEND_TOKENS_SUCCESS,
  SEND_TOKENS_ERROR,
} from './constants';

export function showSendTokensModal() {
  return {
    type: SHOW_SENDTOKENS_MODAL,
  };
}

export function hideSendTokensModal() {
  return {
    type: HIDE_SENDTOKENS_MODAL,
  };
}

export function sendTokens(...args) {
  return {
    type: SEND_TOKENS,
    val: args[0].toJS(),
    resetForm: args[2].reset,
  };
}

export function sendTokensSuccess() {
  return {
    type: SEND_TOKENS_SUCCESS,
  };
}

export function sendTokensErr(sendTokensError) {
  return {
    type: SEND_TOKENS_ERROR,
    sendTokensError,
  };
}
