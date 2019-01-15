/*
 *
 * SuggestedCommunities reducer
 *
 */

import { fromJS } from 'immutable';
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

export const initialState = fromJS({
  communities: [],
  getSuggestedCommunitiesError: null,
  getSuggestedCommunitiesLoading: false,
  upVoteLoading: false,
  upVoteError: null,
  downVoteLoading: false,
  downVoteError: null,
});

function suggestedCommunitiesReducer(state = initialState, action) {
  const {
    type,
    getSuggestedCommunitiesError,
    communities,
    downVoteError,
    upVoteError,
  } = action;

  switch (type) {
    case GET_SUGGESTED_COMMUNITIES:
      return state.set('getSuggestedCommunitiesLoading', true);
    case GET_SUGGESTED_COMMUNITIES_SUCCESS:
      return state
        .set('getSuggestedCommunitiesLoading', false)
        .set('communities', communities);
    case GET_SUGGESTED_COMMUNITIES_ERROR:
      return state
        .set('getSuggestedCommunitiesLoading', false)
        .set('getSuggestedCommunitiesError', getSuggestedCommunitiesError);

    case UPVOTE:
      return state.set('upVoteLoading', true);
    case UPVOTE_SUCCESS:
      return state.set('upVoteLoading', false).set('communities', communities);
    case UPVOTE_ERROR:
      return state.set('upVoteLoading', false).set('upVoteError', upVoteError);

    case DOWNVOTE:
      return state.set('downVoteLoading', true);
    case DOWNVOTE_SUCCESS:
      return state
        .set('downVoteLoading', false)
        .set('communities', communities);
    case DOWNVOTE_ERROR:
      return state
        .set('downVoteLoading', false)
        .set('downVoteError', downVoteError);

    default:
      return state;
  }
}

export default suggestedCommunitiesReducer;
