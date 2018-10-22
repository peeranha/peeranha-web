/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import { SHOW_LOGIN_MODAL } from './constants';

export const initialState = fromJS({
  content: null,
});

function loginReducer(state = initialState, action) {
  const { type, content } = action;

  switch (type) {
    case SHOW_LOGIN_MODAL:
      return state.set('content', content);
    default:
      return state;
  }
}

export default loginReducer;
