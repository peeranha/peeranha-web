/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  SHOW_EMAIL_PASSWORD_MODAL,
  EMAIL_PASSWORD_FORM,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_ERROR,
  LOGIN_WITH_SCATTER_SUCCESS,
  LOGIN_WITH_SCATTER_ERROR,
  FINISH_REGISTRATION,
  FINISH_REGISTRATION_SUCCESS,
  FINISH_REGISTRATION_ERROR,
  EMAIL_FORM,
} from './constants';

export const initialState = fromJS({
  content: null,
  showModal: false,
  email: null,
  loginProcessing: false,
  loginWithEmailError: null,
  eosAccount: null,
  loginWithScatterError: null,
  finishRegistrationProcessing: false,
  finishRegistrationWithDisplayNameError: null,
});

function loginReducer(state = initialState, action) {
  const {
    type,
    email,
    content,
    loginWithEmailError,
    eosAccount,
    loginWithScatterError,
    finishRegistrationWithDisplayNameError,
  } = action;

  switch (type) {
    case SHOW_LOGIN_MODAL:
      return state.set('showModal', true).set('content', EMAIL_FORM);
    case HIDE_LOGIN_MODAL:
      return state.set('showModal', false);

    case SHOW_EMAIL_PASSWORD_MODAL:
      return state.set('email', email).set('content', EMAIL_PASSWORD_FORM);

    case LOGIN_WITH_EMAIL:
      return state.set('loginProcessing', true);
    case LOGIN_WITH_EMAIL_SUCCESS:
      return state
        .set('loginProcessing', false)
        .set('eosAccount', eosAccount)
        .set('showModal', Boolean(content))
        .set('content', content || initialState.get('content'));
    case LOGIN_WITH_EMAIL_ERROR:
      return state
        .set('loginWithEmailError', loginWithEmailError)
        .set('loginProcessing', false);

    case LOGIN_WITH_SCATTER_SUCCESS:
      return state
        .set('showModal', initialState.get('showModal'))
        .set('content', initialState.get('content'));
    case LOGIN_WITH_SCATTER_ERROR:
      return state.set('loginWithScatterError', loginWithScatterError);

    case FINISH_REGISTRATION:
      return state.set('finishRegistrationProcessing', true);
    case FINISH_REGISTRATION_SUCCESS:
      return state
        .set('finishRegistrationProcessing', false)
        .set('showModal', initialState.get('showModal'))
        .set('content', initialState.get('content'));
    case FINISH_REGISTRATION_ERROR:
      return state
        .set(
          'finishRegistrationWithDisplayNameError',
          finishRegistrationWithDisplayNameError,
        )
        .set('finishRegistrationProcessing', false);

    default:
      return state;
  }
}

export default loginReducer;
