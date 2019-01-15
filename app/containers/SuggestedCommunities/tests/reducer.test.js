import { fromJS } from 'immutable';
import suggestedCommunitiesReducer from '../reducer';

describe('suggestedCommunitiesReducer', () => {
  it('returns the initial state', () => {
    expect(suggestedCommunitiesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
