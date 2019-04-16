import {
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
  UPVOTE,
  UPVOTE_SUCCESS,
  UPVOTE_ERROR,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_ERROR,
} from './constants';

export function followHandler(communityIdFilter, isFollowed) {
  return {
    type: FOLLOW_HANDLER,
    communityIdFilter,
    isFollowed,
  };
}

export function followHandlerSuccess() {
  return {
    type: FOLLOW_HANDLER_SUCCESS,
  };
}

export function followHandlerErr(followHandlerError) {
  return {
    type: FOLLOW_HANDLER_ERROR,
    followHandlerError,
  };
}

/*
 *
 * upVote actions
 *
 */

export function upVote(communityId, buttonId) {
  return {
    type: UPVOTE,
    communityId,
    buttonId,
  };
}

export function upVoteSuccess(communities) {
  return {
    type: UPVOTE_SUCCESS,
    communities,
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

export function downVote(communityId, buttonId) {
  return {
    type: DOWNVOTE,
    communityId,
    buttonId,
  };
}

export function downVoteSuccess(communities) {
  return {
    type: DOWNVOTE_SUCCESS,
    communities,
  };
}

export function downVoteErr(downVoteError) {
  return {
    type: DOWNVOTE_ERROR,
    downVoteError,
  };
}
