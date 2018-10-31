import { fromJS } from 'immutable';
import toastReducer from '../reducer';

describe('toastReducer', () => {
  it('returns the initial state', () => {
    expect(toastReducer(undefined, {})).toEqual(fromJS({}));
  });
});
