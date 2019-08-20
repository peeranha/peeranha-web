import { fromJS } from 'immutable';
import changeEmailReducer from '../reducer';

describe('changeEmailReducer', () => {
  it('returns the initial state', () => {
    expect(changeEmailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
