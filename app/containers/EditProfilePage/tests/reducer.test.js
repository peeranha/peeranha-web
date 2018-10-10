import { fromJS } from 'immutable';
import editProfilePageReducer from '../reducer';

describe('editProfilePageReducer', () => {
  it('returns the initial state', () => {
    expect(editProfilePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
