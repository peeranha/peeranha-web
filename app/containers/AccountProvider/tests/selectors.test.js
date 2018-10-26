import { fromJS } from 'immutable';
import {
  selectAccountProviderDomain,
  makeSelectAccount,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserIsInSystem,
  makeSelectAccountError,
  makeSelectForgetIdentityError,
} from '../selectors';

describe('selectAccountProviderDomain', () => {
  const account = 'user2';
  const loading = true;
  const error = 'someError';
  const userIsInSystem = false;
  const selectAccountError = 'accError';
  const forgetIdentityError = 'idError';

  const globalState = fromJS({
    account,
    loading,
    error,
    userIsInSystem,
    selectAccountError,
    forgetIdentityError,
  });

  const mockedState = fromJS({
    accountProvider: globalState,
  });

  it('should select the global state', () => {
    expect(selectAccountProviderDomain(mockedState)).toEqual(globalState);
  });

  it('makeSelectAccount', () => {
    const acc = makeSelectAccount();
    expect(acc(mockedState)).toEqual(account);
  });

  it('makeSelectLoading', () => {
    const load = makeSelectLoading();
    expect(load(mockedState)).toEqual(loading);
  });

  it('makeSelectError', () => {
    const err = makeSelectError();
    expect(err(mockedState)).toEqual(error);
  });

  it('makeSelectUserIsInSystem', () => {
    const userInSystem = makeSelectUserIsInSystem();
    expect(userInSystem(mockedState)).toEqual(userIsInSystem);
  });

  it('makeSelectAccountError', () => {
    const accError = makeSelectAccountError();
    expect(accError(mockedState)).toEqual(selectAccountError);
  });

  it('makeSelectForgetIdentityError', () => {
    const forgetIdError = makeSelectForgetIdentityError();
    expect(forgetIdError(mockedState)).toEqual(forgetIdentityError);
  });
});
