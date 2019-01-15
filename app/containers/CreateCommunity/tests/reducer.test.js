import { fromJS } from 'immutable';
import createCommunityReducer from '../reducer';

describe('createCommunityReducer', () => {
  it('returns the initial state', () => {
    expect(createCommunityReducer(undefined, {})).toEqual(fromJS({}));
  });
});
