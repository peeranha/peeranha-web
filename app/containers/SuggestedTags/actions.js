/*
 *
 * SuggestedTags actions
 *
 */

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
} from './constants';

export function getSuggestedTags(communityid) {
  return {
    type: GET_SUGGESTED_TAGS,
    communityid,
  };
}

export function getSuggestedTagsSuccess(tags) {
  return {
    type: GET_SUGGESTED_TAGS_SUCCESS,
    tags,
  };
}

export function getSuggestedTagsErr(getSuggestedTagsError) {
  return {
    type: GET_SUGGESTED_TAGS_ERROR,
    getSuggestedTagsError,
  };
}

/*
 *
 * upVote actions
 *
 */

export function upVote(communityid, tagid, buttonId) {
  return {
    type: UPVOTE,
    communityid,
    tagid,
    buttonId,
  };
}

export function upVoteSuccess(tags) {
  return {
    type: UPVOTE_SUCCESS,
    tags,
  };
}

export function upVoteErr(upVoteError) {
  return {
    type: UPVOTE_ERROR,
    upVoteError,
  };
}

/*
 *
 * downVote actions
 *
 */

export function downVote(communityid, tagid, buttonId) {
  return {
    type: DOWNVOTE,
    communityid,
    tagid,
    buttonId,
  };
}

export function downVoteSuccess(tags) {
  return {
    type: DOWNVOTE_SUCCESS,
    tags,
  };
}

export function downVoteErr(downVoteError) {
  return {
    type: DOWNVOTE_ERROR,
    downVoteError,
  };
}
