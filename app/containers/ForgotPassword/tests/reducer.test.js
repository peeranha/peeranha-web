import { fromJS } from 'immutable';
import forgotPasswordReducer from '../reducer';

describe('forgotPasswordReducer', () => {
  it('returns the initial state', () => {
    expect(forgotPasswordReducer(undefined, {})).toEqual(fromJS({}));
  });
});
