/*
 *
 * Questions actions
 *
 */

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  GET_UNIQ_QUESTIONS,
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
  toUpdateQuestions,
) {
  return {
    type: GET_QUESTIONS,
    limit,
    offset,
    communityIdFilter,
    parentPage,
    fetcher,
    next,
    toUpdateQuestions,
  };
}

export function getQuestionsSuccess(questionsList, next, toUpdateQuestions) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    questionsList,
    next,
    toUpdateQuestions,
  };
}

export function getQuestionsError(questionsError) {
  return {
    type: GET_QUESTIONS_ERROR,
    questionsError,
  };
}

export function getUniqQuestions(questionsList) {
  return {
    type: GET_UNIQ_QUESTIONS,
    questionsList,
  };
}
