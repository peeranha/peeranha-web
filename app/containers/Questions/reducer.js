/* eslint indent: 0 */
import { fromJS } from 'immutable';
import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  GET_UNIQ_QUESTIONS,
  SET_TYPE_FILTER,
  SET_CREATED_FILTER,
} from './constants';

export const initialState = fromJS({
  initLoadedItems: 25,
  nextLoadedItems: 10,
  questionsLoading: false,
  questionsList: [],
  questionsError: '',
  isLastFetch: false,
  typeFilter: null,
  createdFilter: null,
});

// TODO: test
function questionsReducer(state = initialState, action) {
  const { type, questionsList, questionsError, toUpdateQuestions, typeFilter, createdFilter } = action;

  switch (type) {
    case SET_TYPE_FILTER:
      return state.set('typeFilter', typeFilter);
    case SET_CREATED_FILTER:
      return state.set('createdFilter', createdFilter);

    case GET_QUESTIONS:
      return state.set('questionsLoading', true);
    case GET_QUESTIONS_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set(
          'questionsList',
          toUpdateQuestions
            ? questionsList
            : orderBy(uniqBy(state.toJS().questionsList.concat(questionsList), 'id'), ['id'], ['asc']),
        )
        .set('isLastFetch', questionsList.length < initialState.get('nextLoadedItems'));
    case GET_QUESTIONS_ERROR:
      return state.set('questionsLoading', false).set('questionsError', questionsError);

    case GET_UNIQ_QUESTIONS:
      return state.set(
        'questionsList',
        orderBy(uniqBy(questionsList.concat(state.toJS().questionsList), 'id'), ['id'], ['asc']).filter(
          x => !x.isDeleted,
        ),
      );

    default:
      return state;
  }
}

export default questionsReducer;
