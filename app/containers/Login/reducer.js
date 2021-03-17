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
  FINISH_REGISTRATION,
  FINISH_REGISTRATION_SUCCESS,
  FINISH_REGISTRATION_ERROR,
  EMAIL_FORM,
  FINISH_REGISTRATION_REFERRAL_ERROR,
  LOGIN_WITH_WALLET,
  LOGIN_WITH_WALLET_SUCCESS,
  LOGIN_WITH_WALLET_ERROR,
  FACEBOOK_LOGIN_PROCESSING,
  SET_FACEBOOK_USER_DATA,
  FACEBOOK_ERROR,
} from './constants';

export const initialState = fromJS({
  content: null,
  showModal: false,
  email: null,
  loginWithEmailProcessing: false,
  loginWithEmailError: null,
  eosAccount: null,
  loginWithWalletProcessing: false,
  loginWithWalletError: null,
  finishRegistrationProcessing: false,
  facebookLoginProcessing: false,
  facebookError: null,
  facebookUserData: {},
  finishRegistrationWithDisplayNameError: null,
});

function loginReducer(state = initialState, action) {
  const {
    type,
    email,
    content,
    loginWithEmailError,
    eosAccount,
    facebookError,
    loginWithWalletError,
    facebookUserData,
    facebookLoginProcessing,
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
      return state.set('loginWithEmailProcessing', true);
    case LOGIN_WITH_EMAIL_SUCCESS:
      return state
        .set('loginWithEmailProcessing', false)
        .set('eosAccount', eosAccount)
        .set('showModal', Boolean(content))
        .set('content', content || initialState.get('content'));
    case LOGIN_WITH_EMAIL_ERROR:
      return state
        .set('loginWithEmailError', loginWithEmailError)
        .set('loginWithEmailProcessing', false);

    case LOGIN_WITH_WALLET:
      return state.set('loginWithWalletProcessing', true);
    case LOGIN_WITH_WALLET_SUCCESS:
      return state
        .set('loginWithWalletProcessing', false)
        .set('showModal', initialState.get('showModal'))
        .set('content', initialState.get('content'));
    case LOGIN_WITH_WALLET_ERROR:
      return state
        .set('loginWithWalletProcessing', false)
        .set('loginWithWalletError', loginWithWalletError);

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
    case FINISH_REGISTRATION_REFERRAL_ERROR:
      return state.set('finishRegistrationProcessing', false);

    case FACEBOOK_LOGIN_PROCESSING:
      return state.set('facebookLoginProcessing', facebookLoginProcessing);
    case SET_FACEBOOK_USER_DATA:
      return state.set('facebookUserData', facebookUserData);
    case FACEBOOK_ERROR:
      return state.set('facebookError', facebookError);

    default:
      return state;
  }
}

export default loginReducer;
