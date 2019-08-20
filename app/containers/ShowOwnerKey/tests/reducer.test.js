import { fromJS } from 'immutable';
import showOwnerKeyReducer from '../reducer';

describe('showOwnerKeyReducer', () => {
  it('returns the initial state', () => {
    expect(showOwnerKeyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
