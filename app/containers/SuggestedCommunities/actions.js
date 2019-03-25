/*
 *
 * SuggestedCommunities actions
 *
 */

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
} from './constants';

export function getSuggestedCommunities() {
  return {
    type: GET_SUGGESTED_COMMUNITIES,
  };
}

export function getSuggestedCommunitiesSuccess(communities) {
  return {
    type: GET_SUGGESTED_COMMUNITIES_SUCCESS,
    communities,
  };
}

export function getSuggestedCommunitiesErr(getSuggestedCommunitiesError) {
  return {
    type: GET_SUGGESTED_COMMUNITIES_ERROR,
    getSuggestedCommunitiesError,
  };
}

/*
 *
 * upVote actions
 *
 */

export function upVote(communityid, buttonId) {
  return {
    type: UPVOTE,
    communityid,
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

export function downVote(communityid, buttonId) {
  return {
    type: DOWNVOTE,
    communityid,
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
