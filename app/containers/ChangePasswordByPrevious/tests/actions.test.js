import { fromJS } from 'immutable';

import {
  showChangePasswordModal,
  hideChangePasswordModal,
  changePassword,
  changePasswordSuccess,
  changePasswordErr,
  sendEmail,
  sendEmailSuccess,
  sendEmailErr,
  submitEmail,
  submitEmailSuccess,
  submitEmailErr,
} from '../actions';

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SHOW_CHANGE_PASSWORD_MODAL,
  HIDE_CHANGE_PASSWORD_MODAL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  EMAIL_FIELD,
  CODE_FIELD,
  SUBMIT_EMAIL,
  SUBMIT_EMAIL_SUCCESS,
  SUBMIT_EMAIL_ERROR,
} from '../constants';

describe('showChangePassword actions', () => {
  it('showChangePasswordModal', () => {
    const expected = {
      type: SHOW_CHANGE_PASSWORD_MODAL,
    };

    expect(showChangePasswordModal()).toEqual(expected);
  });

  it('hideChangePasswordModal', () => {
    const expected = {
      type: HIDE_CHANGE_PASSWORD_MODAL,
    };

    expect(hideChangePasswordModal()).toEqual(expected);
  });

  it('sendEmail', () => {
    const email = 'email';

    const args = [
      fromJS({ [EMAIL_FIELD]: email }),
      () => null,
      { reset: jest.fn() },
    ];

    const expected = {
      type: SEND_EMAIL,
      resetForm: args[2].reset,
      email,
    };

    expect(sendEmail(args)).toEqual(expected);
  });

  it('sendEmailSuccess', () => {
    const verificationCode = 'verificationCode';
    const expected = {
      type: SEND_EMAIL_SUCCESS,
      verificationCode,
    };

    expect(sendEmailSuccess(verificationCode)).toEqual(expected);
  });

  it('sendEmailErr', () => {
    const sendEmailError = 'sendEmailError';
    const expected = {
      type: SEND_EMAIL_ERROR,
      sendEmailError,
    };

    expect(sendEmailErr(sendEmailError)).toEqual(expected);
  });

  it('changePassword', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];

    const expected = {
      type: CHANGE_PASSWORD,
      resetForm: args[2].reset,
      values: args[0].toJS(),
    };

    expect(changePassword(args)).toEqual(expected);
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

  it('submitEmail', () => {
    const verificationCode = 'verificationCode';
    const args = [
      fromJS({
        [CODE_FIELD]: verificationCode,
      }),
      () => null,
      { reset: jest.fn() },
    ];

    const expected = {
      type: SUBMIT_EMAIL,
      resetForm: args[2].reset,
      verificationCode,
    };

    expect(submitEmail(args)).toEqual(expected);
  });

  it('submitEmailSuccess', () => {
    const expected = {
      type: SUBMIT_EMAIL_SUCCESS,
    };

    expect(submitEmailSuccess()).toEqual(expected);
  });

  it('submitEmailErr', () => {
    const submitEmailError = 'submitEmailError';
    const expected = {
      type: SUBMIT_EMAIL_ERROR,
      submitEmailError,
    };

    expect(submitEmailErr(submitEmailError)).toEqual(expected);
  });
});
