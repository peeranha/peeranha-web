import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from './constants';

export function getQuestions(userId, init) {
  return {
    type: GET_QUESTIONS,
    userId,
    init,
  };
}

export function getQuestionsSuccess(questionsWithUserAnswers) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    questionsWithUserAnswers,
  };
}

export function getQuestionsErr(getQuestionsError) {
  return {
    type: GET_QUESTIONS_ERROR,
    getQuestionsError,
  };
}
