import { fromJS } from 'immutable';
import suggestedTagsReducer from '../reducer';

describe('suggestedTagsReducer', () => {
  it('returns the initial state', () => {
    expect(suggestedTagsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
