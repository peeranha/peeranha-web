import { fromJS } from 'immutable';

import {
  selectShowOwnerKeyDomain,
  selectShowModal,
  selectShowOwnerKeyProcessing,
  selectShowOwnerKeyError,
  selectOwnerKey,
  selectSendEmailProcessing,
  selectSendEmailError,
  selectPassword,
  selectContent,
} from '../selectors';

describe('selectShowOwnerKeyDomain', () => {
  const showModal = true;
  const showOwnerKeyProcessing = true;
  const showOwnerKeyError = 'error';
  const ownerKey = 'ownerKey';
  const sendEmailProcessing = 'sendEmailProcessing';
  const sendEmailError = 'sendEmailError';
  const content = 'content';
  const password = 'password';

  const globalState = fromJS({
    showModal,
    showOwnerKeyProcessing,
    showOwnerKeyError,
    ownerKey,
    sendEmailProcessing,
    sendEmailError,
    content,
    password,
  });

  const mockedState = fromJS({
    showOwnerKey: globalState,
  });

  it('should select the global state', () => {
    expect(selectShowOwnerKeyDomain(mockedState)).toEqual(globalState.toJS());
  });

  it('selectShowModal', () => {
    const isSelectShowModal = selectShowModal();
    expect(isSelectShowModal(mockedState)).toEqual(showModal);
  });

  it('selectShowOwnerKeyProcessing', () => {
    const isSelectShowOwnerKeyProcessing = selectShowOwnerKeyProcessing();
    expect(isSelectShowOwnerKeyProcessing(mockedState)).toEqual(
      showOwnerKeyProcessing,
    );
  });

  it('selectShowOwnerKeyError', () => {
    const isSelectShowOwnerKeyError = selectShowOwnerKeyError();
    expect(isSelectShowOwnerKeyError(mockedState)).toEqual(showOwnerKeyError);
  });

  it('selectOwnerKey', () => {
    const isSelectOwnerKey = selectOwnerKey();
    expect(isSelectOwnerKey(mockedState)).toEqual(ownerKey);
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

  it('selectPassword', () => {
    const isSelectPassword = selectPassword();
    expect(isSelectPassword(mockedState)).toEqual(password);
  });
});
