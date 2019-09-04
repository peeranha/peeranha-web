import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the privacyPolicy state domain
 */

const selectPrivacyPolicyDomain = state =>
  state.get('privacyPolicy', initialState).toJS();

const selectPrivacyPolicy = () =>
  createSelector(selectPrivacyPolicyDomain, substate => substate.privacyPolicy);

const selectPrivacyPolicyProcessing = () =>
  createSelector(
    selectPrivacyPolicyDomain,
    substate => substate.getPrivacyPolicyProcessing,
  );

const selectPrivacyPolicyError = () =>
  createSelector(
    selectPrivacyPolicyDomain,
    substate => substate.getPrivacyPolicyError,
  );

export {
  selectPrivacyPolicyDomain,
  selectPrivacyPolicy,
  selectPrivacyPolicyProcessing,
  selectPrivacyPolicyError,
};
