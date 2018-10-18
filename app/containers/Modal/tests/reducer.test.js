import { fromJS } from 'immutable';
import modalReducer from '../reducer';

describe('modalReducer', () => {
  it('returns the initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(fromJS({}));
  });
});
