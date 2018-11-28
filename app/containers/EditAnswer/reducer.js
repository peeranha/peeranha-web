/*
 *
 * EditAnswer reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_ANSWER,
  GET_ANSWER_SUCCESS,
  GET_ANSWER_ERROR,
  EDIT_ANSWER,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_ERROR,
} from './constants';

export const initialState = fromJS({
  answer: null,
  getAnswerError: null,
  answerLoading: false,
  editAnswerError: null,
  editAnswerLoading: false,
});

function editAnswerReducer(state = initialState, action) {
  const { type, getAnswerError, answer, editAnswerError } = action;

  switch (type) {
    case GET_ANSWER:
      return state.set('answerLoading', true);
    case GET_ANSWER_SUCCESS:
      return state.set('answer', answer).set('answerLoading', false);
    case GET_ANSWER_ERROR:
      return state
        .set('getAnswerError', getAnswerError)
        .set('answerLoading', false);
    case EDIT_ANSWER:
      return state.set('editAnswerLoading', true);
    case EDIT_ANSWER_SUCCESS:
      return state.set('editAnswerLoading', false);
    case EDIT_ANSWER_ERROR:
      return state
        .set('editAnswerError', editAnswerError)
        .set('editAnswerLoading', false);
    default:
      return state;
  }
}

export default editAnswerReducer;
