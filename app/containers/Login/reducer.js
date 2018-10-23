/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import { SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL } from './constants';

export const initialState = fromJS({
  content: null,
  showModal: 'hide',
});

function loginReducer(state = initialState, action) {
  const { type, content } = action;

  switch (type) {
    case SHOW_LOGIN_MODAL:
      return state.set('showModal', 'show').set('content', content);
    case HIDE_LOGIN_MODAL:
      return state.set('showModal', 'hide');
    default:
      return state;
  }
}

export default loginReducer;
