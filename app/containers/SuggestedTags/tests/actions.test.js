import {
  getSuggestedTags,
  getSuggestedTagsSuccess,
  getSuggestedTagsErr,
  upVote,
  upVoteSuccess,
  upVoteErr,
  downVote,
  downVoteSuccess,
  downVoteErr,
} from '../actions';

import {
  GET_SUGGESTED_TAGS,
  GET_SUGGESTED_TAGS_SUCCESS,
  GET_SUGGESTED_TAGS_ERROR,
  UPVOTE,
  UPVOTE_SUCCESS,
  UPVOTE_ERROR,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_ERROR,
} from '../constants';

describe('SuggestedTags actions', () => {
  it('GET_SUGGESTED_TAGS', () => {
    const communityid = 'communityid';
    const expected = {
      type: GET_SUGGESTED_TAGS,
      communityid,
    };

    expect(getSuggestedTags(communityid)).toEqual(expected);
  });

  it('GET_SUGGESTED_TAGS_SUCCESS', () => {
    const tags = 'tags';
    const expected = {
      type: GET_SUGGESTED_TAGS_SUCCESS,
      tags,
    };

    expect(getSuggestedTagsSuccess(tags)).toEqual(expected);
  });

  it('GET_SUGGESTED_TAGS_ERROR', () => {
    const getSuggestedTagsError = 'getSuggestedTagsError';
    const expected = {
      type: GET_SUGGESTED_TAGS_ERROR,
      getSuggestedTagsError,
    };

    expect(getSuggestedTagsErr(getSuggestedTagsError)).toEqual(expected);
  });

  it('UPVOTE', () => {
    const communityid = 'communityid';
    const tagid = 'tagid';
    const buttonId = 'buttonId';
    const expected = {
      type: UPVOTE,
      communityid,
      tagid,
      buttonId,
    };

    expect(upVote(communityid, tagid, buttonId)).toEqual(expected);
  });

  it('UPVOTE_SUCCESS', () => {
    const tags = 'tags';
    const expected = {
      type: UPVOTE_SUCCESS,
      tags,
    };

    expect(upVoteSuccess(tags)).toEqual(expected);
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
    const tagid = 'tagid';
    const buttonId = 'buttonId';
    const expected = {
      type: DOWNVOTE,
      communityid,
      tagid,
      buttonId,
    };

    expect(downVote(communityid, tagid, buttonId)).toEqual(expected);
  });

  it('DOWNVOTE_SUCCESS', () => {
    const tags = 'tags';
    const expected = {
      type: DOWNVOTE_SUCCESS,
      tags,
    };

    expect(downVoteSuccess(tags)).toEqual(expected);
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
