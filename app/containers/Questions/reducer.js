/* eslint indent: 0 */
import { fromJS } from 'immutable';
import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';

import {
  ADD_TO_TOP_QUESTIONS,
  ADD_TO_TOP_QUESTIONS_ERROR,
  ADD_TO_TOP_QUESTIONS_SUCCESS,
  CHANGE_QUESTION_FILTER,
  DOWN_QUESTION,
  DOWN_QUESTION_ERROR,
  DOWN_QUESTION_SUCCESS,
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
  GET_UNIQ_QUESTIONS,
  LOAD_COMMUNITY_TOP_QUESTIONS,
  LOAD_COMMUNITY_TOP_QUESTIONS_ERROR,
  LOAD_COMMUNITY_TOP_QUESTIONS_SUCCESS,
  MOVE_QUESTION,
  MOVE_QUESTION_ERROR,
  MOVE_QUESTION_SUCCESS,
  REMOVE_FROM_TOP_QUESTIONS,
  REMOVE_FROM_TOP_QUESTIONS_ERROR,
  REMOVE_FROM_TOP_QUESTIONS_SUCCESS,
  SET_CREATED_FILTER,
  SET_TYPE_FILTER,
  UP_QUESTION,
  UP_QUESTION_ERROR,
  UP_QUESTION_SUCCESS,
} from './constants';

export const initialState = fromJS({
  initLoadedItems: 25,
  nextLoadedItems: 10,
  questionsLoading: true,
  questionsList: [],
  questionsError: '',
  isLastFetch: false,
  typeFilter: 0,
  createdFilter: null,
  topQuestions: [],
  topQuestionsLoaded: false,
  questionFilter: 0,
  topQuestionActionProcessing: false,
});

