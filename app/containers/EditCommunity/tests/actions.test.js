import {
  editCommunity,
  editCommunityError,
  editCommunitySuccess,
  getCommunity,
  getCommunityError,
  getCommunitySuccess,
} from '../actions';
import {
  EDIT_COMMUNITY,
  EDIT_COMMUNITY_ERROR,
  EDIT_COMMUNITY_SUCCESS,
  GET_COMMUNITY,
  GET_COMMUNITY_ERROR,
  GET_COMMUNITY_SUCCESS,
} from '../constants';

describe('EditCommunity actions', () => {
  describe('Edit Community Action', () => {
    it('has a type of EDIT_COMMUNITY', () => {
      const communityId = 0;
      const communityData = 'communityData';

      const expected = {
        type: EDIT_COMMUNITY,
        communityId,
        communityData,
      };

      expect(editCommunity(communityId, communityData)).toEqual(expected);
    });
  });

  describe('Edit Community Action Success', () => {
    it('has a type of EDIT_COMMUNITY_SUCCESS', () => {
      const expected = {
        type: EDIT_COMMUNITY_SUCCESS,
      };

      expect(editCommunitySuccess()).toEqual(expected);
    });
  });

  describe('Edit Community Action Error', () => {
    it('has a type of EDIT_COMMUNITY_ERROR', () => {
      const error = 'error';

      const expected = {
        type: EDIT_COMMUNITY_ERROR,
        error,
      };

      expect(editCommunityError(error)).toEqual(expected);
    });
  });

  describe('Get Community Action', () => {
    it('has a type of GET_COMMUNITY', () => {
      const communityId = 0;

      const expected = {
        type: GET_COMMUNITY,
        communityId,
      };

      expect(getCommunity(communityId)).toEqual(expected);
    });
  });

  describe('Get Community Action Success', () => {
    it('has a type of GET_COMMUNITY_SUCCESS', () => {
      const community = 'community';

      const expected = {
        type: GET_COMMUNITY_SUCCESS,
        community,
      };

      expect(getCommunitySuccess(community)).toEqual(expected);
    });
  });

  describe('Get Community Action Error', () => {
    it('has a type of GET_COMMUNITY_ERROR', () => {
      const error = 'error';

      const expected = {
        type: GET_COMMUNITY_ERROR,
        error,
      };

      expect(getCommunityError(error)).toEqual(expected);
    });
  });
});
