import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the questionsOfUser state domain
 */

const selectQuestionsOfUserDomain = state =>
  state.get('questionsOfUser', initialState);

const selectQuestions = () =>
  createSelector(
    selectQuestionsOfUserDomain,
    substate => substate.toJS().questions,
  );

const selectQuestionsLoading = () =>
  createSelector(
    selectQuestionsOfUserDomain,
    substate => substate.toJS().questionsLoading,
  );

const selectGetQuestionsError = () =>
  createSelector(
    selectQuestionsOfUserDomain,
    substate => substate.toJS().getQuestionsError,
  );

const selectIsLastFetch = () =>
  createSelector(
    selectQuestionsOfUserDomain,
    substate => substate.toJS().isLastFetch,
  );

const selectNumber = () =>
  createSelector(
    selectQuestionsOfUserDomain,
    substate => substate.toJS().number,
  );

export {
  selectQuestionsOfUserDomain,
  selectQuestions,
  selectQuestionsLoading,
  selectGetQuestionsError,
  selectIsLastFetch,
  selectNumber,
};
