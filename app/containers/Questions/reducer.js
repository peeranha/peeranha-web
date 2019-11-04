/*
 *
 * Questions reducer
 *
 */

import { fromJS } from 'immutable';
import uniqBy from 'lodash/uniqBy';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
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
    case GET_QUESTIONS:
      return state.set('questionsLoading', true);
    case GET_QUESTIONS_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set(
          'questionsList',
          uniqBy(questionsList.concat(state.toJS().questionsList), 'id'),
        )
        .set(
          'isLastFetch',
          questionsList.length < initialState.get('nextLoadedItems'),
        );
    case GET_QUESTIONS_ERROR:
      return state
        .set('questionsLoading', false)
        .set('questionsError', questionsError);

    default:
      return state;
  }
}

export default questionsReducer;
