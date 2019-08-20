import { fromJS } from 'immutable';
import deleteAccountReducer from '../reducer';

describe('deleteAccountReducer', () => {
  it('returns the initial state', () => {
    expect(deleteAccountReducer(undefined, {})).toEqual(fromJS({}));
  });
});
