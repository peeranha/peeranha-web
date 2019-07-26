import { fromJS } from 'immutable';

import {
  selectForgotPasswordDomain,
  selectContent,
  selectShowModal,
  selectVerificationCodeLoading,
  selectVerificationCodeError,
  selectVerifyEmailLoading,
  selectVerifyEmailError,
  selectChangePasswordLoading,
  selectChangePasswordError,
  selectEmail,
  selectVerificationCode,
} from '../selectors';

describe('selectForgotPasswordDomain', () => {
  const content = 'content';
  const showModal = 'showModal';
  const getVerificationCodeLoading = 'getVerificationCodeLoading';
  const getVerificationCodeError = 'getVerificationCodeError';
  const verifyEmailLoading = 'verifyEmailLoading';
  const verifyEmailError = 'verifyEmailError';
  const changePasswordLoading = 'changePasswordLoading';
  const changePasswordError = 'changePasswordError';
  const email = 'email';
  const verificationCode = 'verificationCode';

  const globalState = fromJS({
    content,
    showModal,
    getVerificationCodeLoading,
    getVerificationCodeError,
    verifyEmailLoading,
    verifyEmailError,
    changePasswordLoading,
    changePasswordError,
    email,
    verificationCode,
  });

  const mockedState = fromJS({
    forgotPassword: globalState,
  });

  it('should select the global state', () => {
    expect(selectForgotPasswordDomain(mockedState)).toEqual(globalState.toJS());
  });

  it('selectContent', () => {
    const isContent = selectContent();
    expect(isContent(mockedState)).toEqual(content);
  });

  it('selectShowModal', () => {
    const isShowModal = selectShowModal();
    expect(isShowModal(mockedState)).toEqual(showModal);
  });

  it('selectVerificationCodeLoading', () => {
    const isVerificationCodeLoading = selectVerificationCodeLoading();
    expect(isVerificationCodeLoading(mockedState)).toEqual(
      getVerificationCodeLoading,
    );
  });

  it('selectVerificationCodeError', () => {
    const isVerificationCodeError = selectVerificationCodeError();
    expect(isVerificationCodeError(mockedState)).toEqual(
      getVerificationCodeError,
    );
  });

  it('selectVerifyEmailLoading', () => {
    const isVerifyEmailLoading = selectVerifyEmailLoading();
    expect(isVerifyEmailLoading(mockedState)).toEqual(verifyEmailLoading);
  });

  it('selectVerifyEmailError', () => {
    const isVerifyEmailError = selectVerifyEmailError();
    expect(isVerifyEmailError(mockedState)).toEqual(verifyEmailError);
  });

  it('selectChangePasswordLoading', () => {
    const isChangePasswordLoading = selectChangePasswordLoading();
    expect(isChangePasswordLoading(mockedState)).toEqual(changePasswordLoading);
  });

  it('selectChangePasswordError', () => {
    const isChangePasswordError = selectChangePasswordError();
    expect(isChangePasswordError(mockedState)).toEqual(changePasswordError);
  });

  it('selectEmail', () => {
    const isEmail = selectEmail();
    expect(isEmail(mockedState)).toEqual(email);
  });

  it('selectVerificationCode', () => {
    const isVerificationCode = selectVerificationCode();
    expect(isVerificationCode(mockedState)).toEqual(verificationCode);
  });
});
