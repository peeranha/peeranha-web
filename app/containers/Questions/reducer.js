/*
 *
 * Questions reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_INIT_QUESTIONS,
  GET_INIT_QUESTIONS_SUCCESS,
  GET_INIT_QUESTIONS_ERROR,
  GET_NEXT_QUESTIONS,
  GET_NEXT_QUESTIONS_SUCCESS,
  GET_NEXT_QUESTIONS_ERROR,
  SET_DEFAULT_REDUCER,
} from './constants';

export const initialState = fromJS({
  initLoadedItems: 25,
  nextLoadedItems: 10,
  questionsLoading: false,
  questionsList: [],
  questionsError: '',
  isLastFetch: false,
  communityIdFilter: 0,
});

function questionsReducer(state = initialState, action) {
  const { type, questionsList, questionsError, communityIdFilter } = action;

  switch (type) {
    case GET_INIT_QUESTIONS:
      return state
        .set('questionsLoading', true)
        .set('communityIdFilter', communityIdFilter);
    case GET_NEXT_QUESTIONS:
      return state.set('questionsLoading', true);
    case GET_INIT_QUESTIONS_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set('questionsList', questionsList)
        .set(
          'isLastFetch',
          questionsList.length < initialState.get('nextLoadedItems'),
        );
    case GET_NEXT_QUESTIONS_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set('questionsList', state.get('questionsList').concat(questionsList))
        .set(
          'isLastFetch',
          questionsList.length < initialState.get('nextLoadedItems'),
        );
    case GET_INIT_QUESTIONS_ERROR:
    case GET_NEXT_QUESTIONS_ERROR:
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
