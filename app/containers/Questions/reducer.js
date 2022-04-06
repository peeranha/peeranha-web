/* eslint indent: 0 */
import { fromJS } from 'immutable';
import orderBy from 'lodash/orderBy';

import {
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
  REMOVE_OR_ADD_TOP_QUESTION,
  REMOVE_OR_ADD_TOP_QUESTION_ERROR,
  REMOVE_OR_ADD_TOP_QUESTION_SUCCESS,
  SET_CREATED_FILTER,
  SET_TYPE_FILTER,
  UP_QUESTION,
  UP_QUESTION_ERROR,
  UP_QUESTION_SUCCESS,
} from './constants';

export const initialState = fromJS({
  initLoadedItems: 50,
  loadedItems: 50,
  nextLoadedItems: 25,
  questionsLoading: true,
  questionsList: [],
  questionsError: '',
  questions: {},
  lastLoadedTopQuestionIndex: 0,
  isLastFetch: false,
  typeFilter: null,
  createdFilter: null,
  topQuestionIds: [],
  topQuestionsInfoLoaded: false,
  questionFilter: 0,
  topQuestionActionProcessing: false,
  promotedQuestions: {},
  topQuestionsLoading: false,
});

// TODO: test
function questionsReducer(state = initialState, action) {
  const {
    type,
    questionsList = [],
    questionsError,
    toUpdateQuestions,
    typeFilter,
    createdFilter,
    topQuestionsIds,
    questionFilter,
    id,
    position,
    questions,
    lastIndex,
    isRemove,
    promotedQuestions = {},
  } = action;
  const {
    topQuestionIds: stateTopQuestionIds,
    questions: stateQuestions,
    lastLoadedTopQuestionIndex,
    questionsList: stateQuestionsList,
    initLoadedItems,
  } = state.toJS();
  const mappedQuestionsList = questionsList.map(
    ({ id: questionId }) => questionId,
  );

  const element = stateTopQuestionIds.find(questionId => questionId === id);
  const index = stateTopQuestionIds.indexOf(element);
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
          fromJS(
            toUpdateQuestions
              ? mappedQuestionsList
              : [...new Set(stateQuestionsList.concat(mappedQuestionsList))],
          ),
        )
        .set(
          'loadedItems',
          toUpdateQuestions
            ? initLoadedItems
            : Object.keys(stateQuestionsList).length + questionsList.length,
        )
        .set(
          'questions',
          fromJS({
            ...stateQuestions,
            ...questionsList.reduce((acc, cur) => {
              acc[cur.id] = cur;
              return acc;
            }, {}),
          }),
        )
        .set('promotedQuestions', promotedQuestions)
        .set('isLastFetch', questionsList.length === 0);
    case GET_QUESTIONS_ERROR:
      return state
        .set('questionsLoading', false)
        .set('questionsError', questionsError);

    case GET_UNIQ_QUESTIONS:
      return state
        .set(
          'questionsList',
          orderBy(
            [
              ...new Set(
                mappedQuestionsList.concat(questionsList.map(x => x.id)),
              ),
            ].filter(questionId => !stateQuestions[questionId]?.isDeleted),
            ['id'],
            ['asc'],
          ),
        )
        .set(
          'questions',
          fromJS({
            ...stateQuestions,
            ...questionsList.reduce((acc, cur) => {
              acc[cur.id] = cur;
              return acc;
            }, {}),
          }),
        );

    case CHANGE_QUESTION_FILTER:
      return state.set('questionFilter', questionFilter);

    case LOAD_COMMUNITY_TOP_QUESTIONS:
      return state
        .set('topQuestionsLoading', true)
        .set('topQuestionsInfoLoaded', false);
    case LOAD_COMMUNITY_TOP_QUESTIONS_SUCCESS:
      return state
        .set('topQuestionIds', fromJS(topQuestionsIds))
        .set('topQuestionsInfoLoaded', true)
        .set('questionFilter', questionFilter)
        .set('lastLoadedTopQuestionIndex', lastIndex)
        .set('topQuestionsLoading', false)
        .set(
          'questions',
          fromJS({
            ...stateQuestions,
            ...questions.reduce((acc, cur) => {
              if (cur) {
                acc[cur.id] = cur;
              }
              return acc;
            }, {}),
          }),
        );
    case LOAD_COMMUNITY_TOP_QUESTIONS_ERROR:
      return state.set('topQuestionsLoading', false);

    case REMOVE_OR_ADD_TOP_QUESTION:
      return state.set('topQuestionActionProcessing', true);
    case REMOVE_OR_ADD_TOP_QUESTION_SUCCESS:
      return state
        .set(
          'topQuestionIds',
          fromJS(
            isRemove
              ? stateTopQuestionIds.filter(questionId => questionId !== id)
              : [...stateTopQuestionIds, id],
          ),
        )
        .set(
          'lastLoadedTopQuestionIndex',
          isRemove
            ? lastLoadedTopQuestionIndex - 1
            : lastLoadedTopQuestionIndex + 1,
        )
        .set('topQuestionActionProcessing', false);
    case REMOVE_OR_ADD_TOP_QUESTION_ERROR:
      return state.set('topQuestionActionProcessing', false);

    case UP_QUESTION:
      return state.set('topQuestionActionProcessing', true);
    case UP_QUESTION_SUCCESS:
      temp = stateTopQuestionIds[index - 1];
      stateTopQuestionIds[index - 1] = element;
      stateTopQuestionIds[index] = temp;
      return state
        .set('topQuestionIds', fromJS(stateTopQuestionIds))
        .set('topQuestionActionProcessing', false);
    case UP_QUESTION_ERROR:
      return state.set('topQuestionActionProcessing', false);

    case DOWN_QUESTION:
      return state.set('topQuestionActionProcessing', true);
    case DOWN_QUESTION_SUCCESS:
      temp = stateTopQuestionIds[index + 1];
      stateTopQuestionIds[index + 1] = element;
      stateTopQuestionIds[index] = temp;
      return state
        .set('topQuestionIds', fromJS(stateTopQuestionIds))
        .set('topQuestionActionProcessing', false);
    case DOWN_QUESTION_ERROR:
      return state.set('topQuestionActionProcessing', false);

    case MOVE_QUESTION:
      return state.set('topQuestionActionProcessing', true);
    case MOVE_QUESTION_SUCCESS:
      stateTopQuestionIds.splice(
        position > index ? position + 1 : position,
        0,
        tempObject,
      );
      stateTopQuestionIds.splice(stateTopQuestionIds.indexOf(element), 1);
      stateTopQuestionIds.splice(
        stateTopQuestionIds.indexOf(tempObject),
        1,
        element,
      );
      return state
        .set('topQuestionIds', fromJS(stateTopQuestionIds))
        .set('topQuestionActionProcessing', false);
    case MOVE_QUESTION_ERROR:
      return state.set('topQuestionActionProcessing', false);

    default:
      return state;
  }
}

export default questionsReducer;
