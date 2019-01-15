/*
 *
 * Questions reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
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
  const {
    type,
    questionsList,
    questionsError,
    communityIdFilter,
    next,
  } = action;

  switch (type) {
    case GET_QUESTIONS:
      return state
        .set('questionsLoading', true)
        .set('communityIdFilter', communityIdFilter);
    case GET_QUESTIONS_SUCCESS:
      return state
        .set('questionsLoading', false)
        .set(
          'questionsList',
          !next
            ? questionsList
            : state.get('questionsList').concat(questionsList),
        )
        .set(
          'isLastFetch',
          questionsList.length < initialState.get('nextLoadedItems'),
        );
    case GET_QUESTIONS_ERROR:
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
