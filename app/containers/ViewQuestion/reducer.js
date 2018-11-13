/*
 *
 * ViewQuestion reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_QUESTION_DATA,
  GET_QUESTION_DATA_SUCCESS,
  GET_QUESTION_DATA_ERROR,
} from './constants';

export const initialState = fromJS({
  questionData: null,
  getQuestionDataError: null,
  questionDataLoading: false,
});

function viewQuestionReducer(state = initialState, action) {
  const { type, questionData, getQuestionDataError } = action;

  switch (type) {
    case GET_QUESTION_DATA:
      return state.set('questionDataLoading', true);
    case GET_QUESTION_DATA_SUCCESS:
      return state
        .set('questionDataLoading', false)
        .set('questionData', questionData);
    case GET_QUESTION_DATA_ERROR:
      return state
        .set('questionDataLoading', false)
        .set('getQuestionDataError', getQuestionDataError);
    default:
      return state;
  }
}

export default viewQuestionReducer;
