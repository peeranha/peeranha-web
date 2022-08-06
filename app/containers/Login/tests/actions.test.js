import { fromJS } from 'immutable';

import {
  showLoginModal,
  hideLoginModal,
  loginWithEmail,
  loginWithEmailSuccess,
  loginWithEmailErr,
} from '../actions';

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  EMAIL_FIELD,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_ERROR,
} from '../constants';

describe('Login actions', () => {
  it('showLoginModal', () => {
    const expectedWithoutContent = {
      type: SHOW_LOGIN_MODAL,
    };

    expect(showLoginModal()).toEqual(expectedWithoutContent);
  });

  it('hideLoginModal', () => {
    const expected = {
      type: HIDE_LOGIN_MODAL,
    };

    expect(hideLoginModal()).toEqual(expected);
  });

  it('loginWithEmail', () => {
    const val = fromJS({
      [EMAIL_FIELD]: EMAIL_FIELD,
    });

    const expected = {
      type: LOGIN_WITH_EMAIL,
      val: val.toJS(),
    };

    expect(loginWithEmail(val)).toEqual(expected);
  });

  it('loginWithEmailSuccess', () => {
    const eosAccount = 'eosAccount';
    const content = 'content';

    const expected = {
      type: LOGIN_WITH_EMAIL_SUCCESS,
      eosAccount,
      content,
    };

    expect(loginWithEmailSuccess(eosAccount, content)).toEqual(expected);
  });

  it('loginWithEmailErr', () => {
    const loginWithEmailError = 'loginWithEmailError';

    const expected = {
      type: LOGIN_WITH_EMAIL_ERROR,
      loginWithEmailError,
    };

    expect(loginWithEmailErr(loginWithEmailError)).toEqual(expected);
  });
});
