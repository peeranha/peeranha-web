/*
 *
 * Login actions
 *
 */

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  LOGIN_MODAL_ID,
  SHOW_DEFAULT_LOGIN_MODAL,
} from './constants';

export function showLoginModal(content) {
  window.$(`#${LOGIN_MODAL_ID}`).modal('show');
  return {
    type: SHOW_LOGIN_MODAL,
    content: content || SHOW_DEFAULT_LOGIN_MODAL,
  };
}

export function hideLoginModal() {
  window.$(`#${LOGIN_MODAL_ID}`).modal('hide');
  return {
    type: HIDE_LOGIN_MODAL,
  };
}
