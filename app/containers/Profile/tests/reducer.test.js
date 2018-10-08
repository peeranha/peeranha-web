import { fromJS } from 'immutable';

import profileReducer from '../reducer';

import {
  getProfileInfo,
  getProfileInfoSuccess,
  getProfileInfoError,
  uploadImageFileAction,
  uploadImageFileSuccess,
  uploadImageFileError,
  clearImageChanges,
  saveImageChanges,
  saveProfileAction,
  saveProfileActionSuccess,
  saveProfileActionError,
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
    const obj = state.set('userKey', true).set('loadingProfile', true);
    expect(profileReducer(state, getProfileInfo(true))).toEqual(obj);
  });

  it('getProfileInfoSuccess: returns user profile', () => {
    const obj = state
      .set('profile', { name: 'test' })
      .set('loadingProfile', false);
    expect(
      profileReducer(state, getProfileInfoSuccess({ name: 'test' })),
    ).toEqual(obj);
  });

  it('getProfileInfoError: returns error message', () => {
    const obj = state
      .set('errorLoadProfile', 'error')
      .set('loadingProfile', false);
    expect(profileReducer(state, getProfileInfoError('error'))).toEqual(obj);
  });

  it('uploadImageFileAction: returns file', () => {
    const obj = state.set('loadingImage', true);
    expect(profileReducer(state, uploadImageFileAction())).toEqual(obj);
  });

  it('uploadImageFileSuccess: returns cashedProfileImg', () => {
    const obj = state
      .set('cashedProfileImg', 'test1')
      .set('loadingImage', false)
      .set('editingImgState', false);
    expect(profileReducer(state, uploadImageFileSuccess('test1'))).toEqual(obj);
  });

  it('uploadImageFileError: returns error message', () => {
    const obj = state
      .set('loadingImage', false)
      .set('errorUploadImage', 'error');
    expect(profileReducer(state, uploadImageFileError('error'))).toEqual(obj);
  });

  it('clearImageChanges: returns obj', () => {
    const obj = state.set('editingImgState', true).set('cashedProfileImg', '');
    expect(profileReducer(state, clearImageChanges())).toEqual(obj);
  });

  it('saveImageChanges: returns cashedProfileImg and blob', () => {
    const cashedProfileImg = 'test1';
    const blob = 'test2';
    const obj = state
      .set('cashedProfileImg', cashedProfileImg)
      .set('blob', blob)
      .set('editingImgState', true)
      .set('profile', {
        ...state.get('profile'),
        savedProfileImg: cashedProfileImg,
      });
    expect(
      profileReducer(state, saveImageChanges({ cashedProfileImg, blob })),
    ).toEqual(obj);
  });

  it('saveProfileAction: returns @loading true', () => {
    const obj = state.set('loadingSaveProfile', true);
    expect(profileReducer(state, saveProfileAction())).toEqual(obj);
  });

  it('saveProfileActionSuccess: returns @loading false', () => {
    const obj = state.set('loadingSaveProfile', false);
    expect(profileReducer(state, saveProfileActionSuccess())).toEqual(obj);
  });

  it('saveProfileActionError: returns errorSaveProfile', () => {
    const errorSaveProfile = 'error';
    const obj = state
      .set('loadingSaveProfile', false)
      .set('errorSaveProfile', errorSaveProfile);
    expect(
      profileReducer(state, saveProfileActionError(errorSaveProfile)),
    ).toEqual(obj);
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
