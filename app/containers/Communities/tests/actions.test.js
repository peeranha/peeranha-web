import {
  getSuggestedCommunities,
  getSuggestedCommunitiesSuccess,
  getSuggestedCommunitiesErr,
} from '../actions';

import {
  GET_SUGGESTED_COMMUNITIES,
  GET_SUGGESTED_COMMUNITIES_SUCCESS,
  GET_SUGGESTED_COMMUNITIES_ERROR,
} from '../constants';

describe('SuggestedCommunities actions', () => {
  it('GET_SUGGESTED_COMMUNITIES', () => {
    const expected = {
      type: GET_SUGGESTED_COMMUNITIES,
    };

    expect(getSuggestedCommunities()).toEqual(expected);
  });

  it('GET_SUGGESTED_COMMUNITIES_SUCCESS', () => {
    const suggestedCommunities = 'suggestedCommunities';
    const expected = {
      type: GET_SUGGESTED_COMMUNITIES_SUCCESS,
      suggestedCommunities,
    };

    expect(getSuggestedCommunitiesSuccess(suggestedCommunities)).toEqual(
      expected,
    );
  });

  it('GET_SUGGESTED_COMMUNITIES_ERROR', () => {
    const getSuggestedCommunitiesError = 'getSuggestedCommunitiesError';
    const expected = {
      type: GET_SUGGESTED_COMMUNITIES_ERROR,
      getSuggestedCommunitiesError,
    };

    expect(getSuggestedCommunitiesErr(getSuggestedCommunitiesError)).toEqual(
      expected,
    );
  });
});
