/*
 *
 * AskQuestion reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
} from './constants';

export const initialState = fromJS({
  askQuestionLoading: false,
  questionError: '',
});

function askQuestionReducer(state = initialState, action) {
  const { type, questionError } = action;

  switch (type) {
    case ASK_QUESTION:
      return state.set('askQuestionLoading', true);
    case ASK_QUESTION_SUCCESS:
      return state.set('askQuestionLoading', false);
    case ASK_QUESTION_ERROR:
      return state
        .set('askQuestionLoading', false)
        .set('questionError', questionError);
    default:
      return state;
  }
}

export default askQuestionReducer;
