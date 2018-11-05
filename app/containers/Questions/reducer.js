/*
 *
 * Questions reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_QUESTIONS_LIST,
  GET_QUESTIONS_LIST_SUCCESS,
  GET_QUESTIONS_LIST_ERROR,
} from './constants';

export const initialState = fromJS({
  questionsLoading: false,
  questionsList: [],
  questionsError: '',
});

function questionsReducer(state = initialState, action) {
  const { type, questionsList, questionsError } = action;

  switch (type) {
    case GET_QUESTIONS_LIST:
      return state.set('questionsLoading', true);
    case GET_QUESTIONS_LIST_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set('questionsList', questionsList);
    case GET_QUESTIONS_LIST_ERROR:
      return state
        .set('questionsLoading', false)
        .set('questionsError', questionsError);
    default:
      return state;
  }
}

export default questionsReducer;
