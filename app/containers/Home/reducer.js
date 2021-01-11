/* eslint indent: 0 */
import { fromJS } from 'immutable';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
} from './constants';

export const initialState = fromJS({
  questionsLoading: true,
  questions: [],
  questionsError: '',
});

// TODO: test
function homeReducer(state = initialState, action) {
  const {
    type,
    questions,
  } = action;

  switch (type) {
    case GET_QUESTIONS:
      return state.set('questionsLoading', true);
    case GET_QUESTIONS_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set('questions', questions);
    case GET_QUESTIONS_ERROR:
      return state
        .set('questionsLoading', false)
        .set('questionsError', questionsError);

    default:
      return state;
  }
}

export default homeReducer;
