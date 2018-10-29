import { fromJS } from 'immutable';
import {
  selectProfileDomain,
  selectIsProfileLoading,
  selectIsImageLoading,
  selectErrorLoadProfile,
  selectUserKey,
  selectProfile,
  selectCitiesList,
  selectLoadingGetCitiesList,
  selectErrorCitiesList,
} from '../selectors';

describe('selectProfileDomain', () => {
  const isProfileLoading = true;
  const isImageLoading = true;
  const errorLoadProfile = null;
  const userKey = 'user';
  const profile = fromJS({});
  const citiesList = fromJS([]);
  const loadingGetCitiesList = true;
  const errorCitiesList = null;

  const globalState = fromJS({
    isProfileLoading,
    isImageLoading,
    errorLoadProfile,
    userKey,
    profile,
    citiesList,
    loadingGetCitiesList,
    errorCitiesList,
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

  it('selectCitiesList', () => {
    const isCitiesList = selectCitiesList();
    expect(isCitiesList(mockedState)).toEqual(citiesList);
  });

  it('selectLoadingGetCitiesList', () => {
    const isLoadingGetCitiesList = selectLoadingGetCitiesList();
    expect(isLoadingGetCitiesList(mockedState)).toEqual(loadingGetCitiesList);
  });

  it('selectErrorCitiesList', () => {
    const isErrorCitiesList = selectErrorCitiesList();
    expect(isErrorCitiesList(mockedState)).toEqual(errorCitiesList);
  });
});
