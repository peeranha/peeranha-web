import { fromJS } from 'immutable';

import {
  checkEmail,
  checkEmailSuccess,
  checkEmailErr,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailErr,
  putKeysToState,
  signUpViaEmailComplete,
  signUpViaEmailCompleteSuccess,
  setReducerDefault,
} from '../actions';

import {
  EMAIL_CHECKING,
  EMAIL_CHECKING_SUCCESS,
  EMAIL_CHECKING_ERROR,
  EMAIL_VERIFICATION,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  SIGN_UP_VIA_EMAIL,
  SIGN_UP_VIA_EMAIL_SUCCESS,
  PUT_KEYS_TO_STATE,
  SET_REDUCER_DEFAULT,
  VERIFICATION_FIELD,
} from '../constants';

describe('SignUp actions', () => {
  it('checkEmail', () => {
    const email = 'email';
    const expected = {
      type: EMAIL_CHECKING,
      email,
    };

    expect(checkEmail(email)).toEqual(expected);
  });

  it('checkEmailSuccess', () => {
    const expected = {
      type: EMAIL_CHECKING_SUCCESS,
    };

    expect(checkEmailSuccess()).toEqual(expected);
  });

  it('checkEmailErr', () => {
    const emailCheckingError = 'emailCheckingError';
    const expected = {
      type: EMAIL_CHECKING_ERROR,
      emailCheckingError,
    };

    expect(checkEmailErr(emailCheckingError)).toEqual(expected);
  });

  it('verifyEmail', () => {
    const values = fromJS({
      [VERIFICATION_FIELD]: VERIFICATION_FIELD,
    });

    const expected = {
      type: EMAIL_VERIFICATION,
      verificationCode: values.get(VERIFICATION_FIELD),
    };

    expect(verifyEmail(values)).toEqual(expected);
  });

  it('verifyEmailSuccess', () => {
    const expected = {
      type: EMAIL_VERIFICATION_SUCCESS,
    };

    expect(verifyEmailSuccess()).toEqual(expected);
  });

  it('verifyEmailErr', () => {
    const verifyEmailError = 'verifyEmailError';

    const expected = {
      type: EMAIL_VERIFICATION_ERROR,
      verifyEmailError,
    };

    expect(verifyEmailErr(verifyEmailError)).toEqual(expected);
  });

  it('idontHaveEosAccount', () => {
    const val = fromJS({
      [VERIFICATION_FIELD]: VERIFICATION_FIELD,
    });

    const expected = {
      type: SIGN_UP_VIA_EMAIL,
      val: val.toJS(),
    };

    expect(signUpViaEmailComplete(val)).toEqual(expected);
  });

  it('idontHaveEosAccountSuccess', () => {
    const expected = {
      type: SIGN_UP_VIA_EMAIL_SUCCESS,
    };

    expect(signUpViaEmailCompleteSuccess()).toEqual(expected);
  });

  it('putKeysToState', () => {
    const keys = {};
    const expected = {
      type: PUT_KEYS_TO_STATE,
      keys,
    };

    expect(putKeysToState(keys)).toEqual(expected);
  });

  it('setReducerDefault', () => {
    const expected = {
      type: SET_REDUCER_DEFAULT,
    };

    expect(setReducerDefault()).toEqual(expected);
  });
});
