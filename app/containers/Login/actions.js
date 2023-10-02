import {
  SHOW_LOGIN_MODAL,
  LOGIN_WITH_WALLET,
  LOGIN_WITH_WALLET_SUCCESS,
  LOGIN_WITH_WALLET_ERROR,
  LOGIN_WITH_SUI,
  SIGN_IN_WITH_EMAIL,
  SIGN_IN_WITH_EMAIL_SUCCESS,
  SIGN_IN_WITH_EMAIL_ERROR,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  START_VERIFYING,
  HIDE_SIGN_IN_MODAL,
} from './constants';
export function showLoginModal(isNewPostCreationAfterLogin = false) {
  return {
    type: SHOW_LOGIN_MODAL,
    isNewPostCreationAfterLogin,
  };
}

export function hideSignInModal() {
  return {
    type: HIDE_SIGN_IN_MODAL,
  };
}
export function loginWithWallet({ t }, isNewPostCreationAfterLogin = false) {
  return {
    type: LOGIN_WITH_WALLET,
    t,
    isNewPostCreationAfterLogin,
  };
}

export function loginWithWalletSuccess() {
  return {
    type: LOGIN_WITH_WALLET_SUCCESS,
  };
}

export function loginWithWalletErr(loginWithWalletError) {
  return {
    type: LOGIN_WITH_WALLET_ERROR,
    loginWithWalletError,
  };
}

export function signInWithEmail(email) {
  return {
    type: SIGN_IN_WITH_EMAIL,
    email,
  };
}

export function signInWithEmailSuccess() {
  return {
    type: SIGN_IN_WITH_EMAIL_SUCCESS,
  };
}

export function signInWithEmailErr(signInWithEmailError) {
  return {
    type: SIGN_IN_WITH_EMAIL_ERROR,
    signInWithEmailError,
  };
}

export function startVerifying() {
  return {
    type: START_VERIFYING,
  };
}

export function verifyEmail(email, formValues, resolve, reject) {
  return {
    type: VERIFY_EMAIL,
    email,
    verificationCode: formValues.toJS().verificationCode,
    resolve,
    reject,
  };
}

export function verifyEmailSuccess() {
  return {
    type: VERIFY_EMAIL_SUCCESS,
  };
}

export function verifyEmailError(verificationError) {
  return {
    type: VERIFY_EMAIL_ERROR,
    verificationError,
  };
}

export function loginWithSui(address, isNewPostCreationAfterLogin = false) {
  return {
    type: LOGIN_WITH_SUI,
    address,
    isNewPostCreationAfterLogin,
  };
}
