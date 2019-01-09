/*
 *
 * Questions actions
 *
 */

import {
  GET_INIT_QUESTIONS,
  GET_INIT_QUESTIONS_SUCCESS,
  GET_INIT_QUESTIONS_ERROR,
  GET_NEXT_QUESTIONS,
  GET_NEXT_QUESTIONS_SUCCESS,
  GET_NEXT_QUESTIONS_ERROR,
  SET_DEFAULT_REDUCER,
} from './constants';

/*
 *
 * getInitQuestions actions
 *
 */

export function getInitQuestions(limit, offset, communityIdFilter) {
  return {
    type: GET_INIT_QUESTIONS,
    limit,
    offset,
    communityIdFilter,
  };
}

export function getInitQuestionsSuccess(questionsList) {
  return {
    type: GET_INIT_QUESTIONS_SUCCESS,
    questionsList,
  };
}

export function getInitQuestionsError(questionsError) {
  return {
    type: GET_INIT_QUESTIONS_ERROR,
    questionsError,
  };
}

/*
 *
 * getInitQuestions actions
 *
 */

export function getNextQuestions(limit, offset, communityIdFilter) {
  return {
    type: GET_NEXT_QUESTIONS,
    limit,
    offset,
    communityIdFilter,
  };
}

export function getNextQuestionsSuccess(questionsList) {
  return {
    type: GET_NEXT_QUESTIONS_SUCCESS,
    questionsList,
  };
}

export function getNextQuestionsError(questionsError) {
  return {
    type: GET_NEXT_QUESTIONS_ERROR,
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
