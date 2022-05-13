import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  SHOW_CHANGE_PASSWORD_MODAL,
  HIDE_CHANGE_PASSWORD_MODAL,
} from './constants';

// Modal actions

export function showChangePasswordModal() {
  return {
    type: SHOW_CHANGE_PASSWORD_MODAL,
  };
}

export function hideChangePasswordModal() {
  return {
    type: HIDE_CHANGE_PASSWORD_MODAL,
  };
}

// Change password

export function changePassword(...args) {
  return {
    type: CHANGE_PASSWORD,
    values: args[0].toJS(),
    resetForm: args[2].reset,
  };
}

export function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
}

export function changePasswordErr(changePasswordError) {
  return {
    type: CHANGE_PASSWORD_ERROR,
    changePasswordError,
  };
}
