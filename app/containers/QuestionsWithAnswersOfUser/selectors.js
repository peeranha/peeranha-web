import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the questionsOfUser state domain
 */

const selectQuestionsWithAnswersOfUserDomain = state =>
  state.get('questionsWithAnswersOfUser', initialState);

const selectQuestionsWithUserAnswers = () =>
  createSelector(selectQuestionsWithAnswersOfUserDomain, substate => {
    let sortedQuestByAnswDate = [...substate.toJS().questionsWithUserAnswers];
    // sort user activity answers by post time
    if (sortedQuestByAnswDate.length > 1) {
      sortedQuestByAnswDate = sortedQuestByAnswDate.sort((quest1, quest2) => {
        const asnwDate1 = quest1.answers.find(el => el.id === quest1.answerId)
          .postTime;
        const asnwDate2 = quest2.answers.find(el => el.id === quest2.answerId)
          .postTime;

        return asnwDate2 - asnwDate1;
      });
    }
    return sortedQuestByAnswDate;
  });

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
