import { fromJS } from 'immutable';

import {
  showLoginModal,
  hideLoginModal,
  showEmailPasswordForm,
  loginWithEmail,
  loginWithEmailSuccess,
  loginWithEmailErr,
  finishRegistrationWithDisplayName,
  finishRegistrationWithDisplayNameSuccess,
  finishRegistrationWithDisplayNameErr,
} from '../actions';

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  EMAIL_FIELD,
  SHOW_EMAIL_PASSWORD_MODAL,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_ERROR,
  FINISH_REGISTRATION,
  FINISH_REGISTRATION_SUCCESS,
  FINISH_REGISTRATION_ERROR,
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

  it('showEmailPasswordForm', () => {
    const val = fromJS({
      [EMAIL_FIELD]: EMAIL_FIELD,
    });

    const expected = {
      type: SHOW_EMAIL_PASSWORD_MODAL,
      email: val.get(EMAIL_FIELD),
    };

    expect(showEmailPasswordForm(val)).toEqual(expected);
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
    const content = 'eosAccount';

    const expected = {
      type: LOGIN_WITH_EMAIL_SUCCESS,
      content,
    };

    expect(loginWithEmailSuccess(content)).toEqual(expected);
  });

  it('loginWithEmailErr', () => {
    const loginWithEmailError = 'loginWithEmailError';

    const expected = {
      type: LOGIN_WITH_EMAIL_ERROR,
      loginWithEmailError,
    };

    expect(loginWithEmailErr(loginWithEmailError)).toEqual(expected);
  });

  it('finishRegistrationWithDisplayName', () => {
    const val = fromJS({
      [EMAIL_FIELD]: EMAIL_FIELD,
    });

    const expected = {
      type: FINISH_REGISTRATION,
      val: val.toJS(),
    };

    expect(finishRegistrationWithDisplayName(val)).toEqual(expected);
  });

  it('finishRegistrationWithDisplayNameSuccess', () => {
    const expected = {
      type: FINISH_REGISTRATION_SUCCESS,
    };

    expect(finishRegistrationWithDisplayNameSuccess()).toEqual(expected);
  });

  it('finishRegistrationWithDisplayNameErr', () => {
    const finishRegistrationWithDisplayNameError = 'err';

    const expected = {
      type: FINISH_REGISTRATION_ERROR,
      finishRegistrationWithDisplayNameError,
    };

    expect(
      finishRegistrationWithDisplayNameErr(
        finishRegistrationWithDisplayNameError,
      ),
    ).toEqual(expected);
  });
});
