/*
 *
 * PrivacyPolicy reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_PRIVACY_POLICY,
  GET_PRIVACY_POLICY_SUCCESS,
  GET_PRIVACY_POLICY_ERROR,
} from './constants';

export const initialState = fromJS({
  privacyPolicy: null,
  getPrivacyPolicyProcessing: false,
  getPrivacyPolicyError: null,
});

function privacyPolicyReducer(state = initialState, action) {
  const { type, privacyPolicy, getPrivacyPolicyError } = action;

  switch (type) {
    case GET_PRIVACY_POLICY:
      return state.set('getPrivacyPolicyProcessing', true);
    case GET_PRIVACY_POLICY_SUCCESS:
      return state
        .set('getPrivacyPolicyProcessing', false)
        .set('privacyPolicy', privacyPolicy);
    case GET_PRIVACY_POLICY_ERROR:
      return state
        .set('getPrivacyPolicyProcessing', false)
        .set('getPrivacyPolicyError', getPrivacyPolicyError);

    default:
      return state;
  }
}

export default privacyPolicyReducer;
