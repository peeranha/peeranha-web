import {
  saveProfile,
  saveProfileSuccess,
  saveProfileErr,
  setDefaultReducer,
} from '../actions';

import {
  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_ERROR,
  SET_DEFAULT_REDUCER,
} from '../constants';

describe('setDefaultReducer', () => {
  it('type SET_DEFAULT_REDUCER', () => {
    const expected = {
      type: SET_DEFAULT_REDUCER,
    };
    expect(setDefaultReducer()).toEqual(expected);
  });
});

describe('saveProfile actions', () => {
  describe('saveProfile Action', () => {
    it('has a type of SAVE_PROFILE', () => {
      const profile = 'profile';
      const userKey = 'userKey';

      const expected = {
        type: SAVE_PROFILE,
        profile,
        userKey,
      };

      expect(saveProfile({ profile, userKey })).toEqual(expected);
    });
  });

  describe('saveProfileSuccess Action', () => {
    it('has a type of SAVE_PROFILE_SUCCESS', () => {
      const expected = {
        type: SAVE_PROFILE_SUCCESS,
      };

      expect(saveProfileSuccess()).toEqual(expected);
    });
  });

  describe('saveProfileErr Action', () => {
    it('has a type of SAVE_PROFILE_ERROR', () => {
      const saveProfileError = 'saveProfileError';

      const expected = {
        type: SAVE_PROFILE_ERROR,
        saveProfileError,
      };

      expect(saveProfileErr(saveProfileError)).toEqual(expected);
    });
  });
});
