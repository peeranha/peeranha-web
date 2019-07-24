import { fromJS } from 'immutable';

import {
  checkEmail,
  checkEmailSuccess,
  checkEmailErr,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailErr,
  signUpWithScatter,
  signUpWithScatterSuccess,
  signUpWithScatterErr,
  showScatterSignUpForm,
  showScatterSignUpFormSuccess,
  showScatterSignUpFormErr,
  putKeysToState,
  iHaveEosAccount,
  iHaveEosAccountSuccess,
  iHaveEosAccountErr,
  iHaveNotEosAccount,
  iHaveNotEosAccountSuccess,
  iHaveNotEosAccountErr,
  setReducerDefault,
} from '../actions';

import {
  EMAIL_CHECKING,
  EMAIL_CHECKING_SUCCESS,
  EMAIL_CHECKING_ERROR,
  EMAIL_VERIFICATION,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  I_HAVE_EOS_ACCOUNT_SUCCESS,
  I_HAVE_EOS_ACCOUNT_ERROR,
  I_HAVE_NOT_EOS_ACCOUNT,
  I_HAVE_NOT_EOS_ACCOUNT_SUCCESS,
  I_HAVE_NOT_EOS_ACCOUNT_ERROR,
  SIGNUP_WITH_SCATTER,
  SIGNUP_WITH_SCATTER_SUCCESS,
  SIGNUP_WITH_SCATTER_ERROR,
  SHOW_SCATTER_SIGNUP_FORM,
  SHOW_SCATTER_SIGNUP_FORM_SUCCESS,
  SHOW_SCATTER_SIGNUP_FORM_ERROR,
  PUT_KEYS_TO_STATE,
  SET_REDUCER_DEFAULT,
  VERIFICATION_FIELD,
  I_HAVE_EOS_ACCOUNT,
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
    const encryptionKey = 'encryptionKey';

    const expected = {
      type: EMAIL_VERIFICATION_SUCCESS,
      encryptionKey,
    };

    expect(verifyEmailSuccess(encryptionKey)).toEqual(expected);
  });

  it('verifyEmailErr', () => {
    const verifyEmailError = 'verifyEmailError';

    const expected = {
      type: EMAIL_VERIFICATION_ERROR,
      verifyEmailError,
    };

    expect(verifyEmailErr(verifyEmailError)).toEqual(expected);
  });

  it('iHaveEosAccount', () => {
    const val = fromJS({
      [VERIFICATION_FIELD]: VERIFICATION_FIELD,
    });

    const expected = {
      type: I_HAVE_EOS_ACCOUNT,
      val: val.toJS(),
    };

    expect(iHaveEosAccount(val)).toEqual(expected);
  });

  it('iHaveEosAccountSuccess', () => {
    const expected = {
      type: I_HAVE_EOS_ACCOUNT_SUCCESS,
    };

    expect(iHaveEosAccountSuccess()).toEqual(expected);
  });

  it('iHaveEosAccountErr', () => {
    const iHaveEosAccountError = 'iHaveEosAccountError';
    const expected = {
      type: I_HAVE_EOS_ACCOUNT_ERROR,
      iHaveEosAccountError,
    };

    expect(iHaveEosAccountErr(iHaveEosAccountError)).toEqual(expected);
  });

  it('iHaveNotEosAccount', () => {
    const val = fromJS({
      [VERIFICATION_FIELD]: VERIFICATION_FIELD,
    });

    const expected = {
      type: I_HAVE_NOT_EOS_ACCOUNT,
      val: val.toJS(),
    };

    expect(iHaveNotEosAccount(val)).toEqual(expected);
  });

  it('iHaveNotEosAccountSuccess', () => {
    const expected = {
      type: I_HAVE_NOT_EOS_ACCOUNT_SUCCESS,
    };

    expect(iHaveNotEosAccountSuccess()).toEqual(expected);
  });

  it('iHaveNotEosAccountErr', () => {
    const iHaveNotEosAccountError = 'iHaveNotEosAccountError';
    const expected = {
      type: I_HAVE_NOT_EOS_ACCOUNT_ERROR,
      iHaveNotEosAccountError,
    };

    expect(iHaveNotEosAccountErr(iHaveNotEosAccountError)).toEqual(expected);
  });

  it('signUpWithScatter', () => {
    const val = fromJS({
      [VERIFICATION_FIELD]: VERIFICATION_FIELD,
    });

    const expected = {
      type: SIGNUP_WITH_SCATTER,
      val: val.toJS(),
    };

    expect(signUpWithScatter(val)).toEqual(expected);
  });

  it('signUpWithScatterSuccess', () => {
    const expected = {
      type: SIGNUP_WITH_SCATTER_SUCCESS,
    };

    expect(signUpWithScatterSuccess()).toEqual(expected);
  });

  it('signUpWithScatterErr', () => {
    const signUpWithScatterError = 'signUpWithScatterError';
    const expected = {
      type: SIGNUP_WITH_SCATTER_ERROR,
      signUpWithScatterError,
    };

    expect(signUpWithScatterErr(signUpWithScatterError)).toEqual(expected);
  });

  it('showScatterSignUpForm', () => {
    const expected = {
      type: SHOW_SCATTER_SIGNUP_FORM,
    };

    expect(showScatterSignUpForm()).toEqual(expected);
  });

  it('showScatterSignUpFormSuccess', () => {
    const expected = {
      type: SHOW_SCATTER_SIGNUP_FORM_SUCCESS,
    };

    expect(showScatterSignUpFormSuccess()).toEqual(expected);
  });

  it('showScatterSignUpFormErr', () => {
    const showScatterSignUpFormError = 'showScatterSignUpFormError';
    const expected = {
      type: SHOW_SCATTER_SIGNUP_FORM_ERROR,
      showScatterSignUpFormError,
    };

    expect(showScatterSignUpFormErr(showScatterSignUpFormError)).toEqual(
      expected,
    );
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
