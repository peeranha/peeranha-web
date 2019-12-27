import { fromJS } from 'immutable';

import {
  showForgotPasswordModal,
  hideForgotPasswordModal,
  getVerificationCode,
  getVerificationCodeSuccess,
  getVerificationCodeErr,
  verifyEmail,
  verifyEmailErr,
  verifyEmailSuccess,
  changePassword,
  changePasswordSuccess,
  changePasswordErr,
  sendAnotherCode,
} from '../actions';

import {
  SHOW_FORGOT_PASSWORD_MODAL,
  HIDE_FORGOT_PASSWORD_MODAL,
  EMAIL_FIELD,
  GET_VERIFICATION_CODE,
  GET_VERIFICATION_CODE_SUCCESS,
  GET_VERIFICATION_CODE_ERROR,
  VERIFICATION_CODE_FIELD,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  MASTER_KEY_FIELD,
  PASSWORD_FIELD,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  SEND_ANOTHER_CODE,
} from '../constants';

describe('ForgotPassword actions', () => {
  it('sendAnotherCode', () => {
    const expected = {
      type: SEND_ANOTHER_CODE,
    };

    expect(sendAnotherCode()).toEqual(expected);
  });

  describe('SHOW_FORGOT_PASSWORD_MODAL', () => {
    it('test', () => {
      const expected = {
        type: SHOW_FORGOT_PASSWORD_MODAL,
      };

      expect(showForgotPasswordModal()).toEqual(expected);
    });
  });

  it('hideForgotPasswordModal', () => {
    const expected = {
      type: HIDE_FORGOT_PASSWORD_MODAL,
    };

    expect(hideForgotPasswordModal()).toEqual(expected);
  });

  it('getVerificationCode', () => {
    const val = fromJS({
      [EMAIL_FIELD]: EMAIL_FIELD,
    });

    const expected = {
      type: GET_VERIFICATION_CODE,
      email: val.get(EMAIL_FIELD),
    };

    expect(getVerificationCode(val)).toEqual(expected);
  });

  it('getVerificationCodeSuccess', () => {
    const expected = {
      type: GET_VERIFICATION_CODE_SUCCESS,
    };

    expect(getVerificationCodeSuccess()).toEqual(expected);
  });

  it('getVerificationCodeErr', () => {
    const getVerificationCodeError = 'getVerificationCodeError';
    const expected = {
      type: GET_VERIFICATION_CODE_ERROR,
      getVerificationCodeError,
    };

    expect(getVerificationCodeErr(getVerificationCodeError)).toEqual(expected);
  });

  it('verifyEmail', () => {
    const val = fromJS({
      [VERIFICATION_CODE_FIELD]: VERIFICATION_CODE_FIELD,
    });

    const expected = {
      type: VERIFY_EMAIL,
      verificationCode: val.get(VERIFICATION_CODE_FIELD),
    };

    expect(verifyEmail(val)).toEqual(expected);
  });

  it('verifyEmailSuccess', () => {
    const expected = {
      type: VERIFY_EMAIL_SUCCESS,
    };

    expect(verifyEmailSuccess()).toEqual(expected);
  });

  it('verifyEmailErr', () => {
    const verifyEmailError = 'verifyEmailError';
    const expected = {
      type: VERIFY_EMAIL_ERROR,
      verifyEmailError,
    };

    expect(verifyEmailErr(verifyEmailError)).toEqual(expected);
  });

  it('changePassword', () => {
    const val = fromJS({
      [MASTER_KEY_FIELD]: MASTER_KEY_FIELD,
      [PASSWORD_FIELD]: PASSWORD_FIELD,
    });

    const expected = {
      type: CHANGE_PASSWORD,
      masterKey: val.get(MASTER_KEY_FIELD),
      password: val.get(PASSWORD_FIELD),
    };

    expect(changePassword(val)).toEqual(expected);
  });

  it('changePasswordSuccess', () => {
    const expected = {
      type: CHANGE_PASSWORD_SUCCESS,
    };

    expect(changePasswordSuccess()).toEqual(expected);
  });

  it('changePasswordErr', () => {
    const changePasswordError = 'changePasswordError';
    const expected = {
      type: CHANGE_PASSWORD_ERROR,
      changePasswordError,
    };

    expect(changePasswordErr(changePasswordError)).toEqual(expected);
  });
});
