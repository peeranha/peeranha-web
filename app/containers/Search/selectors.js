import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSearchDomain = state => state.get('search', initialState).toJS();

const selectItems = () =>
  createSelector(selectSearchDomain, substate => substate.items);

const selectGetResultsProcessing = () =>
  createSelector(selectSearchDomain, substate => substate.getResultsProcessing);

const selectGetResultsError = () =>
  createSelector(selectSearchDomain, substate => substate.getResultsError);

export {
  selectSearchDomain,
  selectItems,
  selectGetResultsProcessing,
  selectGetResultsError,
};
