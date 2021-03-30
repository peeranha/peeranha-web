/*
 *
 * SendTokens actions
 *
 */

import {
  SHOW_SENDTOKENS_MODAL,
  HIDE_SENDTOKENS_MODAL,
  SHOW_VERIFY_FB_MODAL,
  SEND_FB_VERIFICATION_EMAIL,
  SEND_TOKENS,
  SEND_TOKENS_SUCCESS,
  SEND_TOKENS_ERROR,
  VERIFY_FB_ACTION,
  SET_SEND_TOKENS_PROCESSING,
  SEND_ANOTHER_CODE,
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

export function sendFbVerificationEmail(...args) {
  return {
    type: SEND_FB_VERIFICATION_EMAIL,
    fbSendTokensFormValues: args[0].toJS(),
  };
}

export function showVerifyFbModal() {
  return {
    type: SHOW_VERIFY_FB_MODAL,
  };
}

export function sendAnotherCode() {
  return {
    type: SEND_ANOTHER_CODE,
  };
}

export function verifyFbAction(...args) {
  return {
    type: VERIFY_FB_ACTION,
    verifyFormVals: args[0].toJS(),
  };
}

export function setSendTokensProcessing(processing) {
  return {
    type: SET_SEND_TOKENS_PROCESSING,
    processing,
  };
}

export function sendTokens(...args) {
  return {
    type: SEND_TOKENS,
    val: args[0].toJS(),
    processing: true,
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
