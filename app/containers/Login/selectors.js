import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectLoginDomain = (state) => state.get('login', initialState);

export const makeSelectContent = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('content'));

export const makeSelectShowSignInModal = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('showSignInModal'));

export const makeSelectSentCodeModal = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('showSentCodeModal'));

export const makeSelectShowVerificationModal = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('showVerificationModal'));

export const makeSelectVerifyEmailError = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('verificationError'));

export const makeSelectVerifyEmailProcessing = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('verifyEmailProcessing'));

export const makeSelectEmail = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('email'));

export const selectLoginWithWalletProcessing = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('loginWithWalletProcessing'));

export const selectLoginWithWalletError = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('loginWithWalletError'));

export const selectIsNewPostCreationAfterLogin = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('isNewPostCreationAfterLogin'));

export const selectSignInWithEmailSuccess = () =>
  createSelector(selectLoginDomain, (substate) => substate.get('loginWithWalletError'));
