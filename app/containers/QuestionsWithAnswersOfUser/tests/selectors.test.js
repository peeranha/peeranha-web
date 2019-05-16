import { fromJS } from 'immutable';

import {
  selectQuestionsWithAnswersOfUserDomain,
  selectQuestionsWithUserAnswers,
  selectQuestionsLoading,
  selectGetQuestionsError,
  selectIsLastFetch,
  selectNumber,
} from '../selectors';

describe('selectQuestionsWithAnswersOfUserDomain', () => {
  const questionsWithUserAnswers = [];
  const questionsLoading = false;
  const getQuestionsError = 'getQuestionsError';
  const isLastFetch = false;
  const number = 10;

  const globalState = fromJS({
    questionsWithUserAnswers,
    questionsLoading,
    getQuestionsError,
    isLastFetch,
    number,
  });

  const mockedState = fromJS({
    questionsWithAnswersOfUser: globalState,
  });

  it('should select the global state', () => {
    expect(selectQuestionsWithAnswersOfUserDomain(mockedState)).toEqual(
      globalState,
    );
  });

  it('selectQuestionsWithUserAnswers', () => {
    const isSelectQuestionsWithUserAnswers = selectQuestionsWithUserAnswers();
    expect(isSelectQuestionsWithUserAnswers(mockedState)).toEqual(
      questionsWithUserAnswers,
    );
  });

  it('selectQuestionsLoading', () => {
    const isSelectQuestionsLoading = selectQuestionsLoading();
    expect(isSelectQuestionsLoading(mockedState)).toEqual(questionsLoading);
  });

  it('selectGetQuestionsError', () => {
    const isSelectGetQuestionsError = selectGetQuestionsError();
    expect(isSelectGetQuestionsError(mockedState)).toEqual(getQuestionsError);
  });

  it('selectIsLastFetch', () => {
    const isSelectIsLastFetch = selectIsLastFetch();
    expect(isSelectIsLastFetch(mockedState)).toEqual(isLastFetch);
  });

  it('selectNumber', () => {
    const isSelectNumber = selectNumber();
    expect(isSelectNumber(mockedState)).toEqual(number);
  });
});
