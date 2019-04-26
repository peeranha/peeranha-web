import { fromJS } from 'immutable';
import voteForNewTagButtonReducer from '../reducer';

describe('voteForNewTagButtonReducer', () => {
  it('returns the initial state', () => {
    expect(voteForNewTagButtonReducer(undefined, {})).toEqual(fromJS({}));
  });
});
