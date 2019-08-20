import { fromJS } from 'immutable';
import showActiveKeyReducer from '../reducer';

describe('showActiveKeyReducer', () => {
  it('returns the initial state', () => {
    expect(showActiveKeyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
