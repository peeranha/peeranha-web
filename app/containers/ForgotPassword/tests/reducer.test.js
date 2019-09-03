import { fromJS } from 'immutable';
import forgotPasswordReducer, { initialState } from '../reducer';

import {
  showForgotPasswordModal,
  hideForgotPasswordModal,
  getVerificationCode,
  getVerificationCodeSuccess,
  getVerificationCodeErr,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailErr,
  changePassword,
  changePasswordSuccess,
  changePasswordErr,
} from '../actions';

import {
  EMAIL_FIELD,
  VERIFICATION_CODE_FORM,
  VERIFICATION_CODE_FIELD,
  NEW_PASSWORD_FORM,
} from '../constants';

describe('forgotPasswordReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(forgotPasswordReducer(state, {})).toEqual(state);
  });

  it('SHOW_FORGOT_PASSWORD_MODAL', () => {
    const content = 'content';
    const obj = state.set('showModal', true).set('content', content);

    expect(
      forgotPasswordReducer(state, showForgotPasswordModal(content)),
    ).toEqual(obj);
  });

  it('HIDE_FORGOT_PASSWORD_MODAL', () => {
    const obj = state.set('showModal', false);
    expect(forgotPasswordReducer(state, hideForgotPasswordModal())).toEqual(
      obj,
    );
  });

  it('GET_VERIFICATION_CODE', () => {
    const email = 'email';

    const val = fromJS({
      [EMAIL_FIELD]: email,
    });

    const obj = state
      .set('getVerificationCodeLoading', true)
      .set('email', email);

    expect(forgotPasswordReducer(state, getVerificationCode(val))).toEqual(obj);
  });

  it('GET_VERIFICATION_CODE_SUCCESS', () => {
    const obj = state
      .set('getVerificationCodeLoading', false)
      .set('content', VERIFICATION_CODE_FORM);

    expect(forgotPasswordReducer(state, getVerificationCodeSuccess())).toEqual(
      obj,
    );
  });

  it('GET_VERIFICATION_CODE_ERROR', () => {
    const getVerificationCodeError = 'getVerificationCodeError';
    const obj = state
      .set('getVerificationCodeLoading', false)
      .set('getVerificationCodeError', getVerificationCodeError);

    expect(
      forgotPasswordReducer(
        state,
        getVerificationCodeErr(getVerificationCodeError),
      ),
    ).toEqual(obj);
  });

  it('VERIFY_EMAIL', () => {
    const verificationCode = 'verificationCode';

    const val = fromJS({
      [VERIFICATION_CODE_FIELD]: verificationCode,
    });

    const obj = state
      .set('verifyEmailLoading', true)
      .set('verificationCode', verificationCode);

    expect(forgotPasswordReducer(state, verifyEmail(val))).toEqual(obj);
  });

  it('VERIFY_EMAIL_SUCCESS', () => {
    const obj = state
      .set('verifyEmailLoading', false)
      .set('content', NEW_PASSWORD_FORM);

    expect(forgotPasswordReducer(state, verifyEmailSuccess())).toEqual(obj);
  });

  it('VERIFY_EMAIL_ERROR', () => {
    const verifyEmailError = 'verifyEmailError';
    const obj = state
      .set('verifyEmailLoading', false)
      .set('verifyEmailError', verifyEmailError);

    expect(
      forgotPasswordReducer(state, verifyEmailErr(verifyEmailError)),
    ).toEqual(obj);
  });

  it('CHANGE_PASSWORD', () => {
    const val = fromJS({
      [VERIFICATION_CODE_FIELD]: VERIFICATION_CODE_FIELD,
    });

    const obj = state.set('changePasswordLoading', true);

    expect(forgotPasswordReducer(state, changePassword(val))).toEqual(obj);
  });

  it('CHANGE_PASSWORD_SUCCESS', () => {
    const obj = state
      .set('changePasswordLoading', false)
      .set('showModal', initialState.get('showModal'))
      .set('content', initialState.get('content'));

    expect(forgotPasswordReducer(state, changePasswordSuccess())).toEqual(obj);
  });

  it('CHANGE_PASSWORD_ERROR', () => {
    const changePasswordError = 'changePasswordError';
    const obj = state
      .set('changePasswordError', changePasswordError)
      .set('changePasswordLoading', false);

    expect(
      forgotPasswordReducer(state, changePasswordErr(changePasswordError)),
    ).toEqual(obj);
  });
});
