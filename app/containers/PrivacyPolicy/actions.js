/*
 *
 * PrivacyPolicy actions
 *
 */

import {
  GET_PRIVACY_POLICY,
  GET_PRIVACY_POLICY_SUCCESS,
  GET_PRIVACY_POLICY_ERROR,
} from './constants';

export function getPrivacyPolicy() {
  return {
    type: GET_PRIVACY_POLICY,
  };
}

export function getPrivacyPolicySuccess(privacyPolicy) {
  return {
    type: GET_PRIVACY_POLICY_SUCCESS,
    privacyPolicy,
  };
}

export function getPrivacyPolicyErr(getPrivacyPolicyError) {
  return {
    type: GET_PRIVACY_POLICY_ERROR,
    getPrivacyPolicyError,
  };
}
