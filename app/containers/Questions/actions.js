/*
 *
 * Questions actions
 *
 */

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  GET_UNIQ_QUESTIONS,
  SET_TYPE_FILTER,
  SET_CREATED_FILTER,
  CHANGE_QUESTION_FILTER,
  LOAD_COMMUNITY_TOP_QUESTIONS,
  LOAD_COMMUNITY_TOP_QUESTIONS_SUCCESS,
  LOAD_COMMUNITY_TOP_QUESTIONS_ERROR,
  ADD_TO_TOP_QUESTIONS,
  ADD_TO_TOP_QUESTIONS_SUCCESS,
  ADD_TO_TOP_QUESTIONS_ERROR,
  REMOVE_FROM_TOP_QUESTIONS,
  REMOVE_FROM_TOP_QUESTIONS_SUCCESS,
  REMOVE_FROM_TOP_QUESTIONS_ERROR,
  UP_QUESTION,
  UP_QUESTION_SUCCESS,
  UP_QUESTION_ERROR,
  DOWN_QUESTION,
  DOWN_QUESTION_SUCCESS,
  DOWN_QUESTION_ERROR,
  MOVE_QUESTION,
  MOVE_QUESTION_SUCCESS,
  MOVE_QUESTION_ERROR,
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
  fetcher,
  next,
  toUpdateQuestions,
) {
  return {
    type: GET_QUESTIONS,
    limit,
    offset,
    communityIdFilter,
    parentPage,
    fetcher,
    next,
    toUpdateQuestions,
  };
}

export function getQuestionsSuccess(
  questionsList,
  next,
  toUpdateQuestions,
  questionFilter = 0,
) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    questionsList,
    next,
    toUpdateQuestions,
    questionFilter,
  };
}

export function getQuestionsError(questionsError) {
  return {
    type: GET_QUESTIONS_ERROR,
    questionsError,
  };
}

export function getUniqQuestions(questionsList) {
  return {
    type: GET_UNIQ_QUESTIONS,
    questionsList,
  };
}

export function setTypeFilter(typeFilter) {
  return {
    type: SET_TYPE_FILTER,
    typeFilter,
  };
}

export function setCreatedFilter(createdFilter) {
  return {
    type: SET_CREATED_FILTER,
    createdFilter,
  };
}

export const changeQuestionFilter = questionFilter => ({
  type: CHANGE_QUESTION_FILTER,
  questionFilter,
});

export const loadTopCommunityQuestions = () => ({
  type: LOAD_COMMUNITY_TOP_QUESTIONS,
});

export const loadTopCommunityQuestionsSuccess = (
  topQuestions,
  questionFilter,
) => ({
  type: LOAD_COMMUNITY_TOP_QUESTIONS_SUCCESS,
  topQuestions,
  questionFilter,
});

export const loadTopCommunityQuestionsErr = loadTopCommunityQuestionsError => ({
  type: LOAD_COMMUNITY_TOP_QUESTIONS_ERROR,
  loadTopCommunityQuestionsError,
});

export const addToTopQuestions = id => ({
  type: ADD_TO_TOP_QUESTIONS,
  id,
});

export const addToTopQuestionsSuccess = id => ({
  type: ADD_TO_TOP_QUESTIONS_SUCCESS,
  id,
});

export const addToTopQuestionsErr = addToTopQuestionsError => ({
  type: ADD_TO_TOP_QUESTIONS_ERROR,
  addToTopQuestionsError,
});

export const removeFromTopQuestions = id => ({
  type: REMOVE_FROM_TOP_QUESTIONS,
  id,
});

export const removeFromTopQuestionsSuccess = id => ({
  type: REMOVE_FROM_TOP_QUESTIONS_SUCCESS,
  id,
});

export const removeFromTopQuestionsErr = removeFromTopQuestionsError => ({
  type: REMOVE_FROM_TOP_QUESTIONS_ERROR,
  removeFromTopQuestionsError,
});

export const upQuestion = id => ({
  type: UP_QUESTION,
  id,
});

export const upQuestionSuccess = id => ({
  type: UP_QUESTION_SUCCESS,
  id,
});

export const upQuestionErr = upQuestionError => ({
  type: UP_QUESTION_ERROR,
  upQuestionError,
});

export const downQuestion = id => ({
  type: DOWN_QUESTION,
  id,
});

export const downQuestionSuccess = id => ({
  type: DOWN_QUESTION_SUCCESS,
  id,
});

export const downQuestionErr = upQuestionError => ({
  type: DOWN_QUESTION_ERROR,
  upQuestionError,
});

export const moveQuestion = (id, position) => ({
  type: MOVE_QUESTION,
  position,
  id,
});

export const moveQuestionSuccess = (id, position) => ({
  type: MOVE_QUESTION_SUCCESS,
  position,
  id,
});

export const moveQuestionErr = moveQuestionError => ({
  type: MOVE_QUESTION_ERROR,
  moveQuestionError,
});
