import {
  getExistingTags,
  getExistingTagsSuccess,
  getExistingTagsErr,
} from '../actions';

import {
  GET_EXISTING_TAGS,
  GET_EXISTING_TAGS_SUCCESS,
  GET_EXISTING_TAGS_ERROR,
} from '../constants';

describe('Tags actions', () => {
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
