import {
  upVote,
  upVoteSuccess,
  upVoteErr,
  downVote,
  downVoteSuccess,
  downVoteErr,
} from '../actions';

import {
  UPVOTE,
  UPVOTE_SUCCESS,
  UPVOTE_ERROR,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_ERROR,
} from '../constants';

describe('SuggestedCommunities actions', () => {
  it('UPVOTE', () => {
    const communityId = 'communityId';
    const buttonId = 'buttonId';
    const expected = {
      type: UPVOTE,
      communityId,
      buttonId,
    };

    expect(upVote(communityId, buttonId)).toEqual(expected);
  });

  it('UPVOTE_SUCCESS', () => {
    const expected = {
      type: UPVOTE_SUCCESS,
    };

    expect(upVoteSuccess()).toEqual(expected);
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
    const communityId = 'communityId';
    const buttonId = 'buttonId';
    const expected = {
      type: DOWNVOTE,
      communityId,
      buttonId,
    };

    expect(downVote(communityId, buttonId)).toEqual(expected);
  });

  it('DOWNVOTE_SUCCESS', () => {
    const expected = {
      type: DOWNVOTE_SUCCESS,
    };

    expect(downVoteSuccess()).toEqual(expected);
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
