import { fromJS } from 'immutable';
import sendTokensReducer from '../reducer';

describe('sendTokensReducer', () => {
  it('returns the initial state', () => {
    expect(sendTokensReducer(undefined, {})).toEqual(fromJS({}));
  });
});
