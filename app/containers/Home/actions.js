import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  GET_COMMUNITY,
  GET_COMMUNITY_SUCCESS,
  GET_COMMUNITY_ERROR,
  GET_LOGO,
  GET_LOGO_SUCCESS,
  GET_LOGO_ERROR,
  REDIRECT_TO_EDIT_COMMUNITY_PAGE,
  FOLLOW_HANDLER,
} from './constants';

export function redirectToEditCommunityPage(id) {
  return {
    type: REDIRECT_TO_EDIT_COMMUNITY_PAGE,
    id,
  };
}

export function getQuestions(communityId) {
  return {
    type: GET_QUESTIONS,
    communityId,
  };
}

export function getQuestionsSuccess(questions) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    questions,
  };
}

export function getQuestionsError(questionsError) {
  return {
    type: GET_QUESTIONS_ERROR,
    questionsError,
  };
}

export function getCommunity(id) {
  return {
    type: GET_COMMUNITY,
    id,
  };
}

export function getCommunitySuccess(community) {
  return {
    type: GET_COMMUNITY_SUCCESS,
    community,
  };
}

export function getCommunityError(communityError) {
  return {
    type: GET_COMMUNITY_ERROR,
    communityError,
  };
}

export function getLogo() {
  return {
    type: GET_LOGO,
  };
}

export function getLogoSuccess(logo) {
  return {
    type: GET_LOGO_SUCCESS,
    logo,
  };
}

export function getLogoError(logoError) {
  return {
    type: GET_LOGO_ERROR,
    logoError,
  };
}

export function followHandler(communityIdFilter, isFollowed, buttonId) {
  return {
    type: FOLLOW_HANDLER,
    communityIdFilter,
    isFollowed,
    buttonId,
  };
}
