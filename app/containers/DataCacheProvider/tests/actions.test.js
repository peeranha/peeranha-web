import {
  getCommunitiesWithTags,
  getCommunitiesWithTagsSuccess,
  getCommunitiesWithTagsErr,
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
  GET_COMMUNITIES_WITH_TAGS,
  GET_COMMUNITIES_WITH_TAGS_SUCCESS,
  GET_COMMUNITIES_WITH_TAGS_ERROR,
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
  describe('getCommunitiesWithTags Action', () => {
    it('GET_COMMUNITIES_WITH_TAGS', () => {
      const expected = {
        type: GET_COMMUNITIES_WITH_TAGS,
      };

      expect(getCommunitiesWithTags()).toEqual(expected);
    });

    it('GET_COMMUNITIES_WITH_TAGS_SUCCESS', () => {
      const communities = [];
      const expected = {
        type: GET_COMMUNITIES_WITH_TAGS_SUCCESS,
        communities,
      };

      expect(getCommunitiesWithTagsSuccess(communities)).toEqual(expected);
    });

    it('GET_COMMUNITIES_WITH_TAGS_ERROR', () => {
      const getCommunitiesWithTagsError = 'getCommunitiesWithTagsError';
      const expected = {
        type: GET_COMMUNITIES_WITH_TAGS_ERROR,
        getCommunitiesWithTagsError,
      };
      expect(getCommunitiesWithTagsErr(getCommunitiesWithTagsError)).toEqual(
        expected,
      );
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
