import { fromJS } from 'immutable';
import accountInitializerReducer from '../reducer';

describe('accountInitializerReducer', () => {
  it('returns the initial state', () => {
    expect(accountInitializerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
