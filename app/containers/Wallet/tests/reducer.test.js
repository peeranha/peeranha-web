import { fromJS } from 'immutable';
import walletReducer from '../reducer';

describe('walletReducer', () => {
  it('returns the initial state', () => {
    expect(walletReducer(undefined, {})).toEqual(fromJS({}));
  });
});
