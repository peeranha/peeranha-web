/*
 *
 * ShowOwnerKey reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SHOW_OWNER_KEY,
  SHOW_OWNER_KEY_SUCCESS,
  SHOW_OWNER_KEY_ERROR,
  SHOW_OWNER_KEY_MODAL,
  HIDE_OWNER_KEY_MODAL,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SUBMIT_EMAIL_FORM,
} from './constants';

export const initialState = fromJS({
  content: null,
  showModal: false,
  showOwnerKeyProcessing: false,
  showOwnerKeyError: null,
  sendEmailProcessing: false,
  sendEmailError: null,
});

function showOwnerKeyReducer(state = initialState, action) {
  const { type, showOwnerKeyError, content, sendEmailError } = action;

  switch (type) {
    case SHOW_OWNER_KEY_MODAL:
      return state.set('showModal', true).set('content', content);
    case HIDE_OWNER_KEY_MODAL:
      return state
        .set('showModal', false)
        .set('content', initialState.get('content'));

    case SHOW_OWNER_KEY:
      return state.set('showOwnerKeyProcessing', true);
    case SHOW_OWNER_KEY_SUCCESS:
      return state
        .set('showOwnerKeyProcessing', false)
        .set('content', initialState.get('content'))
        .set('showModal', false);
    case SHOW_OWNER_KEY_ERROR:
      return state
        .set('showOwnerKeyProcessing', false)
        .set('showOwnerKeyError', showOwnerKeyError);

    case SEND_EMAIL:
      return state.set('sendEmailProcessing', true);
    case SEND_EMAIL_SUCCESS:
      return state
        .set('sendEmailProcessing', false)
        .set('content', SUBMIT_EMAIL_FORM);
    case SEND_EMAIL_ERROR:
      return state
        .set('sendEmailProcessing', false)
        .set('sendEmailError', sendEmailError);

    default:
      return state;
  }
}

export default showOwnerKeyReducer;
