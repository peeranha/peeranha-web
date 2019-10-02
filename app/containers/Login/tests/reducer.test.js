import { fromJS } from 'immutable';
import loginReducer, { initialState } from '../reducer';

import {
  showLoginModal,
  hideLoginModal,
  showEmailPasswordForm,
  loginWithEmail,
  loginWithEmailSuccess,
  loginWithEmailErr,
  loginWithScatterSuccess,
  loginWithScatterErr,
  finishRegistrationWithDisplayName,
  finishRegistrationWithDisplayNameSuccess,
  finishRegistrationWithDisplayNameErr,
} from '../actions';

import { EMAIL_FORM, EMAIL_PASSWORD_FORM, EMAIL_FIELD } from '../constants';

describe('loginReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(loginReducer(state, {})).toEqual(state);
  });

  it('SHOW_LOGIN_MODAL', () => {
    const objWithoutContent = state
      .set('showModal', true)
      .set('content', EMAIL_FORM);

    expect(loginReducer(state, showLoginModal())).toEqual(objWithoutContent);
  });

  it('HIDE_LOGIN_MODAL', () => {
    const obj = state.set('showModal', false);
    expect(loginReducer(state, hideLoginModal())).toEqual(obj);
  });

  it('SHOW_EMAIL_PASSWORD_MODAL', () => {
    const email = 'email';
    const val = fromJS({
      [EMAIL_FIELD]: email,
    });

    const obj = state.set('email', email).set('content', EMAIL_PASSWORD_FORM);

    expect(loginReducer(state, showEmailPasswordForm(val))).toEqual(obj);
  });

  it('LOGIN_WITH_EMAIL', () => {
    const val = fromJS({
      [EMAIL_FIELD]: EMAIL_FIELD,
    });

    const obj = state.set('loginProcessing', true);

    expect(loginReducer(state, loginWithEmail(val))).toEqual(obj);
  });

  it('LOGIN_WITH_EMAIL_SUCCESS', () => {
    const eosAccount = 'eosAccount';

    const obj = state
      .set('loginProcessing', false)
      .set('eosAccount', eosAccount)
      .set('showModal', initialState.get('showModal'))
      .set('content', initialState.get('content'));

    expect(loginReducer(state, loginWithEmailSuccess(eosAccount))).toEqual(obj);
  });

  it('LOGIN_WITH_EMAIL_ERROR', () => {
    const loginWithEmailError = 'loginWithEmailError';

    const obj = state
      .set('loginProcessing', false)
      .set('loginWithEmailError', loginWithEmailError);

    expect(loginReducer(state, loginWithEmailErr(loginWithEmailError))).toEqual(
      obj,
    );
  });

  it('LOGIN_WITH_SCATTER_SUCCESS', () => {
    const obj = state
      .set('showModal', initialState.get('showModal'))
      .set('content', initialState.get('content'));

    expect(loginReducer(state, loginWithScatterSuccess())).toEqual(obj);
  });

  it('LOGIN_WITH_SCATTER_ERROR', () => {
    const loginWithScatterError = 'loginWithScatterError';

    const obj = state.set('loginWithScatterError', loginWithScatterError);

    expect(
      loginReducer(state, loginWithScatterErr(loginWithScatterError)),
    ).toEqual(obj);
  });

  it('FINISH_REGISTRATION', () => {
    const val = fromJS({
      [EMAIL_FIELD]: EMAIL_FIELD,
    });

    const obj = state.set('finishRegistrationProcessing', true);

    expect(loginReducer(state, finishRegistrationWithDisplayName(val))).toEqual(
      obj,
    );
  });

  it('FINISH_REGISTRATION_SUCCESS', () => {
    const obj = state
      .set('finishRegistrationProcessing', false)
      .set('showModal', initialState.get('showModal'))
      .set('content', initialState.get('content'));

    expect(
      loginReducer(state, finishRegistrationWithDisplayNameSuccess()),
    ).toEqual(obj);
  });

  it('FINISH_REGISTRATION_ERROR', () => {
    const finishRegistrationWithDisplayNameError = 'err';

    const obj = state
      .set('finishRegistrationProcessing', false)
      .set(
        'finishRegistrationWithDisplayNameError',
        finishRegistrationWithDisplayNameError,
      );

    expect(
      loginReducer(
        state,
        finishRegistrationWithDisplayNameErr(
          finishRegistrationWithDisplayNameError,
        ),
      ),
    ).toEqual(obj);
  });
});
