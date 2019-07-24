import { fromJS } from 'immutable';

import {
  selectLoginDomain,
  makeSelectContent,
  makeSelectShowModal,
  makeSelectEmail,
  makeSelectEosAccount,
  selectLoginWithScatterError,
  makeSelectLoginProcessing,
  makeSelectLoginWithEmailError,
  selectFinishRegistrationProcessing,
  selectFinishRegistrationError,
} from '../selectors';

describe('selectLoginDomain', () => {
  const content = 'content';
  const showModal = 'showModal';
  const email = 'email';
  const loginProcessing = 'loginProcessing';
  const loginWithEmailError = 'loginWithEmailError';
  const eosAccount = 'eosAccount';
  const loginWithScatterError = 'loginWithScatterError';
  const finishRegistrationProcessing = 'finishRegistrationProcessing';
  const finishRegistrationWithDisplayNameError =
    'finishRegistrationWithDisplayNameError';

  const globalState = fromJS({
    content,
    showModal,
    email,
    loginProcessing,
    loginWithEmailError,
    eosAccount,
    loginWithScatterError,
    finishRegistrationProcessing,
    finishRegistrationWithDisplayNameError,
  });

  const mockedState = fromJS({
    login: globalState,
  });

  it('should select the global state', () => {
    expect(selectLoginDomain(mockedState)).toEqual(globalState);
  });

  it('makeSelectContent', () => {
    const isContent = makeSelectContent();
    expect(isContent(mockedState)).toEqual(content);
  });

  it('makeSelectShowModal', () => {
    const isShowModal = makeSelectShowModal();
    expect(isShowModal(mockedState)).toEqual(showModal);
  });

  it('makeSelectEmail', () => {
    const isEmail = makeSelectEmail();
    expect(isEmail(mockedState)).toEqual(email);
  });

  it('loginProcessing', () => {
    const isLoginProcessing = makeSelectLoginProcessing();
    expect(isLoginProcessing(mockedState)).toEqual(loginProcessing);
  });

  it('makeSelectLoginWithEmailError', () => {
    const isLoginWithEmailError = makeSelectLoginWithEmailError();
    expect(isLoginWithEmailError(mockedState)).toEqual(loginWithEmailError);
  });

  it('makeSelectEosAccount', () => {
    const isEosAccount = makeSelectEosAccount();
    expect(isEosAccount(mockedState)).toEqual(eosAccount);
  });

  it('selectLoginWithScatterError', () => {
    const isLoginWithScatterError = selectLoginWithScatterError();
    expect(isLoginWithScatterError(mockedState)).toEqual(loginWithScatterError);
  });

  it('selectFinishRegistrationProcessing', () => {
    const isFinishRegistrationProcessing = selectFinishRegistrationProcessing();
    expect(isFinishRegistrationProcessing(mockedState)).toEqual(
      finishRegistrationProcessing,
    );
  });

  it('selectFinishRegistrationError', () => {
    const isFinishRegistrationError = selectFinishRegistrationError();
    expect(isFinishRegistrationError(mockedState)).toEqual(
      finishRegistrationWithDisplayNameError,
    );
  });
});
