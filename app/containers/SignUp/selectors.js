import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signup state domain
 */

const selectSignUpDomain = state => state.get('signUp', initialState);

const selectEmail = () =>
  createSelector(selectSignUpDomain, subState => subState.get('email'));

const selectVerificationCode = () =>
  createSelector(selectSignUpDomain, subState =>
    subState.get('verificationCode'),
  );

const selectEmailChecking = () =>
  createSelector(selectSignUpDomain, subState => subState.get('emailChecking'));

const selectEmailCheckingError = () =>
  createSelector(selectSignUpDomain, subState =>
    subState.get('emailCheckingError'),
  );

const selectEmailVerificationProcessing = () =>
  createSelector(selectSignUpDomain, subState =>
    subState.get('emailVerificationProcessing'),
  );

const selectVerifyEmailError = () =>
  createSelector(selectSignUpDomain, subState =>
    subState.get('verifyEmailError'),
  );

const selectSignUpViaEmailProcessing = () =>
  createSelector(selectSignUpDomain, subState =>
    subState.get('signUpViaEmailProcessing'),
  );

const selectSignUpViaEmailError = () =>
  createSelector(selectSignUpDomain, subState =>
    subState.get('signUpViaEmailError'),
  );

const selectSignUpWithWalletProcessing = () =>
  createSelector(selectSignUpDomain, subState =>
    subState.get('signUpWithWalletProcessing'),
  );

const selectSignUpWithWalletError = () =>
  createSelector(selectSignUpDomain, subState =>
    subState.get('signUpWithWalletError'),
  );

const selectKeys = () =>
  createSelector(selectSignUpDomain, subState => subState.get('keys'));

const selectShowWalletSignUpProcessing = () =>
  createSelector(selectSignUpDomain, subState =>
    subState.get('showWalletSignUpProcessing'),
  );

const selectEthereumUserAddress = () =>
  createSelector(selectSignUpDomain, subState =>
    subState.get('ethereumUserAddress'),
  );

export {
  selectSignUpDomain,
  selectEmail,
  selectVerificationCode,
  selectEmailChecking,
  selectEmailCheckingError,
  selectEmailVerificationProcessing,
  selectVerifyEmailError,
  selectSignUpViaEmailProcessing,
  selectSignUpViaEmailError,
  selectKeys,
  selectSignUpWithWalletProcessing,
  selectSignUpWithWalletError,
  selectShowWalletSignUpProcessing,
  selectEthereumUserAddress,
};
