import { fromJS } from 'immutable';

import {
  UPVOTE,
  UPVOTE_SUCCESS,
  UPVOTE_ERROR,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_ERROR,
} from './constants';

export const initialState = fromJS({
  upVoteLoading: false,
  upVoteError: null,
  downVoteLoading: false,
  downVoteError: null,
});

function voteForNewTagButtonReducer(state = initialState, action) {
  const { type, downVoteError, upVoteError } = action;

  switch (type) {
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

export default voteForNewTagButtonReducer;
