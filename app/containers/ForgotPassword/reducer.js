/*
 *
 * ForgotPassword reducer
 *
 */

import { fromJS } from 'immutable';

import {
  NEW_PASSWORD_FORM,
  SHOW_FORGOT_PASSWORD_MODAL,
  HIDE_FORGOT_PASSWORD_MODAL,
  GET_VERIFICATION_CODE,
  GET_VERIFICATION_CODE_SUCCESS,
  GET_VERIFICATION_CODE_ERROR,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  EMAIL_FORM,
} from './constants';

export const initialState = fromJS({
  showModal: false,
  content: null,
  getVerificationCodeLoading: false,
  getVerificationCodeError: null,
  verifyEmailLoading: false,
  verifyEmailError: null,
  changePasswordLoading: false,
  changePasswordError: null,
  email: null,
  verificationCode: null,
});

function forgotPasswordReducer(state = initialState, action) {
  const {
    type,
    getVerificationCodeError,
    verifyEmailError,
    changePasswordError,
    email,
    verificationCode,
  } = action;

  switch (type) {
    case SHOW_FORGOT_PASSWORD_MODAL:
      return state.set('showModal', true).set('content', EMAIL_FORM);
    case HIDE_FORGOT_PASSWORD_MODAL:
      return state.set('showModal', false);

    case GET_VERIFICATION_CODE:
      return state.set('getVerificationCodeLoading', true).set('email', email);
    case GET_VERIFICATION_CODE_SUCCESS:
      return state
        .set('getVerificationCodeLoading', false)
        .set('content', NEW_PASSWORD_FORM);
    case GET_VERIFICATION_CODE_ERROR:
      return state
        .set('getVerificationCodeLoading', false)
        .set('getVerificationCodeError', getVerificationCodeError);

    case VERIFY_EMAIL:
      return state
        .set('verifyEmailLoading', true)
        .set('verificationCode', verificationCode);
    case VERIFY_EMAIL_SUCCESS:
      return state
        .set('verifyEmailLoading', false)
        .set('content', NEW_PASSWORD_FORM);
    case VERIFY_EMAIL_ERROR:
      return state
        .set('verifyEmailLoading', false)
        .set('verifyEmailError', verifyEmailError);

    case CHANGE_PASSWORD:
      return state.set('changePasswordLoading', true);
    case CHANGE_PASSWORD_SUCCESS:
      return state
        .set('changePasswordLoading', false)
        .set('showModal', initialState.get('showModal'))
        .set('content', initialState.get('content'));
    case CHANGE_PASSWORD_ERROR:
      return state
        .set('changePasswordLoading', false)
        .set('changePasswordError', changePasswordError);

    default:
      return state;
  }
}

export default forgotPasswordReducer;
