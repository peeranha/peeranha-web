import {
  getCommunitiesWithTags,
  getCommunitiesWithTagsSuccess,
  getCommunitiesWithTagsErr,
} from '../actions';

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_COMMUNITIES_WITH_TAGS_SUCCESS,
  GET_COMMUNITIES_WITH_TAGS_ERROR,
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
  });
});
