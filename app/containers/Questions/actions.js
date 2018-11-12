/*
 *
 * Questions actions
 *
 */

import {
  GET_QUESTIONS_LIST,
  GET_QUESTIONS_LIST_SUCCESS,
  GET_QUESTIONS_LIST_ERROR,
  SET_DEFAULT_REDUCER,
} from './constants';

/*
 *
 * getQuestionsList actions
 *
 */

export function getQuestionsList(limit, offset) {
  return {
    type: GET_QUESTIONS_LIST,
    limit,
    offset,
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

/*
 *
 * setDefaultReducer actions
 *
 */

export function setDefaultReducer() {
  return {
    type: SET_DEFAULT_REDUCER,
  };
}
