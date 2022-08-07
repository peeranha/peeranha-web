/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  LOGIN_WITH_WALLET,
  LOGIN_WITH_WALLET_SUCCESS,
  LOGIN_WITH_WALLET_ERROR,
} from './constants';

export const initialState = fromJS({
  content: null,
  showModal: false,
  email: null,
  ethereumAccount: null,
  loginWithWalletProcessing: false,
  isNewPostCreationAfterLogin: false,
  loginWithWalletError: null,
});

function loginReducer(state = initialState, action) {
  const { type, loginWithWalletError, isNewPostCreationAfterLogin } = action;

  switch (type) {
    case SHOW_LOGIN_MODAL:
      return state.set('showModal', true).set('content', EMAIL_FORM);
    case HIDE_LOGIN_MODAL:
      return state.set('showModal', false);

    case LOGIN_WITH_WALLET:
      return state
        .set('loginWithWalletProcessing', true)
        .set('isNewPostCreationAfterLogin', isNewPostCreationAfterLogin);
    case LOGIN_WITH_WALLET_SUCCESS:
      return state
        .set('loginWithWalletProcessing', false)
        .set('showModal', initialState.get('showModal'))
        .set('content', initialState.get('content'));
    case LOGIN_WITH_WALLET_ERROR:
      return state
        .set('loginWithWalletProcessing', false)
        .set('loginWithWalletError', loginWithWalletError);

    default:
      return state;
  }
}

export default loginReducer;
