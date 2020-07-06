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
  REMOVE_OR_ADD_TOP_QUESTION,
  REMOVE_OR_ADD_TOP_QUESTION_SUCCESS,
  REMOVE_OR_ADD_TOP_QUESTION_ERROR,
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

export const getUniqQuestions = questionsList => ({
  type: GET_UNIQ_QUESTIONS,
  questionsList,
});

export const setTypeFilter = typeFilter => ({
  type: SET_TYPE_FILTER,
  typeFilter,
});

export const setCreatedFilter = createdFilter => ({
  type: SET_CREATED_FILTER,
  createdFilter,
});

export const changeQuestionFilter = questionFilter => ({
  type: CHANGE_QUESTION_FILTER,
  questionFilter,
});

export const loadTopCommunityQuestions = init => ({
  type: LOAD_COMMUNITY_TOP_QUESTIONS,
  init,
});

export const loadTopCommunityQuestionsSuccess = (
  questions,
  questionFilter,
  topQuestionsIds,
  lastIndex,
) => ({
  type: LOAD_COMMUNITY_TOP_QUESTIONS_SUCCESS,
  questions,
  questionFilter,
  topQuestionsIds,
  lastIndex,
});

export const loadTopCommunityQuestionsErr = loadTopCommunityQuestionsError => ({
  type: LOAD_COMMUNITY_TOP_QUESTIONS_ERROR,
  loadTopCommunityQuestionsError,
});

export const removeOrAddTopQuestion = id => ({
  type: REMOVE_OR_ADD_TOP_QUESTION,
  id,
});

export const removeOrAddTopQuestionSuccess = (id, isRemove) => ({
  type: REMOVE_OR_ADD_TOP_QUESTION_SUCCESS,
  isRemove,
  id,
});

export const removeOrAddTopQuestionErr = removeOrAddTopQuestionError => ({
  type: REMOVE_OR_ADD_TOP_QUESTION_ERROR,
  removeOrAddTopQuestionError,
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
