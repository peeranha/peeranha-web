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

export function upVoteSuccess(buttonId) {
  return {
    type: UPVOTE_SUCCESS,
    buttonId,
  };
}

export function upVoteErr(upVoteError, buttonId) {
  return {
    type: UPVOTE_ERROR,
    upVoteError,
    buttonId,
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

export function downVoteSuccess(buttonId) {
  return {
    type: DOWNVOTE_SUCCESS,
    buttonId,
  };
}

export function downVoteErr(downVoteError, buttonId) {
  return {
    type: DOWNVOTE_ERROR,
    downVoteError,
    buttonId,
  };
}
