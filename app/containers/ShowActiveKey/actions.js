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
