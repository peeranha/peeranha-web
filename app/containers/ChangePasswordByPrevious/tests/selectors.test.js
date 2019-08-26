import { fromJS } from 'immutable';

import {
  selectChangePasswordByPreviousDomain,
  selectContent,
  selectShowModal,
  selectSendEmailProcessing,
  selectSendEmailError,
  selectSubmitEmailProcessing,
  selectSubmitEmailError,
  selectChangePasswordProcessing,
  selectChangePasswordError,
  selectEmail,
  selectVerificationCode,
} from '../selectors';

describe('selectChangePasswordByPreviousDomain', () => {
  const showModal = true;
  const content = 'content';
  const sendEmailProcessing = false;
  const sendEmailError = null;
  const submitEmailProcessing = false;
  const submitEmailError = null;
  const changePasswordProcessing = false;
  const changePasswordError = null;
  const email = 'email';
  const verificationCode = 'verificationCode';

  const globalState = fromJS({
    showModal,
    content,
    sendEmailProcessing,
    sendEmailError,
    submitEmailProcessing,
    submitEmailError,
    changePasswordProcessing,
    changePasswordError,
    email,
    verificationCode,
  });

  const mockedState = fromJS({
    changePasswordByPrevious: globalState,
  });

  it('should select the global state', () => {
    expect(selectChangePasswordByPreviousDomain(mockedState)).toEqual(
      globalState.toJS(),
    );
  });

  it('selectShowModal', () => {
    const isSelectShowModal = selectShowModal();
    expect(isSelectShowModal(mockedState)).toEqual(showModal);
  });

  it('selectChangePasswordProcessing', () => {
    const isSelectChangePasswordProcessing = selectChangePasswordProcessing();
    expect(isSelectChangePasswordProcessing(mockedState)).toEqual(
      changePasswordProcessing,
    );
  });

  it('selectChangePasswordError', () => {
    const isSelectChangePasswordError = selectChangePasswordError();
    expect(isSelectChangePasswordError(mockedState)).toEqual(
      changePasswordError,
    );
  });

  it('selectContent', () => {
    const isSelectContent = selectContent();
    expect(isSelectContent(mockedState)).toEqual(content);
  });

  it('selectSendEmailProcessing', () => {
    const isSelectSendEmailProcessing = selectSendEmailProcessing();
    expect(isSelectSendEmailProcessing(mockedState)).toEqual(
      sendEmailProcessing,
    );
  });

  it('selectSendEmailError', () => {
    const isSelectSendEmailError = selectSendEmailError();
    expect(isSelectSendEmailError(mockedState)).toEqual(sendEmailError);
  });

  it('selectSubmitEmailProcessing', () => {
    const isSelectSubmitEmailProcessing = selectSubmitEmailProcessing();
    expect(isSelectSubmitEmailProcessing(mockedState)).toEqual(
      submitEmailProcessing,
    );
  });

  it('selectSubmitEmailError', () => {
    const isSelectSubmitEmailError = selectSubmitEmailError();
    expect(isSelectSubmitEmailError(mockedState)).toEqual(submitEmailError);
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
