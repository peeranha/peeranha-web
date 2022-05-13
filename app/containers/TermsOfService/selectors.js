import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTermsOfServiceDomain = (state) =>
  state.get('termsOfService', initialState).toJS();

const selectTerms = () =>
  createSelector(selectTermsOfServiceDomain, (substate) => substate.terms);

const selectGetTermsProcessing = () =>
  createSelector(
    selectTermsOfServiceDomain,
    (substate) => substate.getTermsProcessing,
  );

const selectGetTermsError = () =>
  createSelector(
    selectTermsOfServiceDomain,
    (substate) => substate.getTermsError,
  );

export {
  selectTermsOfServiceDomain,
  selectTerms,
  selectGetTermsProcessing,
  selectGetTermsError,
};
