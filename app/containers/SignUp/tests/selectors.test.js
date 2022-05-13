import {fromJS} from 'immutable';

import {
  selectSignUpDomain,
  selectEmail,
  selectVerificationCode,
  selectEmailChecking,
  selectEmailCheckingError,
  selectSignUpViaEmailProcessing,
  selectEmailVerificationProcessing,
  selectSignUpViaEmailError,
  selectVerifyEmailError,
  selectKeys,
} from '../selectors';

describe('selectSignUpDomain', () => {
  const email = 'email';
  const verificationCode = 'verificationCode';
  const emailChecking = 'emailChecking';
  const emailCheckingError = 'emailCheckingError';
  const verifyEmailError = 'verifyEmailError';
  const iHaveEosAccountProcessing = 'iHaveEosAccountProcessing';
  const iHaveEosAccountError = 'iHaveEosAccountError';
  const idontHaveEosAccountProcessing = 'idontHaveEosAccountProcessing';
  const idontHaveEosAccountError = 'idontHaveEosAccountError';
  const signUpWithScatterProcessing = 'signUpWithScatterProcessing';
  const signUpWithScatterError = 'signUpWithScatterError';
  const keys = 'keys';
  const showScatterSignUpProcessing = 'showScatterSignUpProcessing';
  const showScatterSignUpFormError = 'showScatterSignUpFormError';
  const encryptionKey = 'encryptionKey';
  const emailVerificationProcessing = 'emailVerificationProcessing';

  const globalState = fromJS({
    email,
    verificationCode,
    emailChecking,
    emailCheckingError,
    verifyEmailError,
    iHaveEosAccountProcessing,
    iHaveEosAccountError,
    idontHaveEosAccountProcessing,
    idontHaveEosAccountError,
    signUpWithScatterProcessing,
    signUpWithScatterError,
    keys,
    showScatterSignUpProcessing,
    showScatterSignUpFormError,
    encryptionKey,
    emailVerificationProcessing,
  });

  const mockedState = fromJS({
    signUp: globalState,
  });

  it('should select the global state', () => {
    expect(selectSignUpDomain(mockedState)).toEqual(globalState);
  });

  it('selectEmail', () => {
    const isEmail = selectEmail();
    expect(isEmail(mockedState)).toEqual(email);
  });

  it('selectVerificationCode', () => {
    const isVerificationCode = selectVerificationCode();
    expect(isVerificationCode(mockedState)).toEqual(verificationCode);
  });

  it('selectVerificationCode', () => {
    const isEmailChecking = selectEmailChecking();
    expect(isEmailChecking(mockedState)).toEqual(emailChecking);
  });

  it('selectEmailCheckingError', () => {
    const isEmailCheckingError = selectEmailCheckingError();
    expect(isEmailCheckingError(mockedState)).toEqual(emailCheckingError);
  });

  it('selectEmailVerificationProcessing', () => {
    const isEmailVerificationProcessing = selectEmailVerificationProcessing();
    expect(isEmailVerificationProcessing(mockedState)).toEqual(
      emailVerificationProcessing,
    );
  });

  it('selectVerifyEmailError', () => {
    const isVerifyEmailError = selectVerifyEmailError();
    expect(isVerifyEmailError(mockedState)).toEqual(verifyEmailError);
  });

  it('selectIdontHaveEosAccountProcessing', () => {
    const isIdontHaveEosAccountProcessing = selectSignUpViaEmailProcessing();
    expect(isIdontHaveEosAccountProcessing(mockedState)).toEqual(
      idontHaveEosAccountProcessing,
    );
  });

  it('selectIdontHaveEosAccountError', () => {
    const isIdontHaveEosAccountError = selectSignUpViaEmailError();
    expect(isIdontHaveEosAccountError(mockedState)).toEqual(
      idontHaveEosAccountError,
    );
  });

  it('selectKeys', () => {
    const isKeys = selectKeys();
    expect(isKeys(mockedState)).toEqual(keys);
  });
});
