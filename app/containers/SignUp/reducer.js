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
  I_HAVE_EOS_ACCOUNT,
  I_HAVE_EOS_ACCOUNT_SUCCESS,
  I_HAVE_EOS_ACCOUNT_ERROR,
  I_HAVE_NOT_EOS_ACCOUNT,
  I_HAVE_NOT_EOS_ACCOUNT_SUCCESS,
  I_HAVE_NOT_EOS_ACCOUNT_ERROR,
  PUT_KEYS_TO_STATE,
  SIGNUP_WITH_SCATTER,
  SIGNUP_WITH_SCATTER_SUCCESS,
  SIGNUP_WITH_SCATTER_ERROR,
  SIGNUP_WITH_SCATTER_REFERRAL_ERROR,
  SHOW_SCATTER_SIGNUP_FORM,
  SHOW_SCATTER_SIGNUP_FORM_SUCCESS,
  SHOW_SCATTER_SIGNUP_FORM_ERROR,
} from './constants';

export const initialState = fromJS({
  verificationCode: null,
  encryptionKey: null,
  email: null,
  emailChecking: false,
  emailCheckingError: null,
  emailVerificationProcessing: false,
  verifyEmailError: null,
  iHaveEosAccountProcessing: false,
  iHaveEosAccountError: null,
  idontHaveEosAccountProcessing: false,
  idontHaveEosAccountError: null,
  signUpWithScatterProcessing: false,
  signUpWithScatterError: null,
  showScatterSignUpProcessing: false,
  showScatterSignUpFormError: null,
  keys: null,
  eosAccountName: null,
});

function signUpReducer(state = initialState, action) {
  const {
    type,
    email,
    emailCheckingError,
    verifyEmailError,
    iHaveEosAccountError,
    idontHaveEosAccountError,
    signUpWithScatterError,
    showScatterSignUpFormError,
    keys,
    verificationCode,
    encryptionKey,
    eosAccountName,
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
      return state
        .set('emailVerificationProcessing', false)
        .set('encryptionKey', encryptionKey);
    case EMAIL_VERIFICATION_ERROR:
      return state
        .set('verifyEmailError', verifyEmailError)
        .set('emailVerificationProcessing', false);

    case I_HAVE_EOS_ACCOUNT:
      return state.set('iHaveEosAccountProcessing', true);
    case I_HAVE_EOS_ACCOUNT_SUCCESS:
      return state.set('iHaveEosAccountProcessing', false);
    case I_HAVE_EOS_ACCOUNT_ERROR:
      return state
        .set('iHaveEosAccountError', iHaveEosAccountError)
        .set('iHaveEosAccountProcessing', false);

    case I_HAVE_NOT_EOS_ACCOUNT:
      return state.set('idontHaveEosAccountProcessing', true);
    case I_HAVE_NOT_EOS_ACCOUNT_SUCCESS:
      return state.set('idontHaveEosAccountProcessing', false);
    case I_HAVE_NOT_EOS_ACCOUNT_ERROR:
      return state
        .set('idontHaveEosAccountError', idontHaveEosAccountError)
        .set('idontHaveEosAccountProcessing', false);

    case SIGNUP_WITH_SCATTER:
      return state.set('signUpWithScatterProcessing', true);
    case SIGNUP_WITH_SCATTER_SUCCESS:
      return state.set('signUpWithScatterProcessing', false);
    case SIGNUP_WITH_SCATTER_ERROR:
      return state
        .set('signUpWithScatterError', signUpWithScatterError)
        .set('signUpWithScatterProcessing', false);
    case SIGNUP_WITH_SCATTER_REFERRAL_ERROR:
      return state.set('signUpWithScatterProcessing', false);

    case SHOW_SCATTER_SIGNUP_FORM:
      return state.set('showScatterSignUpProcessing', true);
    case SHOW_SCATTER_SIGNUP_FORM_SUCCESS:
      return state
        .set('showScatterSignUpProcessing', false)
        .set('eosAccountName', eosAccountName);
    case SHOW_SCATTER_SIGNUP_FORM_ERROR:
      return state
        .set('showScatterSignUpFormError', showScatterSignUpFormError)
        .set('showScatterSignUpProcessing', false);

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
