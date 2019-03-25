/*
 *
 * EditQuestion reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_ASKED_QUESTION,
  GET_ASKED_QUESTION_SUCCESS,
  GET_ASKED_QUESTION_ERROR,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
} from './constants';

export const initialState = fromJS({
  question: null,
  questionLoading: false,
  getAskedQuestionError: null,
  editQuestionLoading: false,
  editQuestionError: null,
});

function editQuestionReducer(state = initialState, action) {
  const { type, question, getAskedQuestionError, editQuestionError } = action;

  switch (type) {
    case GET_ASKED_QUESTION:
      return state.set('questionLoading', true);
    case GET_ASKED_QUESTION_SUCCESS:
      return state.set('question', question).set('questionLoading', false);
    case GET_ASKED_QUESTION_ERROR:
      return state
        .set('getAskedQuestionError', getAskedQuestionError)
        .set('questionLoading', false);
    case EDIT_QUESTION:
      return state.set('editQuestionLoading', true);
    case EDIT_QUESTION_SUCCESS:
      return state.set('editQuestionLoading', false);
    case EDIT_QUESTION_ERROR:
      return state
        .set('editQuestionError', editQuestionError)
        .set('editQuestionLoading', false);
    default:
      return state;
  }
}

export default editQuestionReducer;
