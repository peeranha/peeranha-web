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
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
} from './constants';

export const initialState = fromJS({
  sendMessageLoading: false,
  sendMessageError: null,
  sendEmailLoading: false,
  sendEmailError: null,
  showModal: false,
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
    case SEND_EMAIL:
      return state.set('sendEmailLoading', true);
    case SEND_EMAIL_SUCCESS:
      return state.set('sendEmailLoading', false).set('showModal', false);
    case SEND_EMAIL_ERROR:
      return state
        .set('sendEmailLoading', false)
        .set('sendEmailError', sendMessageError);
    case SHOW_LOGIN_MODAL:
      return state.set('showModal', true);
    case HIDE_LOGIN_MODAL:
      return state.set('showModal', false);

    default:
      return state;
  }
}

export default homepageReducer;
