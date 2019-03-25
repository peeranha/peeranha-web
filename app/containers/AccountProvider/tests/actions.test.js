import {
  getCurrentAccount,
  getCurrentAccountSuccess,
  getCurrentAccountError,
  loginSignup,
  loginSignupSuccess,
  loginSignupErr,
  forgetIdentity,
  forgetIdentitySuccess,
  forgetIdentityErr,
  reloadApp,
} from '../actions';

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  LOGIN_SIGNUP,
  LOGIN_SIGNUP_SUCCESS,
  LOGIN_SIGNUP_ERROR,
  FORGET_IDENTITY,
  FORGET_IDENTITY_SUCCESS,
  FORGET_IDENTITY_ERROR,
  RELOAD_APP,
} from '../constants';

describe('getCurrentAccount actions', () => {
  it('has a type of GET_CURRENT_ACCOUNT', () => {
    const expected = {
      type: GET_CURRENT_ACCOUNT,
    };
    expect(getCurrentAccount()).toEqual(expected);
  });
  it('has a type of GET_CURRENT_ACCOUNT_SUCCESS', () => {
    const expected = {
      type: GET_CURRENT_ACCOUNT_SUCCESS,
      acc: {
        name: 'test',
      },
    };
    expect(getCurrentAccountSuccess({ name: 'test' })).toEqual(expected);
  });
  it('has a type of GET_CURRENT_ACCOUNT_ERROR', () => {
    const expected = {
      type: GET_CURRENT_ACCOUNT_ERROR,
      err: {
        message: 'error',
      },
    };
    expect(getCurrentAccountError({ message: 'error' })).toEqual(expected);
  });
});

describe('loginSignup actions', () => {
  it('has a type of LOGIN_SIGNUP', () => {
    const methods = true;
    const expected = {
      type: LOGIN_SIGNUP,
      methods,
    };
    expect(loginSignup(methods)).toEqual(expected);
  });

  it('has a type of LOGIN_SIGNUP_SUCCESS', () => {
    const profileInfo = false;
    const acc = 'user1';

    const expected = {
      type: LOGIN_SIGNUP_SUCCESS,
      profileInfo,
      acc,
    };
    expect(loginSignupSuccess(acc, profileInfo)).toEqual(expected);
  });

  it('has a type of LOGIN_SIGNUP_ERROR', () => {
    const loginSignupError = 'Error';
    const expected = {
      type: LOGIN_SIGNUP_ERROR,
      loginSignupError,
    };
    expect(loginSignupErr(loginSignupError)).toEqual(expected);
  });
});

describe('forgetIdentity actions', () => {
  it('has a type of FORGET_IDENTITY', () => {
    const expected = {
      type: FORGET_IDENTITY,
    };
    expect(forgetIdentity()).toEqual(expected);
  });

  it('has a type of FORGET_IDENTITY_SUCCESS', () => {
    const expected = {
      type: FORGET_IDENTITY_SUCCESS,
    };
    expect(forgetIdentitySuccess()).toEqual(expected);
  });

  it('has a type of FORGET_IDENTITY_ERROR', () => {
    const forgetIdentityError = 'Error';
    const expected = {
      type: FORGET_IDENTITY_ERROR,
      forgetIdentityError,
    };
    expect(forgetIdentityErr(forgetIdentityError)).toEqual(expected);
  });
});

describe('reloadApp actions', () => {
  it('has a type of RELOAD_APP', () => {
    window.location.reload = jest.fn();
    const expected = {
      type: RELOAD_APP,
    };
    expect(reloadApp()).toEqual(expected);
  });
});
