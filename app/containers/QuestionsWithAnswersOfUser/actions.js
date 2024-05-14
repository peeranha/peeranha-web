import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_ERROR,
  UNBAN_USER,
  UNBAN_USER_SUCCESS,
  UNBAN_USER_ERROR,
} from './constants';

export function getQuestions(userId, init) {
  return {
    type: GET_QUESTIONS,
    userId,
    init,
  };
}

export function getQuestionsSuccess(questionsWithUserAnswers) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    questionsWithUserAnswers,
  };
}

export function getQuestionsErr(getQuestionsError) {
  return {
    type: GET_QUESTIONS_ERROR,
    getQuestionsError,
  };
}

export function banUser({ buttonId, user, communityId }) {
  return {
    type: BAN_USER,
    buttonId,
    user,
    communityId,
  };
}

export function banUserSuccess() {
  return {
    type: BAN_USER_SUCCESS,
  };
}

export function banUserError(banUserError) {
  return {
    type: BAN_USER_ERROR,
    banUserError,
  };
}

export function unbanUser({ buttonId, user, communityId }) {
  return {
    type: UNBAN_USER,
    buttonId,
    user,
    communityId,
  };
}

export function unbanUserSuccess() {
  return {
    type: UNBAN_USER_SUCCESS,
  };
}

export function unbanUserError(unbanUserError) {
  return {
    type: UNBAN_USER_ERROR,
    unbanUserError,
  };
}
