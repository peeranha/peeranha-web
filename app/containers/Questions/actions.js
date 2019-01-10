/*
 *
 * Questions actions
 *
 */

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  SET_DEFAULT_REDUCER,
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
} from './constants';

/*
 *
 * getInitQuestions actions
 *
 */

export function getQuestions(
  limit,
  offset,
  communityIdFilter,
  parentPage,
  next,
) {
  return {
    type: GET_QUESTIONS,
    limit,
    offset,
    communityIdFilter,
    parentPage,
    next,
  };
}

export function getQuestionsSuccess(questionsList, followedCommunities, next) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    questionsList,
    followedCommunities,
    next,
  };
}

export function getQuestionsError(questionsError) {
  return {
    type: GET_QUESTIONS_ERROR,
    questionsError,
  };
}

/*
 *
 * subscribedHandler actions
 *
 */

export function followHandler(communityIdFilter, isFollowed) {
  return {
    type: FOLLOW_HANDLER,
    communityIdFilter,
    isFollowed,
  };
}

export function followHandlerSuccess(followedCommunities) {
  return {
    type: FOLLOW_HANDLER_SUCCESS,
    followedCommunities,
  };
}

export function followHandlerErr(followHandlerError) {
  return {
    type: FOLLOW_HANDLER_ERROR,
    followHandlerError,
  };
}

/*
 *
 * setDefaultReducer actions
 *
 */

export function setDefaultReducer() {
  return {
    type: SET_DEFAULT_REDUCER,
  };
}
