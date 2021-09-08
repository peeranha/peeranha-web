/*
 *
 * ShowActiveKey actions
 *
 */

import {
  SHOW_ACTIVE_KEY,
  SHOW_ACTIVE_KEY_SUCCESS,
  SHOW_ACTIVE_KEY_ERROR,
  SHOW_ACTIVE_KEY_MODAL,
  HIDE_ACTIVE_KEY_MODAL,
  PASSWORD_FIELD,
  REMOVE_ACTIVE_KEY,
  SEND_FB_VERIFICATION_EMAIL,
  SET_SHOW_ACTIVE_KEY_PROCESSING,
  VERIFY_FB_ACTION,
  SEND_ANOTHER_CODE,
} from './constants';

export function showActiveKeyModal() {
  return {
    type: SHOW_ACTIVE_KEY_MODAL,
  };
}

export function hideActiveKeyModal() {
  return {
    type: HIDE_ACTIVE_KEY_MODAL,
  };
}

export function showActiveKey(...args) {
  return {
    type: SHOW_ACTIVE_KEY,
    password: args[0].toJS()[PASSWORD_FIELD],
    resetForm: args[2].reset,
  };
}

export function showActiveKeySuccess(activeKey) {
  return {
    type: SHOW_ACTIVE_KEY_SUCCESS,
    activeKey,
  };
}

export function showActiveKeyErr(showActiveKeyError) {
  return {
    type: SHOW_ACTIVE_KEY_ERROR,
    showActiveKeyError,
  };
}

export function removeActiveKey() {
  return {
    type: REMOVE_ACTIVE_KEY,
  };
}

export function sendFbVerificationEmail() {
  return {
    type: SEND_FB_VERIFICATION_EMAIL,
  };
}

export const sendAnotherCode = () => ({
  type: SEND_ANOTHER_CODE,
});

export function setShowActiveKeyProcessing(processing) {
  return {
    type: SET_SHOW_ACTIVE_KEY_PROCESSING,
    processing,
  };
}

export function verifyFbAction(...args) {
  return {
    type: VERIFY_FB_ACTION,
    verifyFormVals: args[0].toJS(),
  };
}
