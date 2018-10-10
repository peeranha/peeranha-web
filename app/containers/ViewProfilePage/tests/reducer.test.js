import { fromJS } from 'immutable';
import viewProfilePageReducer from '../reducer';

describe('viewProfilePageReducer', () => {
  it('returns the initial state', () => {
    expect(viewProfilePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
