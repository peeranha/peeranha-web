import { fromJS } from 'immutable';
import logoutReducer from '../reducer';

describe('logoutReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(logoutReducer(state, {})).toEqual(state);
  });
});
