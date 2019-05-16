import {
  UPVOTE,
  UPVOTE_SUCCESS,
  UPVOTE_ERROR,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_ERROR,
} from './constants';

/*
 *
 * upVote actions
 *
 */

export function upVote(communityId, tagId, buttonId) {
  return {
    type: UPVOTE,
    communityId,
    tagId,
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

export function downVote(communityId, tagId, buttonId) {
  return {
    type: DOWNVOTE,
    communityId,
    tagId,
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
