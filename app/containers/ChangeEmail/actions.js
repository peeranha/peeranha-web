/*
 *
 * ShowChangeEmail actions
 *
 */

import {
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_ERROR,
  SHOW_CHANGE_EMAIL_MODAL,
  HIDE_CHANGE_EMAIL_MODAL,
} from './constants';

export function showChangeEmailModal() {
  return {
    type: SHOW_CHANGE_EMAIL_MODAL,
  }
}

export function hideChangeEmailModal() {
  return {
    type: HIDE_CHANGE_EMAIL_MODAL,
  }
}

export function changeEmail(args) {
  return {
    type: CHANGE_EMAIL,
    values: args[0].toJS(),
    resetForm: args[2].reset,
  };
}

export function changeEmailSuccess() {
  return {
    type: CHANGE_EMAIL_SUCCESS,
  };
}

export function changeEmailErr(changeEmailError) {
  return {
    type: CHANGE_EMAIL_ERROR,
    changeEmailError,
  };
}
