import { fromJS } from 'immutable';

import {
  selectQuestionsOfUserDomain,
  selectQuestions,
  selectQuestionsLoading,
  selectGetQuestionsError,
  selectIsLastFetch,
  selectNumber,
} from '../selectors';

describe('selectQuestionsOfUserDomain', () => {
  const questions = [];
  const questionsLoading = false;
  const getQuestionsError = 'getQuestionsError';
  const isLastFetch = false;
  const number = 10;

  const globalState = fromJS({
    questions,
    questionsLoading,
    getQuestionsError,
    isLastFetch,
    number,
  });

  const mockedState = fromJS({
    questionsOfUser: globalState,
  });

  it('should select the global state', () => {
    expect(selectQuestionsOfUserDomain(mockedState)).toEqual(globalState);
  });

  it('selectQuestions', () => {
    const isSelectQuestions = selectQuestions();
    expect(isSelectQuestions(mockedState)).toEqual(questions);
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
