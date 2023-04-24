import { fromJS } from 'immutable';
import { ActionType, ReducerType } from './types';

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_ERROR,
  SHOW_CHANGE_EMAIL_MODAL,
  SHOW_CHANGE_EMAIL_MODAL_SUCCESS,
  SHOW_CHANGE_EMAIL_MODAL_ERROR,
  HIDE_CHANGE_EMAIL_MODAL,
  EMAIL_FORM,
  SEND_EMAIL_FORM,
  CONFIRM_EMAIL_FORM,
  CHANGE_EMAIL_FORM,
  GET_EMAIL_ADDRESS,
  GET_EMAIL_ADDRESS_SUCCESS,
  GET_EMAIL_ADDRESS_ERROR,
  SEND_VERIFICATION_CODE,
  UNSUBSCRIBE_EMAIL_ADDRESS_SUCCESS,
  UNSUBSCRIBE_EMAIL_ADDRESS_ERROR,
} from './constants';

export const initialState = fromJS({
  showModal: false,
  content: null,
  sendEmailProcessing: false,
  confirmEmailProcessing: false,
  verificationCodeError: null,
  email: null,
  currentEmail: null,
  isSubscribed: false,
  verificationCode: null,
  verificationCodeRequest: 0,
});

function emailNotificationsReducer(state = initialState, action: ActionType) {
  const { type, email, code, isSubscribed, currentEmail } = action;

  switch (type) {
    case SHOW_CHANGE_EMAIL_MODAL_SUCCESS:
      return state
        .set('showModal', true)
        .set('content', SEND_EMAIL_FORM)
        .set('currentEmail', currentEmail);
    case HIDE_CHANGE_EMAIL_MODAL:
      return state.set('showModal', false).set('content', null);
    case SEND_EMAIL:
      return state.set('sendEmailProcessing', true);
    case GET_EMAIL_ADDRESS_SUCCESS:
      return state.set('email', email).set('isSubscribed', isSubscribed);
    case SEND_EMAIL_SUCCESS:
      return state
        .set('sendEmailProcessing', false)
        .set('content', CONFIRM_EMAIL_FORM);
    case SEND_EMAIL_ERROR:
      return state.set('sendEmailProcessing', false);

    case CONFIRM_EMAIL:
      return state
        .set('confirmEmailProcessing', true)
        .set('verificationCodeError', false)
        .set('verificationCode', code);
    case CONFIRM_EMAIL_SUCCESS:
      return state
        .set('confirmEmailProcessing', false)
        .set('content', CHANGE_EMAIL_FORM)
        .set('email', email)
        .set('isSubscribed', isSubscribed)
        .set('verificationCodeError', false);
    case CONFIRM_EMAIL_ERROR:
      return state
        .set('confirmEmailProcessing', false)
        .set('verificationCodeError', true);
    case SEND_VERIFICATION_CODE:
      return state.set(
        'verificationCodeRequest',
        state.get('verificationCodeRequest') + 1,
      );
    case UNSUBSCRIBE_EMAIL_ADDRESS_SUCCESS:
      return state.set('isSubscribed', !state.get('isSubscribed'));
    default:
      return state;
  }
}

export default emailNotificationsReducer;
