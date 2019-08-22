/*
 *
 * ChangeEmail reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SEND_OLD_EMAIL,
  SEND_OLD_EMAIL_SUCCESS,
  SEND_OLD_EMAIL_ERROR,
  CONFIRM_OLD_EMAIL,
  CONFIRM_OLD_EMAIL_SUCCESS,
  CONFIRM_OLD_EMAIL_ERROR,
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_ERROR,
  SHOW_CHANGE_EMAIL_MODAL,
  HIDE_CHANGE_EMAIL_MODAL,
  OLD_EMAIL_FORM,
  CONFIRM_EMAIL_FORM,
  CHANGE_EMAIL_FORM,
} from './constants';

export const initialState = fromJS({
  showModal: false,
  content: null,
  sendOldEmailProcessing: false,
  sendOldEmailError: null,
  confirmOldEmailProcessing: false,
  confirmOldEmailError: null,
  changeEmailProcessing: false,
  changeEmailError: null,
  email: null,
  verificationCode: null,
});

function changeEmailReducer(state = initialState, action) {
  const {
    type,
    changeEmailError,
    sendOldEmailError,
    confirmOldEmailError,
    email,
    verificationCode,
  } = action;

  switch (type) {
    case SHOW_CHANGE_EMAIL_MODAL:
      return state.set('showModal', true).set('content', OLD_EMAIL_FORM);
    case HIDE_CHANGE_EMAIL_MODAL:
      return state.set('showModal', false);

    case SEND_OLD_EMAIL:
      return state.set('sendOldEmailProcessing', true).set('email', email);
    case SEND_OLD_EMAIL_SUCCESS:
      return state
        .set('sendOldEmailProcessing', false)
        .set('content', CONFIRM_EMAIL_FORM);
    case SEND_OLD_EMAIL_ERROR:
      return state
        .set('sendOldEmailProcessing', false)
        .set('sendOldEmailError', sendOldEmailError);

    case CONFIRM_OLD_EMAIL:
      return state
        .set('confirmOldEmailProcessing', true)
        .set('verificationCode', verificationCode);
    case CONFIRM_OLD_EMAIL_SUCCESS:
      return state
        .set('confirmOldEmailProcessing', false)
        .set('content', CHANGE_EMAIL_FORM);
    case CONFIRM_OLD_EMAIL_ERROR:
      return state
        .set('confirmOldEmailProcessing', false)
        .set('confirmOldEmailError', confirmOldEmailError);

    case CHANGE_EMAIL:
      return state.set('changeEmailProcessing', true);
    case CHANGE_EMAIL_SUCCESS:
      return state
        .set('changeEmailProcessing', false)
        .set('showModal', initialState.get('showModal'))
        .set('content', initialState.get('content'));
    case CHANGE_EMAIL_ERROR:
      return state
        .set('changeEmailProcessing', false)
        .set('changeEmailError', changeEmailError);

    default:
      return state;
  }
}

export default changeEmailReducer;
