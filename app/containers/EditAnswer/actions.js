/*
 *
 * EditAnswer actions
 *
 */

import {
  GET_ANSWER,
  GET_ANSWER_SUCCESS,
  GET_ANSWER_ERROR,
  EDIT_ANSWER,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_ERROR,
} from './constants';

export function getAnswer(questionid, answerid) {
  return {
    type: GET_ANSWER,
    questionid,
    answerid,
  };
}

export function getAnswerSuccess(answer) {
  return {
    type: GET_ANSWER_SUCCESS,
    answer,
  };
}

export function getAnswerErr(getAnswerError) {
  return {
    type: GET_ANSWER_ERROR,
    getAnswerError,
  };
}

export function editAnswer(answer, questionid, answerid) {
  return {
    type: EDIT_ANSWER,
    answer,
    questionid,
    answerid,
  };
}

export function editAnswerSuccess(answer) {
  return {
    type: EDIT_ANSWER_SUCCESS,
    answer,
  };
}

export function editAnswerErr(editAnswerError) {
  return {
    type: EDIT_ANSWER_ERROR,
    editAnswerError,
  };
}
