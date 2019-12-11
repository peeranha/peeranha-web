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
  ids: [],
});

function voteForNewTagButtonReducer(state = initialState, action) {
  const { type, downVoteError, upVoteError, buttonId } = action;

  switch (type) {
    case UPVOTE:
      return state
        .set('upVoteLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case UPVOTE_SUCCESS:
      return state
        .set('upVoteLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case UPVOTE_ERROR:
      return state
        .set('upVoteLoading', false)
        .set('upVoteError', upVoteError)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    case DOWNVOTE:
      return state
        .set('downVoteLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case DOWNVOTE_SUCCESS:
      return state
        .set('downVoteLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case DOWNVOTE_ERROR:
      return state
        .set('downVoteLoading', false)
        .set('downVoteError', downVoteError)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    default:
      return state;
  }
}

export default voteForNewTagButtonReducer;
