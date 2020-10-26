import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the askQuestion state domain
 */

const selectAskQuestionDomain = state =>
  state.get('askQuestionReducer', initialState);

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
  createSelector(selectAskQuestionDomain, substate =>
    substate.get('existingQuestions'),
  );

export {
  selectAskQuestionDomain,
  selectQuestionData,
  selectAskQuestionLoading,
  selectQuestionError,
  selectExistingQuestions,
};
