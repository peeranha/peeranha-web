/*
 *
 * Questions actions
 *
 */

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  SET_DEFAULT_REDUCER,
} from './constants';

/*
 *
 * getInitQuestions actions
 *
 */

export function getQuestions(
  limit,
  offset,
  communityIdFilter,
  parentPage,
  fetcher,
  next,
) {
  return {
    type: GET_QUESTIONS,
    limit,
    offset,
    communityIdFilter,
    parentPage,
    fetcher,
    next,
  };
}

export function getQuestionsSuccess(questionsList, next) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    questionsList,
    next,
  };
}

export function getQuestionsError(questionsError) {
  return {
    type: GET_QUESTIONS_ERROR,
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
