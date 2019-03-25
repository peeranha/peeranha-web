import {
  getSuggestedCommunities,
  getSuggestedCommunitiesSuccess,
  getSuggestedCommunitiesErr,
  upVote,
  upVoteSuccess,
  upVoteErr,
  downVote,
  downVoteSuccess,
  downVoteErr,
} from '../actions';

import {
  GET_SUGGESTED_COMMUNITIES,
  GET_SUGGESTED_COMMUNITIES_SUCCESS,
  GET_SUGGESTED_COMMUNITIES_ERROR,
  UPVOTE,
  UPVOTE_SUCCESS,
  UPVOTE_ERROR,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_ERROR,
} from '../constants';

describe('SuggestedCommunities actions', () => {
  it('GET_SUGGESTED_COMMUNITIES', () => {
    const expected = {
      type: GET_SUGGESTED_COMMUNITIES,
    };

    expect(getSuggestedCommunities()).toEqual(expected);
  });

  it('GET_SUGGESTED_COMMUNITIES_SUCCESS', () => {
    const communities = 'communities';
    const expected = {
      type: GET_SUGGESTED_COMMUNITIES_SUCCESS,
      communities,
    };

    expect(getSuggestedCommunitiesSuccess(communities)).toEqual(expected);
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

  it('UPVOTE', () => {
    const communityid = 'communityid';
    const buttonId = 'buttonId';
    const expected = {
      type: UPVOTE,
      communityid,
      buttonId,
    };

    expect(upVote(communityid, buttonId)).toEqual(expected);
  });

  it('UPVOTE_SUCCESS', () => {
    const communities = 'communities';
    const expected = {
      type: UPVOTE_SUCCESS,
      communities,
    };

    expect(upVoteSuccess(communities)).toEqual(expected);
  });

  it('UPVOTE_ERROR', () => {
    const upVoteError = 'upVoteError';
    const expected = {
      type: UPVOTE_ERROR,
      upVoteError,
    };

    expect(upVoteErr(upVoteError)).toEqual(expected);
  });

  it('DOWNVOTE', () => {
    const communityid = 'communityid';
    const buttonId = 'buttonId';
    const expected = {
      type: DOWNVOTE,
      communityid,
      buttonId,
    };

    expect(downVote(communityid, buttonId)).toEqual(expected);
  });

  it('DOWNVOTE_SUCCESS', () => {
    const communities = 'communities';
    const expected = {
      type: DOWNVOTE_SUCCESS,
      communities,
    };

    expect(downVoteSuccess(communities)).toEqual(expected);
  });

  it('DOWNVOTE_ERROR', () => {
    const downVoteError = 'downVoteError';
    const expected = {
      type: DOWNVOTE_ERROR,
      downVoteError,
    };

    expect(downVoteErr(downVoteError)).toEqual(expected);
  });
});
