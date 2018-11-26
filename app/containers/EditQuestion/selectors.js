import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editQuestion state domain
 */

const selectEditQuestionDomain = state =>
  state.get('editQuestion', initialState);

const selectQuestion = () =>
  createSelector(selectEditQuestionDomain, substate =>
    substate.get('question'),
  );

const selectQuestionLoading = () =>
  createSelector(selectEditQuestionDomain, substate =>
    substate.get('questionLoading'),
  );

const selectGetAskedQuestionError = () =>
  createSelector(selectEditQuestionDomain, substate =>
    substate.get('getAskedQuestionError'),
  );

const selectEditQuestionLoading = () =>
  createSelector(selectEditQuestionDomain, substate =>
    substate.get('editQuestionLoading'),
  );

const selectEditQuestionError = () =>
  createSelector(selectEditQuestionDomain, substate =>
    substate.get('editQuestionError'),
  );

export {
  selectQuestion,
  selectQuestionLoading,
  selectGetAskedQuestionError,
  selectEditQuestionLoading,
  selectEditQuestionError,
};