// TODO: test
function questionsReducer(state = initialState, action) {
  const {
    type,
    questionsList,
    questionsError,
    toUpdateQuestions,
    typeFilter,
    createdFilter,
    topQuestions,
    questionFilter,
    id,
    position,
  } = action;
  const { topQuestions: topQuestionsState } = state.toJS();
  const element = topQuestionsState.find(
    ({ id: questionId }) => questionId === id,
  );
  const index = topQuestionsState.indexOf(element);
  const tempObject = {};
  let temp = null;

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
            ? questionsList.map(({ id: questionId, ...rest }) => ({
                ...rest,
                id: questionId,
                isTopQuestion: !!topQuestionsState.find(
                  ({ id: qId }) => qId === questionId,
                ),
              }))
            : orderBy(
                uniqBy(state.toJS().questionsList.concat(questionsList), 'id'),
                ['id'],
                ['asc'],
              ).map(({ id: questionId, ...rest }) => ({
                ...rest,
                id: questionId,
                isTopQuestion: !!topQuestionsState.find(
                  ({ id: qId }) => qId === questionId,
                ),
              })),
        )
        .set('isLastFetch', questionsList.length === 0);
    case GET_QUESTIONS_ERROR:
      return state
        .set('questionsLoading', false)
        .set('questionsError', questionsError);

    case GET_UNIQ_QUESTIONS:
      return state.set(
        'questionsList',
        orderBy(
          uniqBy(questionsList.concat(state.toJS().questionsList), 'id'),
          ['id'],
          ['asc'],
        )
          .filter(x => !x.isDeleted)
          .map(({ id: questionId, ...rest }) => ({
            ...rest,
            id: questionId,
            isTopQuestion: !!topQuestionsState.find(
              ({ id: qId }) => qId === questionId,
            ),
          })),
      );

    case CHANGE_QUESTION_FILTER:
      return state.set('questionFilter', questionFilter);

    case LOAD_COMMUNITY_TOP_QUESTIONS:
      return state.set('questionsLoading', true);
    case LOAD_COMMUNITY_TOP_QUESTIONS_SUCCESS:
      return state
        .set(
          'topQuestions',
          topQuestions.map(x => ({ ...x, isTopQuestion: true })),
        )
        .set('topQuestionsLoaded', true)
        .set('questionFilter', questionFilter)
        .set('questionsList', [
          ...state.toJS().questionsList.map(({ id: questionId, ...rest }) => ({
            ...rest,
            id: questionId,
            isTopQuestion: !!topQuestions.find(
              ({ id: qId }) => qId === questionId,
            ),
          })),
        ])
        .set('questionsLoading', false);
    case LOAD_COMMUNITY_TOP_QUESTIONS_ERROR:
      return state.set('questionsLoading', false);

    case ADD_TO_TOP_QUESTIONS:
      return state.set('topQuestionActionProcessing', true);
    case ADD_TO_TOP_QUESTIONS_SUCCESS:
      topQuestionsState.push({
        ...state
          .toJS()
          .questionsList.find(({ id: questionId }) => questionId === id),
        isTopQuestion: true,
      });
      return state
        .set('topQuestions', [...topQuestionsState])
        .set(
          'questionsList',
          state.toJS().questionsList.map(({ id: questionId, ...rest }) => ({
            ...rest,
            id: questionId,
            isTopQuestion: !!topQuestionsState.find(
              ({ id: qId }) => qId === questionId,
            ),
          })),
        )
        .set('topQuestionActionProcessing', false);
    case ADD_TO_TOP_QUESTIONS_ERROR:
      return state.set('topQuestionActionProcessing', false);

    case REMOVE_FROM_TOP_QUESTIONS:
      return state.set('topQuestionActionProcessing', true);
    case REMOVE_FROM_TOP_QUESTIONS_SUCCESS:
      return state
        .set(
          'topQuestions',
          state
            .toJS()
            .topQuestions.filter(({ id: questionId }) => questionId !== id),
        )
        .set(
          'questionsList',
          state
            .toJS()
            .questionsList.map(
              ({ id: questionId, isTopQuestion, ...rest }) => ({
                ...rest,
                id: questionId,
                isTopQuestion: id === questionId ? false : isTopQuestion,
              }),
            ),
        )
        .set('topQuestionActionProcessing', false);
    case REMOVE_FROM_TOP_QUESTIONS_ERROR:
      return state.set('topQuestionActionProcessing', false);

    case UP_QUESTION:
      return state.set('topQuestionActionProcessing', true);
    case UP_QUESTION_SUCCESS:
      temp = topQuestionsState[index - 1];
      topQuestionsState[index - 1] = element;
      topQuestionsState[index] = temp;
      return state
        .set('topQuestions', [...topQuestionsState])
        .set('topQuestionActionProcessing', false);
    case UP_QUESTION_ERROR:
      return state.set('topQuestionActionProcessing', false);

    case DOWN_QUESTION:
      return state.set('topQuestionActionProcessing', true);
    case DOWN_QUESTION_SUCCESS:
      temp = topQuestionsState[index + 1];
      topQuestionsState[index + 1] = element;
      topQuestionsState[index] = temp;
      return state
        .set('topQuestions', [...topQuestionsState])
        .set('topQuestionActionProcessing', false);
    case DOWN_QUESTION_ERROR:
      return state.set('topQuestionActionProcessing', false);

    case MOVE_QUESTION:
      return state.set('topQuestionActionProcessing', true);
    case MOVE_QUESTION_SUCCESS:
      topQuestionsState.splice(
        position > index ? position + 1 : position,
        0,
        tempObject,
      );
      topQuestionsState.splice(topQuestionsState.indexOf(element), 1);
      topQuestionsState.splice(
        topQuestionsState.indexOf(tempObject),
        1,
        element,
      );
      return state
        .set('topQuestions', [...topQuestionsState])
        .set('topQuestionActionProcessing', false);
    case MOVE_QUESTION_ERROR:
      return state.set('topQuestionActionProcessing', false);

    default:
      return state;
  }
}

export default questionsReducer;
