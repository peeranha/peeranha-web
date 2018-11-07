import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the questions state domain
 */

const selectQuestionsDomain = state =>
  state.get('questionsReducer', initialState);

export const selectQuestionsLoading = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('questionsLoading'),
  );

export const selectQuestionsList = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('questionsList'),
  );

export const selectQuestionsError = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('questionsError'),
  );

export const selectInitLoadedItems = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('initLoadedItems'),
  );

export const selectNextLoadedItems = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('nextLoadedItems'),
  );

export const selectIsLastFetch = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('isLastFetch'),
  );

export { selectQuestionsDomain };
