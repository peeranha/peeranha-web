/*
 *
 * QuestionsOfUser actions
 *
 */

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  RESET_STORE,
} from './constants';

export function getQuestions(userId) {
  return {
    type: GET_QUESTIONS,
    userId,
  };
}

export function getQuestionsSuccess(questions) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    questions,
  };
}

export function getQuestionsErr(getQuestionsError) {
  return {
    type: GET_QUESTIONS_ERROR,
    getQuestionsError,
  };
}

export function resetStore() {
  return {
    type: RESET_STORE,
  };
}
