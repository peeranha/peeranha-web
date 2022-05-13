import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsErr,
} from '../actions';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
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
    const questions = 'questions';
    const expected = {
      type: GET_QUESTIONS_SUCCESS,
      questions,
    };

    expect(getQuestionsSuccess(questions)).toEqual(expected);
  });

  it('GET_QUESTIONS_ERROR', () => {
    const getQuestionsError = 'getQuestionsError';
    const expected = {
      type: GET_QUESTIONS_ERROR,
      getQuestionsError,
    };

    expect(getQuestionsErr(getQuestionsError)).toEqual(expected);
  });
});
