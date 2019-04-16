import { fromJS } from 'immutable';
import voteForNewCommunityButtonReducer from '../reducer';

import {
  upVote,
  upVoteSuccess,
  upVoteErr,
  downVote,
  downVoteSuccess,
  downVoteErr,
} from '../actions';

describe('voteForNewCommunityButtonReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(voteForNewCommunityButtonReducer(state, {})).toEqual(state);
  });

  it('upVote', () => {
    const obj = state.set('upVoteLoading', true);
    expect(voteForNewCommunityButtonReducer(state, upVote())).toEqual(obj);
  });

  it('upVoteSuccess', () => {
    const obj = state.set('upVoteLoading', false);

    expect(voteForNewCommunityButtonReducer(state, upVoteSuccess())).toEqual(
      obj,
    );
  });

  it('upVoteErr', () => {
    const upVoteError = 'upVoteError';
    const obj = state
      .set('upVoteLoading', false)
      .set('upVoteError', upVoteError);

    expect(
      voteForNewCommunityButtonReducer(state, upVoteErr(upVoteError)),
    ).toEqual(obj);
  });

  it('downVote', () => {
    const obj = state.set('downVoteLoading', true);

    expect(voteForNewCommunityButtonReducer(state, downVote())).toEqual(obj);
  });

  it('downVoteSuccess', () => {
    const obj = state.set('downVoteLoading', false);

    expect(voteForNewCommunityButtonReducer(state, downVoteSuccess())).toEqual(
      obj,
    );
  });

  it('downVoteErr', () => {
    const downVoteError = 'downVoteError';
    const obj = state
      .set('downVoteLoading', false)
      .set('downVoteError', downVoteError);

    expect(
      voteForNewCommunityButtonReducer(state, downVoteErr(downVoteError)),
    ).toEqual(obj);
  });
});
