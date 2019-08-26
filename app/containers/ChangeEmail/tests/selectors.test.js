import { fromJS } from 'immutable';

import {
  selectChangeEmailDomain,
  selectShowModal,
  selectChangeEmailProcessing,
  selectChangeEmailError,
  selectContent,
  selectSendOldEmailProcessing,
  selectSendOldEmailError,
  selectConfirmOldEmailProcessing,
  selectConfirmOldEmailError,
  selectEmail,
  selectVerificationCode,
} from '../selectors';

describe('selectChangeEmailDomain', () => {
  const showModal = true;
  const content = 'content';
  const sendOldEmailProcessing = false;
  const sendOldEmailError = null;
  const confirmOldEmailProcessing = false;
  const confirmOldEmailError = null;
  const changeEmailProcessing = false;
  const changeEmailError = null;
  const email = 'email';
  const verificationCode = 'verificationCode';

  const globalState = fromJS({
    showModal,
    content,
    sendOldEmailProcessing,
    sendOldEmailError,
    confirmOldEmailProcessing,
    confirmOldEmailError,
    changeEmailProcessing,
    changeEmailError,
    email,
    verificationCode,
  });

  const mockedState = fromJS({
    changeEmail: globalState,
  });

  it('should select the global state', () => {
    expect(selectChangeEmailDomain(mockedState)).toEqual(globalState.toJS());
  });

  it('selectShowModal', () => {
    const isSelectShowModal = selectShowModal();
    expect(isSelectShowModal(mockedState)).toEqual(showModal);
  });

  it('selectShowModal', () => {
    const isSelectShowModal = selectShowModal();
    expect(isSelectShowModal(mockedState)).toEqual(showModal);
  });

  it('selectChangeEmailProcessing', () => {
    const isSelectChangeEmailProcessing = selectChangeEmailProcessing();
    expect(isSelectChangeEmailProcessing(mockedState)).toEqual(
      changeEmailProcessing,
    );
  });

  it('selectChangeEmailError', () => {
    const isSelectChangeEmailError = selectChangeEmailError();
    expect(isSelectChangeEmailError(mockedState)).toEqual(changeEmailError);
  });

  it('selectContent', () => {
    const isSelectContent = selectContent();
    expect(isSelectContent(mockedState)).toEqual(content);
  });

  it('selectSendOldEmailProcessing', () => {
    const isSelectSendOldEmailProcessing = selectSendOldEmailProcessing();
    expect(isSelectSendOldEmailProcessing(mockedState)).toEqual(
      sendOldEmailProcessing,
    );
  });

  it('selectSendOldEmailError', () => {
    const isSelectSendOldEmailError = selectSendOldEmailError();
    expect(isSelectSendOldEmailError(mockedState)).toEqual(sendOldEmailError);
  });

  it('selectConfirmOldEmailProcessing', () => {
    const isSelectConfirmOldEmailProcessing = selectConfirmOldEmailProcessing();
    expect(isSelectConfirmOldEmailProcessing(mockedState)).toEqual(
      confirmOldEmailProcessing,
    );
  });

  it('selectConfirmOldEmailError', () => {
    const isSelectConfirmOldEmailError = selectConfirmOldEmailError();
    expect(isSelectConfirmOldEmailError(mockedState)).toEqual(
      confirmOldEmailError,
    );
  });

  it('selectEmail', () => {
    const isSelectEmail = selectEmail();
    expect(isSelectEmail(mockedState)).toEqual(email);
  });

  it('selectVerificationCode', () => {
    const isSelectVerificationCode = selectVerificationCode();
    expect(isSelectVerificationCode(mockedState)).toEqual(verificationCode);
  });
});
