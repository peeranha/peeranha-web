import { fromJS } from 'immutable';

import {
  selectDeleteAccountDomain,
  selectShowModal,
  selectDeleteAccountProcessing,
  selectDeleteAccountError,
  selectSendEmailProcessing,
  selectSendEmailError,
  selectEmail,
  selectContent,
} from '../selectors';

describe('selectDeleteAccountDomain', () => {
  const showModal = true;
  const deleteAccountProcessing = true;
  const deleteAccountError = 'error';
  const sendEmailProcessing = 'sendEmailProcessing';
  const sendEmailError = 'sendEmailError';
  const content = 'content';
  const email = 'email';

  const globalState = fromJS({
    showModal,
    deleteAccountProcessing,
    deleteAccountError,
    sendEmailProcessing,
    sendEmailError,
    content,
    email,
  });

  const mockedState = fromJS({
    deleteAccount: globalState,
  });

  it('should select the global state', () => {
    expect(selectDeleteAccountDomain(mockedState)).toEqual(globalState.toJS());
  });

  it('selectShowModal', () => {
    const isSelectShowModal = selectShowModal();
    expect(isSelectShowModal(mockedState)).toEqual(showModal);
  });

  it('selectDeleteAccountProcessing', () => {
    const isSelectDeleteAccountProcessing = selectDeleteAccountProcessing();
    expect(isSelectDeleteAccountProcessing(mockedState)).toEqual(
      deleteAccountProcessing,
    );
  });

  it('selectDeleteAccountError', () => {
    const isSelectDeleteAccountError = selectDeleteAccountError();
    expect(isSelectDeleteAccountError(mockedState)).toEqual(deleteAccountError);
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

  it('selectContent', () => {
    const isSelectContent = selectContent();
    expect(isSelectContent(mockedState)).toEqual(content);
  });

  it('selectEmail', () => {
    const isSelectEmail = selectEmail();
    expect(isSelectEmail(mockedState)).toEqual(email);
  });
});
