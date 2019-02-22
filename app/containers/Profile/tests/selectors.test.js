import { fromJS } from 'immutable';

import {
  selectProfileDomain,
  selectIsProfileLoading,
  selectIsImageLoading,
  selectErrorLoadProfile,
  selectUserKey,
  selectProfile,
} from '../selectors';

describe('selectProfileDomain', () => {
  const isProfileLoading = true;
  const isImageLoading = true;
  const errorLoadProfile = null;
  const userKey = 'user';
  const profile = {};

  const globalState = fromJS({
    isProfileLoading,
    isImageLoading,
    errorLoadProfile,
    userKey,
    profile,
  });

  const mockedState = fromJS({
    profile: globalState,
  });

  it('should select the global state', () => {
    expect(selectProfileDomain(mockedState)).toEqual(globalState);
  });

  it('selectIsProfileLoading', () => {
    const xIsProfileLoading = selectIsProfileLoading();
    expect(xIsProfileLoading(mockedState)).toEqual(isProfileLoading);
  });

  it('selectIsImageLoading', () => {
    const xIsImageLoading = selectIsImageLoading();
    expect(xIsImageLoading(mockedState)).toEqual(isImageLoading);
  });

  it('selectErrorLoadProfile', () => {
    const isErrorLoadProfile = selectErrorLoadProfile();
    expect(isErrorLoadProfile(mockedState)).toEqual(errorLoadProfile);
  });

  it('selectUserKey', () => {
    const isUserKey = selectUserKey();
    expect(isUserKey(mockedState)).toEqual(userKey);
  });

  it('selectProfile', () => {
    const isProfile = selectProfile();
    expect(isProfile(mockedState)).toEqual(profile);
  });
});
