import { fromJS } from 'immutable';
import suggestedTagsReducer from '../reducer';

import {
  getSuggestedTags,
  getSuggestedTagsSuccess,
  getSuggestedTagsErr,
  upVote,
  upVoteSuccess,
  upVoteErr,
  downVote,
  downVoteSuccess,
  downVoteErr,
} from '../actions';

describe('suggestedTagsReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(suggestedTagsReducer(state, {})).toEqual(state);
  });

  it('getSuggestedTags', () => {
    const obj = state.set('tagsLoading', true);

    expect(suggestedTagsReducer(state, getSuggestedTags())).toEqual(obj);
  });

  it('getSuggestedTagsSuccess', () => {
    const tags = 'tags';
    const obj = state.set('tagsLoading', false).set('tags', tags);

    expect(suggestedTagsReducer(state, getSuggestedTagsSuccess(tags))).toEqual(
      obj,
    );
  });

  it('getSuggestedTagsErr', () => {
    const getSuggestedTagsError = 'getSuggestedTagsError';
    const obj = state
      .set('tagsLoading', false)
      .set('getSuggestedTagsError', getSuggestedTagsError);

    expect(
      suggestedTagsReducer(state, getSuggestedTagsErr(getSuggestedTagsError)),
    ).toEqual(obj);
  });

  it('upVote', () => {
    const obj = state.set('upVoteLoading', true);

    expect(suggestedTagsReducer(state, upVote())).toEqual(obj);
  });

  it('upVoteSuccess', () => {
    const tags = 'tags';
    const obj = state.set('upVoteLoading', false).set('tags', tags);

    expect(suggestedTagsReducer(state, upVoteSuccess(tags))).toEqual(obj);
  });

  it('upVoteErr', () => {
    const upVoteError = 'upVoteError';
    const obj = state
      .set('upVoteLoading', false)
      .set('upVoteError', upVoteError);

    expect(suggestedTagsReducer(state, upVoteErr(upVoteError))).toEqual(obj);
  });

  it('downVote', () => {
    const obj = state.set('downVoteLoading', true);

    expect(suggestedTagsReducer(state, downVote())).toEqual(obj);
  });

  it('downVoteSuccess', () => {
    const tags = 'tags';
    const obj = state.set('downVoteLoading', false).set('tags', tags);

    expect(suggestedTagsReducer(state, downVoteSuccess(tags))).toEqual(obj);
  });

  it('downVoteErr', () => {
    const downVoteError = 'downVoteError';
    const obj = state
      .set('downVoteLoading', false)
      .set('downVoteError', downVoteError);

    expect(suggestedTagsReducer(state, downVoteErr(downVoteError))).toEqual(
      obj,
    );
  });
});
