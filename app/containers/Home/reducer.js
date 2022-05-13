/* eslint indent: 0 */
import { fromJS } from 'immutable';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
  GET_COMMUNITY,
  GET_COMMUNITY_ERROR,
  GET_COMMUNITY_SUCCESS,
  GET_LOGO,
  GET_LOGO_ERROR,
  GET_LOGO_SUCCESS,
} from './constants';

export const initialState = fromJS({
  questionsLoading: true,
  questions: [],
  questionsError: '',
  community: {},
  communityError: '',
  logo: '',
  logoError: '',
});

// TODO: test
function homeReducer(state = initialState, action) {
  const {
    type,
    questions,
    questionsError,
    community,
    communityError,
    logo,
    logoError,
  } = action;

  switch (type) {
    case GET_QUESTIONS:
      return state.set('questionsLoading', true);
    case GET_QUESTIONS_SUCCESS:
      return state.set('questionsLoading', false).set('questions', questions);
    case GET_QUESTIONS_ERROR:
      return state
        .set('questionsLoading', false)
        .set('questionsError', questionsError);

    case GET_COMMUNITY:
      return state.set('communityLoading', true);
    case GET_COMMUNITY_SUCCESS:
      return state.set('communityLoading', false).set('community', community);
    case GET_COMMUNITY_ERROR:
      return state
        .set('communityLoading', false)
        .set('communityError', communityError);

    case GET_LOGO:
      return state.set('logoLoading', true);
    case GET_LOGO_SUCCESS:
      return state.set('logoLoading', false).set('logo', logo);
    case GET_LOGO_ERROR:
      return state.set('logoLoading', false).set('logoError', logoError);

    default:
      return state;
  }
}

export default homeReducer;
