import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import tagsReducer, { initialState } from '../reducer';

import {
  getSuggestedTags,
  getSuggestedTagsSuccess,
  getSuggestedTagsErr,
  getExistingTags,
  getExistingTagsSuccess,
  getExistingTagsErr,
} from '../actions';

describe('tagsReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
      text: '',
      suggestedTags: [],
      existingTags: [],
    });
  });

  it('returns the initial state', () => {
    expect(tagsReducer(state, {})).toEqual(state);
  });

  it('LOCATION_CHANGE', () => {
    expect(tagsReducer(state, { type: LOCATION_CHANGE })).toEqual(initialState);
  });

  describe('getExistingTags', () => {
    const sorting = 'id';
    const text = 'text';

    it('sorting is NOT null', () => {
      const obj = state
        .set('existingTagsLoading', true)
        .set('text', text)
        .set('sorting', sorting);

      expect(tagsReducer(state, getExistingTags({ sorting, text }))).toEqual(
        obj,
      );
    });

    it('sorting is null', () => {
      const obj = state
        .set('existingTagsLoading', true)
        .set('text', text)
        .set('sorting', state.get('sorting'));

      expect(tagsReducer(state, getExistingTags({ text }))).toEqual(obj);
    });

    it('text is NOT STRING', () => {
      const obj = state
        .set('existingTagsLoading', true)
        .set('text', state.get('text'))
        .set('sorting', state.get('sorting'));

      expect(tagsReducer(state, getExistingTags({}))).toEqual(obj);
    });
  });

  describe('getExistingTagsSuccess', () => {
    let existingTags = [];
    let loadMore = false;

    it('existingTags.length < limit', () => {
      existingTags = [];

      const obj = state
        .set('existingTagsLoading', false)
        .set('existingTags', existingTags)
        .set('isLastFetchForExistingTags', true);

      expect(
        tagsReducer(state, getExistingTagsSuccess(existingTags, loadMore)),
      ).toEqual(obj);
    });

    it('existingTags.length === limit', () => {
      existingTags = Array(initialState.get('limit')).fill();

      const obj = state
        .set('existingTagsLoading', false)
        .set('existingTags', existingTags)
        .set('isLastFetchForExistingTags', false);

      expect(
        tagsReducer(state, getExistingTagsSuccess(existingTags, loadMore)),
      ).toEqual(obj);
    });

    it('loadMore is TRUE', () => {
      loadMore = true;
      existingTags = [];

      const obj = state
        .set('existingTagsLoading', false)
        .set('existingTags', state.toJS().existingTags.concat(existingTags))
        .set('isLastFetchForExistingTags', true);

      expect(
        tagsReducer(state, getExistingTagsSuccess(existingTags, loadMore)),
      ).toEqual(obj);
    });
  });

  it('getExistingTagsErr', () => {
    const getExistingTagsError = 'getExistingTagsError';

    const obj = state
      .set('existingTagsLoading', false)
      .set('getExistingTagsError', getExistingTagsError);

    expect(
      tagsReducer(state, getExistingTagsErr(getExistingTagsError)),
    ).toEqual(obj);
  });

  describe('getSuggestedTags', () => {
    const sorting = 'id';

    it('sorting is NOT null', () => {
      const obj = state
        .set('suggestedTagsLoading', true)
        .set('sorting', sorting);

      expect(tagsReducer(state, getSuggestedTags({ sorting }))).toEqual(obj);
    });

    it('sorting is null', () => {
      const obj = state
        .set('suggestedTagsLoading', true)
        .set('sorting', state.get('sorting'));

      expect(tagsReducer(state, getSuggestedTags({}))).toEqual(obj);
    });
  });

  describe('getSuggestedTagsSuccess', () => {
    let suggestedTags = [];
    let loadMore = false;

    it('suggestedTags.length < limit', () => {
      suggestedTags = [];

      const obj = state
        .set('suggestedTagsLoading', false)
        .set('suggestedTags', suggestedTags)
        .set('isLastFetchForSuggestedTags', true);

      expect(
        tagsReducer(state, getSuggestedTagsSuccess(suggestedTags, loadMore)),
      ).toEqual(obj);
    });

    it('suggestedTags.length === limit', () => {
      suggestedTags = Array(initialState.get('limit')).fill();

      const obj = state
        .set('suggestedTagsLoading', false)
        .set('suggestedTags', suggestedTags)
        .set('isLastFetchForSuggestedTags', false);

      expect(
        tagsReducer(state, getSuggestedTagsSuccess(suggestedTags, loadMore)),
      ).toEqual(obj);
    });

    it('loadMore is TRUE', () => {
      loadMore = true;
      suggestedTags = [];

      const obj = state
        .set('suggestedTagsLoading', false)
        .set('suggestedTags', state.toJS().suggestedTags.concat(suggestedTags))
        .set('isLastFetchForSuggestedTags', true);

      expect(
        tagsReducer(state, getSuggestedTagsSuccess(suggestedTags, loadMore)),
      ).toEqual(obj);
    });
  });

  it('getSuggestedTagsErr', () => {
    const getSuggestedTagsError = 'getSuggestedTagsError';

    const obj = state
      .set('suggestedTagsLoading', false)
      .set('getSuggestedTagsError', getSuggestedTagsError);

    expect(
      tagsReducer(state, getSuggestedTagsErr(getSuggestedTagsError)),
    ).toEqual(obj);
  });
});
