import {
  GET_RESULTS,
  GET_RESULTS_SUCCESS,
  GET_RESULTS_ERROR,
  GET_EXISTING_QUESTIONS_SUCCESS,
} from './constants';

export function getResults(query, isItAskQuestion) {
  return {
    type: GET_RESULTS,
    query,
    isItAskQuestion,
  };
}

export function getExistingQuestionSuccess(items) {
  return {
    type: GET_EXISTING_QUESTIONS_SUCCESS,
    items,
  };
}

export function getResultsSuccess(items) {
  return {
    type: GET_RESULTS_SUCCESS,
    items,
  };
}

export function getResultsErr(getResultsError) {
  return {
    type: GET_RESULTS_ERROR,
    getResultsError,
  };
}
