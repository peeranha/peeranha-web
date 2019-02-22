import {
  getProfileInfo,
  getProfileInfoSuccess,
  getProfileInfoError,
} from '../actions';

import {
  GET_PROFILE_INFORMATION,
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
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
