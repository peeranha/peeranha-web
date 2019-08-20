import { fromJS } from 'immutable';
import changePasswordByPreviousReducer from '../reducer';

describe('changePasswordByPreviousReducer', () => {
  it('returns the initial state', () => {
    expect(changePasswordByPreviousReducer(undefined, {})).toEqual(fromJS({}));
  });
});
