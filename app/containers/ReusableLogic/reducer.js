/*
 *
 * ReusableLogic reducer
 *
 */

import { fromJS } from 'immutable';
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

export const initialState = fromJS({
  followHandlerLoading: false,
  followHandlerError: null,
  upVoteLoading: false,
  upVoteError: null,
  downVoteLoading: false,
  downVoteError: null,
});

function reusableLogicReducer(state = initialState, action) {
  const { type, followHandlerError, downVoteError, upVoteError } = action;

  switch (type) {
    case FOLLOW_HANDLER:
      return state.set('followHandlerLoading', true);
    case FOLLOW_HANDLER_SUCCESS:
      return state.set('followHandlerLoading', false);
    case FOLLOW_HANDLER_ERROR:
      return state
        .set('followHandlerLoading', false)
        .set('followHandlerError', followHandlerError);

    case UPVOTE:
      return state.set('upVoteLoading', true);
    case UPVOTE_SUCCESS:
      return state.set('upVoteLoading', false);
    case UPVOTE_ERROR:
      return state.set('upVoteLoading', false).set('upVoteError', upVoteError);

    case DOWNVOTE:
      return state.set('downVoteLoading', true);
    case DOWNVOTE_SUCCESS:
      return state.set('downVoteLoading', false);
    case DOWNVOTE_ERROR:
      return state
        .set('downVoteLoading', false)
        .set('downVoteError', downVoteError);

    default:
      return state;
  }
}

export default reusableLogicReducer;
