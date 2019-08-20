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
} from './constants';

export function showActiveKeyModal() {
  return {
    type: SHOW_ACTIVE_KEY_MODAL,
  }
}

export function hideActiveKeyModal() {
  return {
    type: HIDE_ACTIVE_KEY_MODAL,
  }
}

export function showActiveKey(args) {
  return {
    type: SHOW_ACTIVE_KEY,
    values: args[0].toJS(),
    resetForm: args[2].reset,
  };
}

export function showActiveKeySuccess() {
  return {
    type: SHOW_ACTIVE_KEY_SUCCESS,
  };
}

export function showActiveKeyErr(showActiveKeyError) {
  return {
    type: SHOW_ACTIVE_KEY_ERROR,
    showActiveKeyError,
  };
}
