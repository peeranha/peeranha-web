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
  SET_DEFAULT_REDUCER,
} from './constants';

export const initialState = fromJS({
  initLoadedItems: 25,
  nextLoadedItems: 10,
  questionsLoading: false,
  questionsList: [],
  questionsError: '',
  isLastFetch: false,
});

function questionsReducer(state = initialState, action) {
  const { type, questionsList, questionsError } = action;

  switch (type) {
    case GET_QUESTIONS_LIST:
      return state.set('questionsLoading', true);
    case GET_QUESTIONS_LIST_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set(
          'isLastFetch',
          questionsList.length < initialState.get('nextLoadedItems'),
        )
        .set('questionsList', state.get('questionsList').concat(questionsList));
    case GET_QUESTIONS_LIST_ERROR:
      return state
        .set('questionsLoading', false)
        .set('questionsError', questionsError);
    case SET_DEFAULT_REDUCER:
      return initialState;
    default:
      return state;
  }
}

export default questionsReducer;
