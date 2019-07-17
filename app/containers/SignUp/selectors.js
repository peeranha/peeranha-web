import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signup state domain
 */

const selectSignUpDomain = state => state.get('signUp', initialState);

const selectEmail = () =>
  createSelector(selectSignUpDomain, substate => substate.get('email'));

const selectVerificationCode = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('verificationCode'),
  );

const selectEmailChecking = () =>
  createSelector(selectSignUpDomain, substate => substate.get('emailChecking'));

const selectEmailCheckingError = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('emailCheckingError'),
  );

const selectEmailVerificationProcessing = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('emailVerificationProcessing'),
  );

const selectVerifyEmailError = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('verifyEmailError'),
  );

const selectIHaveEosAccountProcessing = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('iHaveEosAccountProcessing'),
  );

const selectIHaveEosAccountError = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('iHaveEosAccountError'),
  );

const selectIHaveNotEosAccountProcessing = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('iHaveNotEosAccountProcessing'),
  );

const selectIHaveNotEosAccountError = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('iHaveNotEosAccountError'),
  );

const selectSignUpWithScatterProcessing = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('signUpWithScatterProcessing'),
  );

const selectSignUpWithScatterError = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('signUpWithScatterError'),
  );

const selectKeys = () =>
  createSelector(selectSignUpDomain, substate => substate.get('keys'));

const selectShowScatterSignUpProcessing = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('showScatterSignUpProcessing'),
  );

const selectShowScatterSignUpFormError = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('showScatterSignUpFormError'),
  );

const selectEncryptionKey = () =>
  createSelector(selectSignUpDomain, substate => substate.get('encryptionKey'));

export {
  selectSignUpDomain,
  selectEmail,
  selectVerificationCode,
  selectEmailChecking,
  selectEmailCheckingError,
  selectEmailVerificationProcessing,
  selectVerifyEmailError,
  selectIHaveEosAccountProcessing,
  selectIHaveEosAccountError,
  selectIHaveNotEosAccountProcessing,
  selectIHaveNotEosAccountError,
  selectKeys,
  selectSignUpWithScatterProcessing,
  selectSignUpWithScatterError,
  selectShowScatterSignUpProcessing,
  selectShowScatterSignUpFormError,
  selectEncryptionKey,
};
