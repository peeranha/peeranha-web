/*
 *
 * ShowOwnerKey reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

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
  EMAIL_FORM,
  REMOVE_OWNER_KEY,
} from './constants';

export const initialState = fromJS({
  content: null,
  showModal: false,
  showOwnerKeyProcessing: false,
  showOwnerKeyError: null,
  sendEmailProcessing: false,
  sendEmailError: null,
  password: null,
  ownerKey: null,
});

function showOwnerKeyReducer(state = initialState, action) {
  const {
    type,
    showOwnerKeyError,
    sendEmailError,
    password,
    ownerKey,
  } = action;

  switch (type) {
    case SHOW_OWNER_KEY_MODAL:
      return state.set('showModal', true).set('content', EMAIL_FORM);
    case HIDE_OWNER_KEY_MODAL:
      return state
        .set('showModal', false)
        .set('content', initialState.get('content'));

    case REMOVE_OWNER_KEY:
      return state.set('ownerKey', initialState.get('ownerKey'));

    case SHOW_OWNER_KEY:
      return state.set('showOwnerKeyProcessing', true);
    case SHOW_OWNER_KEY_SUCCESS:
      return state
        .set('ownerKey', ownerKey)
        .set('showOwnerKeyProcessing', false)
        .set('content', initialState.get('content'))
        .set('showModal', false);
    case SHOW_OWNER_KEY_ERROR:
      return state
        .set('showOwnerKeyProcessing', false)
        .set('showOwnerKeyError', showOwnerKeyError);

    case SEND_EMAIL:
      return state.set('sendEmailProcessing', true).set('password', password);
    case SEND_EMAIL_SUCCESS:
      return state
        .set('sendEmailProcessing', false)
        .set('content', SUBMIT_EMAIL_FORM);
    case SEND_EMAIL_ERROR:
      return state
        .set('sendEmailProcessing', false)
        .set('sendEmailError', sendEmailError);

    case LOCATION_CHANGE:
      return initialState;

    default:
      return state;
  }
}

export default showOwnerKeyReducer;
