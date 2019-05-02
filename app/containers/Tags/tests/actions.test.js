import {
  getSuggestedTags,
  getSuggestedTagsSuccess,
  getSuggestedTagsErr,
  getExistingTags,
  getExistingTagsSuccess,
  getExistingTagsErr,
} from '../actions';

import {
  GET_SUGGESTED_TAGS,
  GET_SUGGESTED_TAGS_SUCCESS,
  GET_SUGGESTED_TAGS_ERROR,
  GET_EXISTING_TAGS,
  GET_EXISTING_TAGS_SUCCESS,
  GET_EXISTING_TAGS_ERROR,
} from '../constants';

describe('Tags actions', () => {
  it('GET_SUGGESTED_TAGS', () => {
    const obj = { communityId: '10', loadMore: true, sorting: 'id' };

    const expected = {
      type: GET_SUGGESTED_TAGS,
      communityId: obj.communityId,
      sorting: obj.sorting,
      loadMore: obj.loadMore,
    };

    expect(getSuggestedTags(obj)).toEqual(expected);
  });

  it('GET_SUGGESTED_TAGS_SUCCESS', () => {
    const suggestedTags = [];
    const loadMore = false;

    const expected = {
      type: GET_SUGGESTED_TAGS_SUCCESS,
      suggestedTags,
      loadMore,
    };

    expect(getSuggestedTagsSuccess(suggestedTags, loadMore)).toEqual(expected);
  });

  it('GET_SUGGESTED_TAGS_ERROR', () => {
    const getSuggestedTagsError = 'getSuggestedTagsError';

    const expected = {
      type: GET_SUGGESTED_TAGS_ERROR,
      getSuggestedTagsError,
    };

    expect(getSuggestedTagsErr(getSuggestedTagsError)).toEqual(expected);
  });

  it('GET_EXISTING_TAGS', () => {
    const obj = {
      communityId: '10',
      loadMore: true,
      sorting: 'id',
      text: 'text',
    };

    const expected = {
      type: GET_EXISTING_TAGS,
      communityId: obj.communityId,
      sorting: obj.sorting,
      loadMore: obj.loadMore,
      text: obj.text,
    };

    expect(getExistingTags(obj)).toEqual(expected);
  });

  it('GET_EXISTING_TAGS_SUCCESS', () => {
    const existingTags = [];
    const loadMore = false;

    const expected = {
      type: GET_EXISTING_TAGS_SUCCESS,
      existingTags,
      loadMore,
    };

    expect(getExistingTagsSuccess(existingTags, loadMore)).toEqual(expected);
  });

  it('GET_EXISTING_TAGS_ERROR', () => {
    const getExistingTagsError = 'getExistingTagsError';

    const expected = {
      type: GET_EXISTING_TAGS_ERROR,
      getExistingTagsError,
    };

    expect(getExistingTagsErr(getExistingTagsError)).toEqual(expected);
  });
});
