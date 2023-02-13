import {
  getCommunities,
  getCommunitiesSuccess,
  getCommunitiesErr,
  getUserProfile,
  getUserProfileSuccess,
  getUserProfileErr,
  getStat,
  getStatSuccess,
  getStatErr,
  getFaq,
  getFaqSuccess,
  getFaqErr,
} from '../actions';

import {
  GET_COMMUNITIES,
  GET_COMMUNITIES_SUCCESS,
  GET_COMMUNITIES_ERROR,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  GET_STAT,
  GET_STAT_SUCCESS,
  GET_STAT_ERROR,
  GET_FAQ,
  GET_FAQ_SUCCESS,
  GET_FAQ_ERROR,
} from '../constants';

describe('DataCacheProvider actions', () => {
  describe('getCommunities Action', () => {
    it('GET_COMMUNITIES', () => {
      const expected = {
        type: GET_COMMUNITIES,
      };

      expect(getCommunities()).toEqual(expected);
    });

    it('GET_COMMUNITIES_SUCCESS', () => {
      const communities = [];
      const expected = {
        type: GET_COMMUNITIES_SUCCESS,
        communities,
      };

      expect(getCommunitiesSuccess(communities)).toEqual(expected);
    });

    it('GET_COMMUNITIES_ERROR', () => {
      const getCommunitiesError = 'getCommunitiesError';
      const expected = {
        type: GET_COMMUNITIES_ERROR,
        getCommunitiesError,
      };
      expect(getCommunitiesErr(getCommunitiesError)).toEqual(expected);
    });

    it('GET_USER_PROFILE', () => {
      const user = 'user';
      const expected = {
        type: GET_USER_PROFILE,
        user,
      };

      expect(getUserProfile(user)).toEqual(expected);
    });

    it('GET_USER_PROFILE_SUCCESS', () => {
      const profile = 'profile';
      const expected = {
        type: GET_USER_PROFILE_SUCCESS,
        profile,
      };

      expect(getUserProfileSuccess(profile)).toEqual(expected);
    });

    it('GET_USER_PROFILE_ERROR', () => {
      const getUserProfileError = 'getUserProfileError';
      const expected = {
        type: GET_USER_PROFILE_ERROR,
        getUserProfileError,
      };

      expect(getUserProfileErr(getUserProfileError)).toEqual(expected);
    });
  });

  describe('getStat actions', () => {
    it('GET_STAT', () => {
      const expected = {
        type: GET_STAT,
      };

      expect(getStat()).toEqual(expected);
    });

    it('GET_STAT_SUCCESS', () => {
      const stat = 'stat';

      const expected = {
        type: GET_STAT_SUCCESS,
        stat,
      };

      expect(getStatSuccess(stat)).toEqual(expected);
    });

    it('GET_STAT_ERROR', () => {
      const getStatError = 'getStatError';

      const expected = {
        type: GET_STAT_ERROR,
        getStatError,
      };

      expect(getStatErr(getStatError)).toEqual(expected);
    });
  });

  it('getFaq', () => {
    const expected = {
      type: GET_FAQ,
    };

    expect(getFaq()).toEqual(expected);
  });

  it('getFaqSuccess', () => {
    const faq = [];
    const expected = {
      type: GET_FAQ_SUCCESS,
      faq,
    };

    expect(getFaqSuccess(faq)).toEqual(expected);
  });

  it('getFaqErr', () => {
    const getFaqError = 'getFaqError';
    const expected = {
      type: GET_FAQ_ERROR,
      getFaqError,
    };

    expect(getFaqErr(getFaqError)).toEqual(expected);
  });
});
