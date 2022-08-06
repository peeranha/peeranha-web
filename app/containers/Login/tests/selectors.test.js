import { fromJS } from 'immutable';

import {
  selectLoginDomain,
  makeSelectContent,
  makeSelectShowModal,
  makeSelectEmail,
  makeSelectEthereumAccount,
  makeSelectLoginWithEmailError,
} from '../selectors';

describe('selectLoginDomain', () => {
  const content = 'content';
  const showModal = 'showModal';
  const email = 'email';
  const loginProcessing = 'loginProcessing';
  const loginWithEmailError = 'loginWithEmailError';
  const ethereumAccount = 'ethereumAccount';
  const loginWithScatterError = 'loginWithScatterError';

  const globalState = fromJS({
    content,
    showModal,
    email,
    loginProcessing,
    loginWithEmailError,
    ethereumAccount,
    loginWithScatterError,
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

  it('makeSelectLoginWithEmailError', () => {
    const isLoginWithEmailError = makeSelectLoginWithEmailError();
    expect(isLoginWithEmailError(mockedState)).toEqual(loginWithEmailError);
  });

  it('makeSelectEthereumAccount', () => {
    const isEthereumAccount = makeSelectEthereumAccount();
    expect(isEthereumAccount(mockedState)).toEqual(ethereumAccount);
  });
});
