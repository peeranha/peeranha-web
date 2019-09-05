import { fromJS } from 'immutable';
import privacyPolicyReducer from '../reducer';

import {
  getPrivacyPolicy,
  getPrivacyPolicySuccess,
  getPrivacyPolicyErr,
} from '../actions';

describe('privacyPolicyReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(privacyPolicyReducer(state, {})).toEqual(state);
  });

  it('getPrivacyPolicy', () => {
    const obj = state.set('getPrivacyPolicyProcessing', true);
    expect(privacyPolicyReducer(state, getPrivacyPolicy())).toEqual(obj);
  });

  it('getPrivacyPolicySuccess', () => {
    const privacyPolicy = {};
    const obj = state
      .set('getPrivacyPolicyProcessing', false)
      .set('privacyPolicy', privacyPolicy);

    expect(
      privacyPolicyReducer(state, getPrivacyPolicySuccess(privacyPolicy)),
    ).toEqual(obj);
  });

  it('getPrivacyPolicyErr', () => {
    const getPrivacyPolicyError = 'getPrivacyPolicyError';
    const obj = state
      .set('getPrivacyPolicyProcessing', false)
      .set('getPrivacyPolicyError', getPrivacyPolicyError);

    expect(
      privacyPolicyReducer(state, getPrivacyPolicyErr(getPrivacyPolicyError)),
    ).toEqual(obj);
  });
});
