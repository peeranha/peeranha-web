/*
 *
 * SuggestedCommunities reducer
 *
 */

import { fromJS } from 'immutable';
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

export const initialState = fromJS({
  tags: [],
  getSuggestedTagsError: null,
  tagsLoading: false,
  upVoteLoading: false,
  upVoteError: null,
  downVoteLoading: false,
  downVoteError: null,
});

function suggestedTagsReducer(state = initialState, action) {
  const {
    type,
    getSuggestedTagsError,
    tags,
    downVoteError,
    upVoteError,
  } = action;

  switch (type) {
    case GET_SUGGESTED_TAGS:
      return state.set('tagsLoading', true);
    case GET_SUGGESTED_TAGS_SUCCESS:
      return state.set('tagsLoading', false).set('tags', tags);
    case GET_SUGGESTED_TAGS_ERROR:
      return state
        .set('tagsLoading', false)
        .set('getSuggestedTagsError', getSuggestedTagsError);

    case UPVOTE:
      return state.set('upVoteLoading', true);
    case UPVOTE_SUCCESS:
      return state.set('upVoteLoading', false).set('tags', tags);
    case UPVOTE_ERROR:
      return state.set('upVoteLoading', false).set('upVoteError', upVoteError);

    case DOWNVOTE:
      return state.set('downVoteLoading', true);
    case DOWNVOTE_SUCCESS:
      return state.set('downVoteLoading', false).set('tags', tags);
    case DOWNVOTE_ERROR:
      return state
        .set('downVoteLoading', false)
        .set('downVoteError', downVoteError);

    default:
      return state;
  }
}

export default suggestedTagsReducer;
