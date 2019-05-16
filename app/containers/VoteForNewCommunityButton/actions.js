/**
 *
 * VoteForNewCommunityButton
 *
 */

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
