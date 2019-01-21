import { fromJS } from 'immutable';
import {
  selectAccountProviderDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAccount,
  makeSelectProfileInfo,
  selectLoginSignupError,
  makeSelectForgetIdentityError,
} from '../selectors';

describe('selectAccountProviderDomain', () => {
  const loading = 'loading';
  const error = 'error';
  const account = 'account';
  const profileInfo = fromJS({});
  const loginSignupError = 'loginSignupError';
  const forgetIdentityError = 'forgetIdentityError';

  const globalState = fromJS({
    loading,
    error,
    account,
    profileInfo,
    loginSignupError,
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

  it('makeSelectProfileInfo', () => {
    const isProfileInfo = makeSelectProfileInfo();
    expect(isProfileInfo(mockedState)).toEqual(profileInfo);
  });

  it('selectLoginSignupError', () => {
    const isSelectLoginSignupError = selectLoginSignupError();
    expect(isSelectLoginSignupError(mockedState)).toEqual(loginSignupError);
  });

  it('makeSelectForgetIdentityError', () => {
    const forgetIdError = makeSelectForgetIdentityError();
    expect(forgetIdError(mockedState)).toEqual(forgetIdentityError);
  });
});
