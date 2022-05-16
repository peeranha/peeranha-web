import { suggestTag, suggestTagSuccess, suggestTagErr } from '../actions';

import {
  SUGGEST_TAG,
  SUGGEST_TAG_SUCCESS,
  SUGGEST_TAG_ERROR,
} from '../constants';

describe('CreateTag actions', () => {
  it('suggestTag', () => {
    const tag = 'tag';
    const reset = 'reset';
    const communityId = 'communityId';
    const expected = {
      type: SUGGEST_TAG,
      communityId,
      tag,
      reset,
    };
    expect(suggestTag(communityId, tag, reset)).toEqual(expected);
  });

  it('suggestTagSuccess', () => {
    const expected = {
      type: SUGGEST_TAG_SUCCESS,
    };
    expect(suggestTagSuccess()).toEqual(expected);
  });

  it('suggestTagSuccess', () => {
    const suggestTagError = 'suggestTagError';
    const expected = {
      type: SUGGEST_TAG_ERROR,
      suggestTagError,
    };
    expect(suggestTagErr(suggestTagError)).toEqual(expected);
  });
});
