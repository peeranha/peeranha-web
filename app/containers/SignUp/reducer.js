/*
 *
 * SignUp reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { registrationStage } from 'routes-config';

import {
  SET_REDUCER_DEFAULT,
  EMAIL_CHECKING,
  EMAIL_CHECKING_SUCCESS,
  EMAIL_CHECKING_ERROR,
  EMAIL_VERIFICATION,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  SIGN_UP_VIA_EMAIL,
  SIGN_UP_VIA_EMAIL_SUCCESS,
  SIGN_UP_VIA_EMAIL_ERROR,
  PUT_KEYS_TO_STATE,
  SIGNUP_WITH_WALLET,
  SIGNUP_WITH_WALLET_SUCCESS,
  SIGNUP_WITH_WALLET_ERROR,
  SIGNUP_WITH_WALLET_REFERRAL_ERROR,
  SHOW_WALLET_SIGNUP_FORM,
  SHOW_WALLET_SIGNUP_FORM_SUCCESS,
  SHOW_WALLET_SIGNUP_FORM_ERROR,
} from './constants';

export const initialState = fromJS({
  verificationCode: null,
  email: null,
  emailChecking: false,
  emailCheckingError: null,
  emailVerificationProcessing: false,
  verifyEmailError: null,
  signUpViaEmailProcessing: false,
  signUpViaEmailError: null,
  signUpWithWalletProcessing: false,
  signUpWithWalletError: null,
  showWalletSignUpProcessing: false,
  showWalletSignUpFormError: null,
  signUpWithWalletReferralError: null,
  keys: null,
});

function signUpReducer(state = initialState, action) {
  const {
    type,
    email,
    emailCheckingError,
    verifyEmailError,
    signUpViaEmailError,
    signUpWithWalletError,
    showWalletSignUpFormError,
    signUpWithWalletReferralError,
    keys,
    verificationCode,
    ethereumUserAddress,
  } = action;

  switch (type) {
    case EMAIL_CHECKING:
      return state.set('email', email).set('emailChecking', true);
    case EMAIL_CHECKING_SUCCESS:
      return state.set('emailChecking', false);
    case EMAIL_CHECKING_ERROR:
      return state
        .set('emailCheckingError', emailCheckingError)
        .set('emailChecking', false);

    case EMAIL_VERIFICATION:
      return state
        .set('emailVerificationProcessing', true)
        .set('verificationCode', verificationCode);
    case EMAIL_VERIFICATION_SUCCESS:
      return state.set('emailVerificationProcessing', false);
    case EMAIL_VERIFICATION_ERROR:
      return state
        .set('verifyEmailError', verifyEmailError)
        .set('emailVerificationProcessing', false);

    case SIGN_UP_VIA_EMAIL:
      return state.set('signUpViaEmailProcessing', true);
    case SIGN_UP_VIA_EMAIL_SUCCESS:
      return state.set('signUpViaEmailProcessing', false);
    case SIGN_UP_VIA_EMAIL_ERROR:
      return state
        .set('signUpViaEmailError', signUpViaEmailError)
        .set('signUpViaEmailProcessing', false);

    case SIGNUP_WITH_WALLET:
      return state.set('signUpWithWalletProcessing', true);
    case SIGNUP_WITH_WALLET_SUCCESS:
      return state.set('signUpWithWalletProcessing', false);
    case SIGNUP_WITH_WALLET_ERROR:
      return state
        .set('signUpWithWalletError', signUpWithWalletError)
        .set('signUpWithWalletProcessing', false);
    case SIGNUP_WITH_WALLET_REFERRAL_ERROR:
      return state
        .set('signUpWithWalletProcessing', false)
        .set('signUpWithWalletReferralError', signUpWithWalletReferralError);

    case SHOW_WALLET_SIGNUP_FORM:
      return state.set('showWalletSignUpProcessing', true);
    case SHOW_WALLET_SIGNUP_FORM_SUCCESS:
      return state
        .set('showWalletSignUpProcessing', false)
        .set('ethereumUserAddress', ethereumUserAddress);
    case SHOW_WALLET_SIGNUP_FORM_ERROR:
      return state
        .set('showWalletSignUpFormError', showWalletSignUpFormError)
        .set('showWalletSignUpProcessing', false);

    case PUT_KEYS_TO_STATE:
      return state.set(
        'keys',
        state.get('keys') ? { ...state.get('keys'), ...keys } : keys,
      );

    case LOCATION_CHANGE:
      if (!window.location.pathname.match(registrationStage)) {
        return state.set('keys', initialState.get('keys'));
      }

      return state;

    case SET_REDUCER_DEFAULT:
      return initialState;

    default:
      return state;
  }
}

export default signUpReducer;
