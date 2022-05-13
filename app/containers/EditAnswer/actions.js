/*
 *
 * EditAnswer actions
 *
 */

import {
  EDIT_ANSWER,
  EDIT_ANSWER_ERROR,
  EDIT_ANSWER_SUCCESS,
  GET_ANSWER,
  GET_ANSWER_ERROR,
  GET_ANSWER_SUCCESS,
  REDIRECT_TO_EDIT_ANSWER_PAGE,
} from './constants';

export function getAnswer(questionId, answerId) {
  return {
    type: GET_ANSWER,
    questionId,
    answerId,
  };
}

export const getAnswerSuccess = (answer) => ({
  type: GET_ANSWER_SUCCESS,
  answer,
});

export function getAnswerErr(getAnswerError) {
  return {
    type: GET_ANSWER_ERROR,
    getAnswerError,
  };
}

export function editAnswer(answer, questionId, answerId, official) {
  return {
    type: EDIT_ANSWER,
    answer,
    questionId,
    answerId,
    official,
  };
}

export function editAnswerSuccess(questionData) {
  return {
    type: EDIT_ANSWER_SUCCESS,
    questionData,
  };
}

export function editAnswerErr(editAnswerError) {
  return {
    type: EDIT_ANSWER_ERROR,
    editAnswerError,
  };
}

// TODO: test
export function redirectToEditAnswerPage(ev) {
  return {
    type: REDIRECT_TO_EDIT_ANSWER_PAGE,
    buttonId: ev.currentTarget.id,
    link: ev.currentTarget.dataset.link,
  };
}
