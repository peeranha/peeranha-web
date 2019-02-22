import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsErr,
  resetStore,
} from '../actions';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  RESET_STORE,
} from '../constants';

describe('getQuestions actions', () => {
  it('GET_QUESTIONS', () => {
    const userId = 'userId';
    const expected = {
      type: GET_QUESTIONS,
      userId,
    };

    expect(getQuestions(userId)).toEqual(expected);
  });

  it('GET_QUESTIONS_SUCCESS', () => {
    const questionsWithUserAnswers = 'questionsWithUserAnswers';
    const expected = {
      type: GET_QUESTIONS_SUCCESS,
      questionsWithUserAnswers,
    };

    expect(getQuestionsSuccess(questionsWithUserAnswers)).toEqual(expected);
  });

  it('GET_QUESTIONS_ERROR', () => {
    const getQuestionsError = 'getQuestionsError';
    const expected = {
      type: GET_QUESTIONS_ERROR,
      getQuestionsError,
    };

    expect(getQuestionsErr(getQuestionsError)).toEqual(expected);
  });

  it('RESET_STORE', () => {
    const expected = {
      type: RESET_STORE,
    };

    expect(resetStore()).toEqual(expected);
  });
});
