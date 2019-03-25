import { fromJS } from 'immutable';
import {
  selectSignUpDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectRegistered,
  makeSelectContent,
  makeSelectShowModal,
} from '../selectors';

describe('selectSignUpDomain', () => {
  const loading = true;
  const error = 'error';
  const registered = false;
  const content = 'content';
  const showModal = true;

  const globalState = fromJS({
    loading,
    error,
    registered,
    content,
    showModal,
  });

  const mockedState = fromJS({
    signUp: globalState,
  });

  it('should select the global state', () => {
    expect(selectSignUpDomain(mockedState)).toEqual(globalState);
  });

  it('makeSelectLoading', () => {
    const isLoading = makeSelectLoading();
    expect(isLoading(mockedState)).toEqual(loading);
  });

  it('makeSelectError', () => {
    const isError = makeSelectError();
    expect(isError(mockedState)).toEqual(error);
  });

  it('makeSelectRegistered', () => {
    const isRegistred = makeSelectRegistered();
    expect(isRegistred(mockedState)).toEqual(registered);
  });

  it('makeSelectContent', () => {
    const isContent = makeSelectContent();
    expect(isContent(mockedState)).toEqual(content);
  });

  it('makeSelectShowModal', () => {
    const IsShowModal = makeSelectShowModal();
    expect(IsShowModal(mockedState)).toEqual(showModal);
  });
});
