import { fromJS } from 'immutable';
import voteForNewTagButtonReducer from '../reducer';

import {
  upVote,
  upVoteSuccess,
  upVoteErr,
  downVote,
  downVoteSuccess,
  downVoteErr,
} from '../actions';

describe('voteForNewTagButtonReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    }).set('ids', []);
  });

  it('returns the initial state', () => {
    expect(voteForNewTagButtonReducer(state, {})).toEqual(state);
  });

  it('upVote', () => {
    const communityId = 0;
    const tagId = 0;
    const buttonId = 0;

    const obj = state.set('upVoteLoading', true).set('ids', [buttonId]);

    expect(
      voteForNewTagButtonReducer(state, upVote(communityId, tagId, buttonId)),
    ).toEqual(obj);
  });

  it('upVoteSuccess', () => {
    const obj = state.set('upVoteLoading', false);

    expect(voteForNewTagButtonReducer(state, upVoteSuccess())).toEqual(obj);
  });

  it('upVoteErr', () => {
    const upVoteError = 'upVoteError';

    const obj = state
      .set('upVoteLoading', false)
      .set('upVoteError', upVoteError);

    expect(voteForNewTagButtonReducer(state, upVoteErr(upVoteError))).toEqual(
      obj,
    );
  });

  it('downVote', () => {
    const communityId = 0;
    const tagId = 0;
    const buttonId = 0;

    const obj = state.set('downVoteLoading', true).set('ids', [buttonId]);

    expect(
      voteForNewTagButtonReducer(state, downVote(communityId, tagId, buttonId)),
    ).toEqual(obj);
  });

  it('downVoteSuccess', () => {
    const obj = state.set('downVoteLoading', false);

    expect(voteForNewTagButtonReducer(state, downVoteSuccess())).toEqual(obj);
  });

  it('downVoteErr', () => {
    const downVoteError = 'downVoteError';
    const obj = state
      .set('downVoteLoading', false)
      .set('downVoteError', downVoteError);

    expect(
      voteForNewTagButtonReducer(state, downVoteErr(downVoteError)),
    ).toEqual(obj);
  });
});
