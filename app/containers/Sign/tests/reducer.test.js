import { fromJS } from 'immutable';
import signReducer from '../reducer';

describe('signReducer', () => {
  it('returns the initial state', () => {
    expect(signReducer(undefined, {})).toEqual(fromJS({}));
  });
});
