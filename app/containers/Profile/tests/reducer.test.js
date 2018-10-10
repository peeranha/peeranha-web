import { fromJS } from 'immutable';

import profileReducer from '../reducer';

import {
  getProfileInfo,
  getProfileInfoSuccess,
  getProfileInfoError,
  getCitiesList,
  getCitiesListSuccess,
  getCitiesListError,
  chooseLocation,
} from '../actions';

import { LOCATION_FIELD } from '../constants';

describe('profileReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(profileReducer(state, {})).toEqual(state);
  });

  it('getProfileInfo: set @loading true', () => {
    const obj = state.set('userKey', true).set('isProfileLoading', true);
    expect(profileReducer(state, getProfileInfo(true))).toEqual(obj);
  });

  it('getProfileInfoSuccess: returns user profile', () => {
    const obj = state
      .set('profile', { name: 'test' })
      .set('isOwner', undefined)
      .set('isProfileLoading', false);
    expect(
      profileReducer(state, getProfileInfoSuccess({ name: 'test' })),
    ).toEqual(obj);
  });

  it('getProfileInfoError: returns error message', () => {
    const obj = state
      .set('errorLoadProfile', 'error')
      .set('isProfileLoading', false);
    expect(profileReducer(state, getProfileInfoError('error'))).toEqual(obj);
  });

  it('getCitiesList: returns locationSearch', () => {
    const locationSearch = 'Minsk';
    const st = state.set('profile', { ipfs: {} });
    const obj = state.set('locationSearch', locationSearch).set('profile', {
      ipfs: {
        [LOCATION_FIELD]: {
          name: locationSearch,
        },
      },
    });
    expect(profileReducer(st, getCitiesList(locationSearch))).toEqual(obj);
  });

  it('getCitiesListSuccess: returns citiesList', () => {
    const citiesList = ['Minsk', 'Chicago'];
    const obj = state
      .set('loadingGetCitiesList', false)
      .set('citiesList', citiesList);
    expect(profileReducer(state, getCitiesListSuccess(citiesList))).toEqual(
      obj,
    );
  });

  it('getCitiesListError: returns error message', () => {
    const errorCitiesList = 'error message';
    const obj = state
      .set('loadingGetCitiesList', false)
      .set('errorCitiesList', errorCitiesList);
    expect(profileReducer(state, getCitiesListError(errorCitiesList))).toEqual(
      obj,
    );
  });

  it('chooseLocation: returns cityId, city', () => {
    const cityId = '10101';
    const city = 'Minsk';
    const st = state.set('profile', { ipfs: {} });
    const obj = state.set('profile', {
      ipfs: {
        [LOCATION_FIELD]: {
          id: cityId,
          name: city,
        },
      },
    });
    expect(profileReducer(st, chooseLocation(cityId, city))).toEqual(obj);
  });
});
