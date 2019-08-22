import { fromJS } from 'immutable';

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SUBMIT_EMAIL,
  SUBMIT_EMAIL_SUCCESS,
  SUBMIT_EMAIL_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  SHOW_CHANGE_PASSWORD_MODAL,
  HIDE_CHANGE_PASSWORD_MODAL,
  SUBMIT_EMAIL_FORM,
  CHANGE_PASSWORD_FORM,
} from './constants';

export const initialState = fromJS({
  content: null,
  showModal: false,
  sendEmailProcessing: false,
  sendEmailError: null,
  submitEmailProcessing: false,
  submitEmailError: null,
  changePasswordProcessing: false,
  changePasswordError: null,
  email: null,
  verificationCode: null,
});

function changePasswordByPreviousReducer(state = initialState, action) {
  const {
    type,
    submitEmailError,
    content,
    changePasswordError,
    sendEmailError,
    email,
    verificationCode,
  } = action;

  switch (type) {
    case SHOW_CHANGE_PASSWORD_MODAL:
      return state.set('showModal', true).set('content', content);
    case HIDE_CHANGE_PASSWORD_MODAL:
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

    case SUBMIT_EMAIL:
      return state
        .set('submitEmailProcessing', true)
        .set('verificationCode', verificationCode);
    case SUBMIT_EMAIL_SUCCESS:
      return state
        .set('submitEmailProcessing', false)
        .set('content', CHANGE_PASSWORD_FORM);
    case SUBMIT_EMAIL_ERROR:
      return state
        .set('submitEmailProcessing', false)
        .set('submitEmailError', submitEmailError);

    case CHANGE_PASSWORD:
      return state.set('changePasswordProcessing', true);
    case CHANGE_PASSWORD_SUCCESS:
      return state
        .set('changePasswordProcessing', false)
        .set('content', initialState.get('content'))
        .set('showModal', false);
    case CHANGE_PASSWORD_ERROR:
      return state
        .set('changePasswordProcessing', false)
        .set('changePasswordError', changePasswordError);

    default:
      return state;
  }
}

export default changePasswordByPreviousReducer;
