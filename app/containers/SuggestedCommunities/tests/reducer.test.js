import { fromJS } from 'immutable';
import suggestedCommunitiesReducer from '../reducer';

import {
  getSuggestedCommunities,
  getSuggestedCommunitiesSuccess,
  getSuggestedCommunitiesErr,
  upVote,
  upVoteSuccess,
  upVoteErr,
  downVote,
  downVoteSuccess,
  downVoteErr,
} from '../actions';

describe('suggestedCommunitiesReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(suggestedCommunitiesReducer(state, {})).toEqual(state);
  });

  it('getSuggestedCommunities', () => {
    const obj = state.set('getSuggestedCommunitiesLoading', true);

    expect(
      suggestedCommunitiesReducer(state, getSuggestedCommunities()),
    ).toEqual(obj);
  });

  it('getSuggestedCommunitiesSuccess', () => {
    const communities = 'communities';
    const obj = state
      .set('getSuggestedCommunitiesLoading', false)
      .set('communities', communities);

    expect(
      suggestedCommunitiesReducer(
        state,
        getSuggestedCommunitiesSuccess(communities),
      ),
    ).toEqual(obj);
  });

  it('getSuggestedCommunitiesErr', () => {
    const getSuggestedCommunitiesError = 'getSuggestedCommunitiesError';
    const obj = state
      .set('getSuggestedCommunitiesLoading', false)
      .set('getSuggestedCommunitiesError', getSuggestedCommunitiesError);

    expect(
      suggestedCommunitiesReducer(
        state,
        getSuggestedCommunitiesErr(getSuggestedCommunitiesError),
      ),
    ).toEqual(obj);
  });

  it('upVote', () => {
    const obj = state.set('upVoteLoading', true);

    expect(suggestedCommunitiesReducer(state, upVote())).toEqual(obj);
  });

  it('upVoteSuccess', () => {
    const communities = 'communities';
    const obj = state
      .set('upVoteLoading', false)
      .set('communities', communities);

    expect(
      suggestedCommunitiesReducer(state, upVoteSuccess(communities)),
    ).toEqual(obj);
  });

  it('upVoteErr', () => {
    const upVoteError = 'upVoteError';
    const obj = state
      .set('upVoteLoading', false)
      .set('upVoteError', upVoteError);

    expect(suggestedCommunitiesReducer(state, upVoteErr(upVoteError))).toEqual(
      obj,
    );
  });

  it('downVote', () => {
    const obj = state.set('downVoteLoading', true);

    expect(suggestedCommunitiesReducer(state, downVote())).toEqual(obj);
  });

  it('downVoteSuccess', () => {
    const communities = 'communities';
    const obj = state
      .set('downVoteLoading', false)
      .set('communities', communities);

    expect(
      suggestedCommunitiesReducer(state, downVoteSuccess(communities)),
    ).toEqual(obj);
  });

  it('downVoteErr', () => {
    const downVoteError = 'downVoteError';
    const obj = state
      .set('downVoteLoading', false)
      .set('downVoteError', downVoteError);

    expect(
      suggestedCommunitiesReducer(state, downVoteErr(downVoteError)),
    ).toEqual(obj);
  });
});
