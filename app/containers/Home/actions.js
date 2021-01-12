import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from './constants';

export function getQuestions() {
  return {
    type: GET_QUESTIONS,
  };
}

export function getQuestionsSuccess(
  questions,
) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    questions,
  };
}

export function getQuestionsError(questionsError) {
  return {
    type: GET_QUESTIONS_ERROR,
    questionsError,
  };
}