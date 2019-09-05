import {
  getPrivacyPolicy,
  getPrivacyPolicySuccess,
  getPrivacyPolicyErr,
} from '../actions';

import {
  GET_PRIVACY_POLICY,
  GET_PRIVACY_POLICY_SUCCESS,
  GET_PRIVACY_POLICY_ERROR,
} from '../constants';

describe('PrivacyPolicy actions', () => {
  it('getPrivacyPolicy', () => {
    const expected = {
      type: GET_PRIVACY_POLICY,
    };

    expect(getPrivacyPolicy()).toEqual(expected);
  });

  it('getPrivacyPolicySuccess', () => {
    const privacyPolicy = {};
    const expected = {
      type: GET_PRIVACY_POLICY_SUCCESS,
      privacyPolicy,
    };

    expect(getPrivacyPolicySuccess(privacyPolicy)).toEqual(expected);
  });

  it('getPrivacyPolicyErr', () => {
    const getPrivacyPolicyError = 'getPrivacyPolicyError';
    const expected = {
      type: GET_PRIVACY_POLICY_ERROR,
      getPrivacyPolicyError,
    };

    expect(getPrivacyPolicyErr(getPrivacyPolicyError)).toEqual(expected);
  });
});
