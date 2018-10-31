/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import { SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL } from './constants';

export const initialState = fromJS({
  content: null,
  showModal: false,
});

function loginReducer(state = initialState, action) {
  const { type, content } = action;

  switch (type) {
    case SHOW_LOGIN_MODAL:
      return state.set('showModal', true).set('content', content);
    case HIDE_LOGIN_MODAL:
      return state.set('showModal', false);
    default:
      return state;
  }
}

export default loginReducer;
