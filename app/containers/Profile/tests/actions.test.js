import {
  getProfileInfo,
  getProfileInfoSuccess,
  getProfileInfoError,
  getCitiesList,
  getCitiesListSuccess,
  getCitiesListError,
  chooseLocation,
} from '../actions';

import {
  GET_PROFILE_INFORMATION,
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
  CHOOSE_CITY_ACTION,
  GET_LOCATION_LIST,
  GET_LOCATION_LIST_SUCCESS,
  GET_LOCATION_LIST_ERROR,
} from '../constants';

const str = 'string';

describe('getProfileInformation actions', () => {
  describe('getProfileInfo Action', () => {
    it('has a type of GET_PROFILE_INFORMATION', () => {
      const expected = {
        type: GET_PROFILE_INFORMATION,
        userKey: str,
      };
      expect(getProfileInfo(str)).toEqual(expected);
    });
  });

  describe('getProfileInfoSuccess Action', () => {
    it('has a type of GET_PROFILE_INFORMATION_SUCCESS', () => {
      const expected = {
        type: GET_PROFILE_INFORMATION_SUCCESS,
        profile: str,
      };
      expect(getProfileInfoSuccess(str)).toEqual(expected);
    });
  });

  describe('getProfileInfoError Action', () => {
    it('has a type of GET_PROFILE_INFORMATION_ERROR', () => {
      const expected = {
        type: GET_PROFILE_INFORMATION_ERROR,
        errorLoadProfile: str,
      };
      expect(getProfileInfoError(str)).toEqual(expected);
    });
  });
});

describe('get citiesList actions', () => {
  describe('getCitiesList Action', () => {
    it('has a type of GET_LOCATION_LIST', () => {
      const expected = {
        type: GET_LOCATION_LIST,
        locationSearch: str,
      };
      expect(getCitiesList(str)).toEqual(expected);
    });
  });

  describe('getCitiesListSuccess Action', () => {
    it('has a type of GET_LOCATION_LIST_SUCCESS', () => {
      const expected = {
        type: GET_LOCATION_LIST_SUCCESS,
        citiesList: str,
      };
      expect(getCitiesListSuccess(str)).toEqual(expected);
    });
  });

  describe('getCitiesListError Action', () => {
    it('has a type of GET_LOCATION_LIST_ERROR', () => {
      const expected = {
        type: GET_LOCATION_LIST_ERROR,
        errorCitiesList: str,
      };
      expect(getCitiesListError(str)).toEqual(expected);
    });
  });

  describe('chooseLocation Action', () => {
    it('has a type of CHOOSE_CITY_ACTION', () => {
      const expected = {
        type: CHOOSE_CITY_ACTION,
        cityId: str,
        city: str,
      };
      expect(chooseLocation(str, str)).toEqual(expected);
    });
  });
});
