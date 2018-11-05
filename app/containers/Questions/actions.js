/*
 *
 * Questions actions
 *
 */

import {
  GET_QUESTIONS_LIST,
  GET_QUESTIONS_LIST_SUCCESS,
  GET_QUESTIONS_LIST_ERROR,
} from './constants';

/*
 *
 * getQuestionsList actions
 *
 */

export function getQuestionsList(limit) {
  return {
    type: GET_QUESTIONS_LIST,
    limit,
  };
}

export function getQuestionsListSuccess(questionsList) {
  return {
    type: GET_QUESTIONS_LIST_SUCCESS,
    questionsList,
  };
}

export function getQuestionsListError(questionsError) {
  return {
    type: GET_QUESTIONS_LIST_ERROR,
    questionsError,
  };
}
