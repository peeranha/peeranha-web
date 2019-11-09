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
  GET_UNIQ_QUESTIONS,
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
          uniqBy(state.toJS().questionsList.concat(questionsList), 'id'),
        )
        .set(
          'isLastFetch',
          questionsList.length < initialState.get('nextLoadedItems'),
        );
    case GET_QUESTIONS_ERROR:
      return state
        .set('questionsLoading', false)
        .set('questionsError', questionsError);

    case GET_UNIQ_QUESTIONS:
      return state.set(
        'questionsList',
        uniqBy(questionsList.concat(state.toJS().questionsList), 'id'),
      );

    default:
      return state;
  }
}

export default questionsReducer;
