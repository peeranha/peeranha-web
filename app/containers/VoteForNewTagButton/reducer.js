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
  ids: new Set(),
});

function voteForNewTagButtonReducer(state = initialState, action) {
  const { type, downVoteError, upVoteError, buttonId } = action;

  switch (type) {
    case UPVOTE:
      return state
        .set('upVoteLoading', true)
        .set('ids', new Set([...state.toJS().ids.add(buttonId)]));
    case UPVOTE_SUCCESS:
      state.toJS().ids.delete(buttonId);
      return state
        .set('upVoteLoading', false)
        .set('ids', new Set([...state.toJS().ids]));
    case UPVOTE_ERROR:
      state.toJS().ids.delete(buttonId);
      return state
        .set('upVoteLoading', false)
        .set('upVoteError', upVoteError)
        .set('ids', new Set([...state.toJS().ids]));

    case DOWNVOTE:
      return state
        .set('downVoteLoading', true)
        .set('ids', new Set([...state.toJS().ids.add(buttonId)]));
    case DOWNVOTE_SUCCESS:
      state.toJS().ids.delete(buttonId);
      return state
        .set('downVoteLoading', false)
        .set('ids', new Set([...state.toJS().ids]));
    case DOWNVOTE_ERROR:
      state.toJS().ids.delete(buttonId);
      return state
        .set('downVoteLoading', false)
        .set('downVoteError', downVoteError)
        .set('ids', new Set([...state.toJS().ids]));

    default:
      return state;
  }
}

export default voteForNewTagButtonReducer;
