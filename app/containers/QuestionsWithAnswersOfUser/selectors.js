import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the questionsOfUser state domain
 */

const selectQuestionsWithAnswersOfUserDomain = state =>
  state.get('questionsWithAnswersOfUser', initialState);

const selectQuestionsWithUserAnswers = () =>
  createSelector(
    selectQuestionsWithAnswersOfUserDomain,
    substate => substate.toJS().questionsWithUserAnswers,
  );

const selectNumber = () =>
  createSelector(
    selectQuestionsWithAnswersOfUserDomain,
    substate => substate.toJS().number,
  );

const selectQuestionsLoading = () =>
  createSelector(
    selectQuestionsWithAnswersOfUserDomain,
    substate => substate.toJS().questionsLoading,
  );

const selectGetQuestionsError = () =>
  createSelector(
    selectQuestionsWithAnswersOfUserDomain,
    substate => substate.toJS().getQuestionsError,
  );

const selectIsLastFetch = () =>
  createSelector(
    selectQuestionsWithAnswersOfUserDomain,
    substate => substate.toJS().isLastFetch,
  );

export {
  selectQuestionsWithAnswersOfUserDomain,
  selectQuestionsWithUserAnswers,
  selectQuestionsLoading,
  selectGetQuestionsError,
  selectIsLastFetch,
  selectNumber,
};
