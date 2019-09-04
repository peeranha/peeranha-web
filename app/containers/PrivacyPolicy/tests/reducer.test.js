import { fromJS } from 'immutable';
import privacyPolicyReducer from '../reducer';

describe('privacyPolicyReducer', () => {
  it('returns the initial state', () => {
    expect(privacyPolicyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
