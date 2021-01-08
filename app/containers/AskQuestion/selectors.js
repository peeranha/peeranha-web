import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the askQuestion state domain
 */

const selectAskQuestionDomain = state =>
  state.get('askQuestionReducer', initialState);

const selectExistingQuestionsDomain = state =>
  state.get('existingQuestionReducer', initialState);

const selectQuestionData = () =>
  createSelector(selectAskQuestionDomain, substate =>
    substate.get('questionData'),
  );

const selectAskQuestionLoading = () =>
  createSelector(selectAskQuestionDomain, substate =>
    substate.get('askQuestionLoading'),
  );

const selectQuestionError = () =>
  createSelector(selectAskQuestionDomain, substate =>
    substate.get('questionError'),
  );

const selectExistingQuestions = () =>
  createSelector(selectExistingQuestionsDomain, substate =>
    substate.toJS().existingQuestions,
  );

export {
  selectAskQuestionDomain,
  selectQuestionData,
  selectAskQuestionLoading,
  selectQuestionError,
  selectExistingQuestions,
};
