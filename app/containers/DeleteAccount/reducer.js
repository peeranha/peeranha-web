/*
 *
 * ShowOwnerKey reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SHOW_DELETE_ACCOUNT_MODAL,
  HIDE_DELETE_ACCOUNT_MODAL,
  SUBMIT_EMAIL_FORM,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_ERROR,
  EMAIL_FORM,
} from './constants';

export const initialState = fromJS({
  content: null,
  showModal: false,
  sendEmailProcessing: false,
  sendEmailError: null,
  deleteAccountProcessing: false,
  deleteAccountError: null,
  email: null,
});

function deleteAccountReducer(state = initialState, action) {
  const { type, deleteAccountError, sendEmailError, email } = action;

  switch (type) {
    case SHOW_DELETE_ACCOUNT_MODAL:
      return state.set('showModal', true).set('content', EMAIL_FORM);
    case HIDE_DELETE_ACCOUNT_MODAL:
      return state
        .set('showModal', false)
        .set('content', initialState.get('content'));

    case SEND_EMAIL:
      return state.set('sendEmailProcessing', true).set('email', email);
    case SEND_EMAIL_SUCCESS:
      return state
        .set('sendEmailProcessing', false)
        .set('content', SUBMIT_EMAIL_FORM);
    case SEND_EMAIL_ERROR:
      return state
        .set('sendEmailProcessing', false)
        .set('sendEmailError', sendEmailError);

    case DELETE_ACCOUNT:
      return state.set('deleteAccountProcessing', true);
    case DELETE_ACCOUNT_SUCCESS:
      return state
        .set('deleteAccountProcessing', false)
        .set('content', initialState.get('content'))
        .set('showModal', false);
    case DELETE_ACCOUNT_ERROR:
      return state
        .set('deleteAccountProcessing', false)
        .set('deleteAccountError', deleteAccountError);

    default:
      return state;
  }
}

export default deleteAccountReducer;
