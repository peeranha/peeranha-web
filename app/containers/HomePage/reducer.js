/*
 *
 * Homepage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from './constants';

export const initialState = fromJS({
  sendMessageLoading: false,
  sendMessageError: null,
});

function homepageReducer(state = initialState, action) {
  const { type, sendMessageError } = action;

  switch (type) {
    case SEND_MESSAGE:
      return state.set('sendMessageLoading', true);
    case SEND_MESSAGE_SUCCESS:
      return state.set('sendMessageLoading', false);
    case SEND_MESSAGE_ERROR:
      return state
        .set('sendMessageLoading', false)
        .set('sendMessageError', sendMessageError);

    default:
      return state;
  }
}

export default homepageReducer;
