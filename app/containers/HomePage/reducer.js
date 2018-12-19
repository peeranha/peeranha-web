/*
 *
 * Homepage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from './constants';

export const initialState = fromJS({
  sendEmailLoading: false,
  sendEmailError: null,
  sendMessageLoading: false,
  sendMessageError: null,
});

function homepageReducer(state = initialState, action) {
  const { type, sendEmailError, sendMessageError } = action;

  switch (type) {
    case SEND_EMAIL:
      return state.set('sendEmailLoading', true);
    case SEND_EMAIL_SUCCESS:
      return state.set('sendEmailLoading', false);
    case SEND_EMAIL_ERROR:
      return state
        .set('sendEmailLoading', false)
        .set('sendEmailError', sendEmailError);

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
