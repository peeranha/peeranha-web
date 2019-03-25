/*
 *
 * Login actions
 *
 */

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  SHOW_DEFAULT_LOGIN_MODAL,
} from './constants';

export function showLoginModal(content) {
  return {
    type: SHOW_LOGIN_MODAL,
    content: content || SHOW_DEFAULT_LOGIN_MODAL,
  };
}

export function hideLoginModal() {
  return {
    type: HIDE_LOGIN_MODAL,
  };
}
