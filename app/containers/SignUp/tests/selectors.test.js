import { fromJS } from 'immutable';

import {
  selectSignUpDomain,
  selectEmail,
  selectVerificationCode,
  selectEmailChecking,
  selectEmailCheckingError,
  selectIdontHaveEosAccountProcessing,
  selectIHaveEosAccountError,
  selectIHaveEosAccountProcessing,
  selectEmailVerificationProcessing,
  selectIdontHaveEosAccountError,
  selectSignUpWithScatterProcessing,
  selectSignUpWithScatterError,
  selectVerifyEmailError,
  selectShowScatterSignUpProcessing,
  selectKeys,
  selectShowScatterSignUpFormError,
  selectEncryptionKey,
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

  it('selectIHaveEosAccountProcessing', () => {
    const isIHaveEosAccountProcessing = selectIHaveEosAccountProcessing();
    expect(isIHaveEosAccountProcessing(mockedState)).toEqual(
      iHaveEosAccountProcessing,
    );
  });

  it('selectIHaveEosAccountError', () => {
    const isIHaveEosAccountError = selectIHaveEosAccountError();
    expect(isIHaveEosAccountError(mockedState)).toEqual(iHaveEosAccountError);
  });

  it('selectIdontHaveEosAccountProcessing', () => {
    const isIdontHaveEosAccountProcessing = selectIdontHaveEosAccountProcessing();
    expect(isIdontHaveEosAccountProcessing(mockedState)).toEqual(
      idontHaveEosAccountProcessing,
    );
  });

  it('selectIdontHaveEosAccountError', () => {
    const isIdontHaveEosAccountError = selectIdontHaveEosAccountError();
    expect(isIdontHaveEosAccountError(mockedState)).toEqual(
      idontHaveEosAccountError,
    );
  });

  it('selectSignUpWithScatterProcessing', () => {
    const isSignUpWithScatterProcessing = selectSignUpWithScatterProcessing();
    expect(isSignUpWithScatterProcessing(mockedState)).toEqual(
      signUpWithScatterProcessing,
    );
  });

  it('selectSignUpWithScatterError', () => {
    const isSignUpWithScatterError = selectSignUpWithScatterError();
    expect(isSignUpWithScatterError(mockedState)).toEqual(
      signUpWithScatterError,
    );
  });

  it('selectKeys', () => {
    const isKeys = selectKeys();
    expect(isKeys(mockedState)).toEqual(keys);
  });

  it('selectShowScatterSignUpProcessing', () => {
    const isShowScatterSignUpProcessing = selectShowScatterSignUpProcessing();
    expect(isShowScatterSignUpProcessing(mockedState)).toEqual(
      showScatterSignUpProcessing,
    );
  });

  it('selectShowScatterSignUpFormError', () => {
    const isShowScatterSignUpFormError = selectShowScatterSignUpFormError();
    expect(isShowScatterSignUpFormError(mockedState)).toEqual(
      showScatterSignUpFormError,
    );
  });

  it('selectEncryptionKey', () => {
    const isEncryptionKey = selectEncryptionKey();
    expect(isEncryptionKey(mockedState)).toEqual(encryptionKey);
  });
});
