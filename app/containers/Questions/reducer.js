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
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
} from './constants';

export const initialState = fromJS({
  initLoadedItems: 25,
  nextLoadedItems: 10,
  questionsLoading: false,
  questionsList: [],
  questionsError: '',
  isLastFetch: false,
  communityIdFilter: 0,
  followedCommunities: null,
  followHandlerLoading: false,
  followHandlerError: null,
});

function questionsReducer(state = initialState, action) {
  const {
    type,
    questionsList,
    questionsError,
    communityIdFilter,
    followedCommunities,
    followHandlerError,
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
        .set('followedCommunities', followedCommunities)
        .set(
          'isLastFetch',
          questionsList.length < initialState.get('nextLoadedItems'),
        );
    case GET_QUESTIONS_ERROR:
      return state
        .set('questionsLoading', false)
        .set('questionsError', questionsError);

    case FOLLOW_HANDLER:
      return state.set('followHandlerLoading', true);
    case FOLLOW_HANDLER_SUCCESS:
      return state
        .set('followHandlerLoading', false)
        .set('followedCommunities', followedCommunities);
    case FOLLOW_HANDLER_ERROR:
      return state
        .set('followHandlerLoading', false)
        .set('followHandlerError', followHandlerError);

    case SET_DEFAULT_REDUCER:
      return initialState;

    default:
      return state;
  }
}

export default questionsReducer;
