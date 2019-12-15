import {
  GET_RESULTS,
  GET_RESULTS_SUCCESS,
  GET_RESULTS_ERROR,
} from './constants';

export function getResults(query) {
  return {
    type: GET_RESULTS,
    query,
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
