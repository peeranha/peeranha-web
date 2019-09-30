import { fromJS } from 'immutable';

import {
  showDeleteAccountModal,
  hideDeleteAccountModal,
  deleteAccount,
  deleteAccountSuccess,
  deleteAccountErr,
  sendEmail,
  sendEmailSuccess,
  sendEmailErr,
} from '../actions';

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SHOW_DELETE_ACCOUNT_MODAL,
  HIDE_DELETE_ACCOUNT_MODAL,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_ERROR,
  EMAIL_FIELD,
} from '../constants';

describe('deleteAccount actions', () => {
  it('showDeleteAccountModal', () => {
    const expected = {
      type: SHOW_DELETE_ACCOUNT_MODAL,
    };

    expect(showDeleteAccountModal()).toEqual(expected);
  });

  it('hideDeleteAccountModal', () => {
    const expected = {
      type: HIDE_DELETE_ACCOUNT_MODAL,
    };

    expect(hideDeleteAccountModal()).toEqual(expected);
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

  it('deleteAccount', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];

    const expected = {
      type: DELETE_ACCOUNT,
      resetForm: args[2].reset,
      values: args[0].toJS(),
    };

    expect(deleteAccount(args)).toEqual(expected);
  });

  it('deleteAccountSuccess', () => {
    const expected = {
      type: DELETE_ACCOUNT_SUCCESS,
    };

    expect(deleteAccountSuccess()).toEqual(expected);
  });

  it('deleteAccountErr', () => {
    const deleteAccountError = 'deleteAccountError';
    const expected = {
      type: DELETE_ACCOUNT_ERROR,
      deleteAccountError,
    };

    expect(deleteAccountErr(deleteAccountError)).toEqual(expected);
  });
});
