import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewQuestion state domain
 */

const selectViewQuestionDomain = state =>
  state.get('viewQuestion', initialState);

const selectQuestionData = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('questionData'),
  );

const selectQuestionDataError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('getQuestionDataError'),
  );

const selectQuestionDataLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('questionDataLoading'),
  );

export {
  selectViewQuestionDomain,
  selectQuestionData,
  selectQuestionDataError,
  selectQuestionDataLoading,
};
