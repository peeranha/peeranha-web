import { fromJS } from 'immutable';

import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  EMAIL_FORM,
  LOGIN_WITH_WALLET,
  LOGIN_WITH_WALLET_SUCCESS,
  LOGIN_WITH_WALLET_ERROR,
  SIGN_IN_WITH_EMAIL,
  SIGN_IN_WITH_EMAIL_SUCCESS,
  SIGN_IN_WITH_EMAIL_ERROR,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  START_VERIFYING,
  HIDE_SIGN_IN_MODAL,
} from './constants';

export const initialState = fromJS({
  content: null,
  email: null,

  showSignInModal: false,
  signInWithEmailProcessing: false,
  signInWithEmailError: null,

  showSentCodeModal: false,

  showVerificationModal: false,
  verifyEmailProcessing: false,
  verificationError: null,

  loginWithWalletProcessing: false,
  isNewPostCreationAfterLogin: false,
  loginWithWalletError: null,

  onceSend: false,
});

function loginReducer(state = initialState, action) {
  const {
    type,
    loginWithWalletError,
    isNewPostCreationAfterLogin,
    signInWithEmailError,
    verificationError,
  } = action;
  switch (type) {
    case SHOW_LOGIN_MODAL:
      return state
        .set('showSignInModal', true)
        .set('content', EMAIL_FORM)
        .set('isNewPostCreationAfterLogin', isNewPostCreationAfterLogin);
    case HIDE_LOGIN_MODAL:
      return state.set('showSignInModal', false);
    case LOGIN_WITH_WALLET:
      return state
        .set('loginWithWalletProcessing', true)
        .set('isNewPostCreationAfterLogin', isNewPostCreationAfterLogin);
    case LOGIN_WITH_WALLET_SUCCESS:
      return state
        .set('loginWithWalletProcessing', false)
        .set('content', initialState.get('content'));
    case LOGIN_WITH_WALLET_ERROR:
      return state
        .set('loginWithWalletProcessing', false)
        .set('loginWithWalletError', loginWithWalletError);
    case SIGN_IN_WITH_EMAIL:
      if (state.get('onceSend')) {
        return state
          .set('signInWithEmailProcessing', true)
          .set('showVerificationModal', false)
          .set('showSentCodeModal', true);
      }
      return state
        .set('signInWithEmailProcessing', true)
        .set('showVerificationModal', false)
        .set('onceSend', true);

    case SIGN_IN_WITH_EMAIL_SUCCESS:
      return state.set('signInWithEmailProcessing', false).set('showSentCodeModal', true);
    case SIGN_IN_WITH_EMAIL_ERROR:
      return state
        .set('signInWithEmailProcessing', false)
        .set('signInWithEmailError', signInWithEmailError);

    case START_VERIFYING:
      return state.set('showSentCodeModal', false).set('showVerificationModal', true);

    case VERIFY_EMAIL:
      return state.set('verifyEmailProcessing', true);
    case VERIFY_EMAIL_SUCCESS:
      return state
        .set('verifyEmailProcessing', false)
        .set('showSignInModal', false)
        .set('showVerificationModal', false)
        .set('onceSend', false);
    case VERIFY_EMAIL_ERROR:
      return state.set('verifyEmailProcessing', false).set('verificationError', verificationError);
    case HIDE_SIGN_IN_MODAL:
      return state
        .set('showSignInModal', false)
        .set('showVerificationModal', false)
        .set('showSentCodeModal', false)
        .set('onceSend', false);
    default:
      return state;
  }
}

export default loginReducer;
