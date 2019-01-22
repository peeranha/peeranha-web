import { fromJS } from 'immutable';
import createTagReducer from '../reducer';

describe('createTagReducer', () => {
  it('returns the initial state', () => {
    expect(createTagReducer(undefined, {})).toEqual(fromJS({}));
  });
});
