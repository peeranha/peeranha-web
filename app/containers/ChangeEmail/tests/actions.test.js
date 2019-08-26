import { fromJS } from 'immutable';

import {
  showChangeEmailModal,
  hideChangeEmailModal,
  sendOldEmail,
  sendOldEmailSuccess,
  sendOldEmailErr,
  confirmOldEmail,
  confirmOldEmailSuccess,
  confirmOldEmailErr,
  changeEmail,
  changeEmailSuccess,
  changeEmailErr,
} from '../actions';

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
  OLD_EMAIL_FIELD,
  CODE_FIELD,
} from '../constants';

describe('changeEmail actions', () => {
  it('showChangeEmailModal', () => {
    const expected = {
      type: SHOW_CHANGE_EMAIL_MODAL,
    };

    expect(showChangeEmailModal()).toEqual(expected);
  });

  it('hideChangeEmailModal', () => {
    const expected = {
      type: HIDE_CHANGE_EMAIL_MODAL,
    };

    expect(hideChangeEmailModal()).toEqual(expected);
  });

  it('sendOldEmail', () => {
    const oldEmail = 'oldEmail';

    const args = [
      fromJS({ [OLD_EMAIL_FIELD]: oldEmail }),
      () => null,
      { reset: jest.fn() },
    ];

    const expected = {
      type: SEND_OLD_EMAIL,
      resetForm: args[2].reset,
      email: oldEmail,
    };

    expect(sendOldEmail(args)).toEqual(expected);
  });

  it('sendOldEmailSuccess', () => {
    const expected = {
      type: SEND_OLD_EMAIL_SUCCESS,
    };

    expect(sendOldEmailSuccess()).toEqual(expected);
  });

  it('sendOldEmailErr', () => {
    const sendOldEmailError = 'sendOldEmailError';
    const expected = {
      type: SEND_OLD_EMAIL_ERROR,
      sendOldEmailError,
    };

    expect(sendOldEmailErr(sendOldEmailError)).toEqual(expected);
  });

  it('confirmOldEmail', () => {
    const verificationCode = '1234';
    const args = [
      fromJS({ [CODE_FIELD]: verificationCode }),
      () => null,
      { reset: jest.fn() },
    ];

    const expected = {
      type: CONFIRM_OLD_EMAIL,
      resetForm: args[2].reset,
      verificationCode,
    };

    expect(confirmOldEmail(args)).toEqual(expected);
  });

  it('confirmOldEmailSuccess', () => {
    const expected = {
      type: CONFIRM_OLD_EMAIL_SUCCESS,
    };

    expect(confirmOldEmailSuccess()).toEqual(expected);
  });

  it('confirmOldEmailErr', () => {
    const confirmOldEmailError = 'confirmOldEmailError';
    const expected = {
      type: CONFIRM_OLD_EMAIL_ERROR,
      confirmOldEmailError,
    };

    expect(confirmOldEmailErr(confirmOldEmailError)).toEqual(expected);
  });

  it('changeEmail', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];

    const expected = {
      type: CHANGE_EMAIL,
      resetForm: args[2].reset,
      values: args[0].toJS(),
    };

    expect(changeEmail(args)).toEqual(expected);
  });

  it('changeEmailSuccess', () => {
    const expected = {
      type: CHANGE_EMAIL_SUCCESS,
    };

    expect(changeEmailSuccess()).toEqual(expected);
  });

  it('changeEmailErr', () => {
    const changeEmailError = 'changeEmailError';
    const expected = {
      type: CHANGE_EMAIL_ERROR,
      changeEmailError,
    };

    expect(changeEmailErr(changeEmailError)).toEqual(expected);
  });
});
