import { fromJS } from 'immutable';
import followCommunityButtonReducer from '../reducer';

describe('followCommunityButtonReducer', () => {
  it('returns the initial state', () => {
    expect(followCommunityButtonReducer(undefined, {})).toEqual(fromJS({}));
  });
});
