import { fromJS } from 'immutable';

import {
  showOwnerKeyModal,
  hideOwnerKeyModal,
  showOwnerKey,
  showOwnerKeySuccess,
  showOwnerKeyErr,
  sendEmail,
  sendEmailSuccess,
  sendEmailErr,
  removeOwnerKey,
} from '../actions';

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SHOW_OWNER_KEY_MODAL,
  HIDE_OWNER_KEY_MODAL,
  SHOW_OWNER_KEY,
  SHOW_OWNER_KEY_SUCCESS,
  SHOW_OWNER_KEY_ERROR,
  CODE_FIELD,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  REMOVE_OWNER_KEY,
} from '../constants';

describe('showOwnerKey actions', () => {
  it('removeOwnerKey', () => {
    const expected = {
      type: REMOVE_OWNER_KEY,
    };

    expect(removeOwnerKey()).toEqual(expected);
  });

  it('showOwnerKeyModal', () => {
    const expected = {
      type: SHOW_OWNER_KEY_MODAL,
    };

    expect(showOwnerKeyModal()).toEqual(expected);
  });

  it('hideOwnerKeyModal', () => {
    const expected = {
      type: HIDE_OWNER_KEY_MODAL,
    };

    expect(hideOwnerKeyModal()).toEqual(expected);
  });

  it('sendEmail', () => {
    const email = 'email';
    const password = 'password';

    const args = [
      fromJS({ [EMAIL_FIELD]: email, [PASSWORD_FIELD]: password }),
      () => null,
      { reset: jest.fn() },
    ];

    const expected = {
      type: SEND_EMAIL,
      resetForm: args[2].reset,
      password,
      email,
    };

    expect(sendEmail(...args)).toEqual(expected);
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

  it('showOwnerKey', () => {
    const verificationCode = '1234';
    const args = [
      fromJS({ [CODE_FIELD]: verificationCode }),
      () => null,
      { reset: jest.fn() },
    ];

    const expected = {
      type: SHOW_OWNER_KEY,
      resetForm: args[2].reset,
      verificationCode,
    };

    expect(showOwnerKey(...args)).toEqual(expected);
  });

  it('showOwnerKeySuccess', () => {
    const ownerKey = 'ownerKey';
    const expected = {
      type: SHOW_OWNER_KEY_SUCCESS,
      ownerKey,
    };

    expect(showOwnerKeySuccess(ownerKey)).toEqual(expected);
  });

  it('showOwnerKeyErr', () => {
    const showOwnerKeyError = 'showOwnerKeyError';
    const expected = {
      type: SHOW_OWNER_KEY_ERROR,
      showOwnerKeyError,
    };

    expect(showOwnerKeyErr(showOwnerKeyError)).toEqual(expected);
  });
});
