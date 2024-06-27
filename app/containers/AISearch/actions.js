import {
  GET_CHUNK_SUCCESS,
  GET_SEARCH_RESULT,
  GET_SEARCH_RESULT_ERROR,
  GET_SEARCH_RESULT_SUCCESS,
  START_OVER,
  STOP_GENERATION,
} from './constants';

export function getSearchResult(query, communityId) {
  return {
    type: GET_SEARCH_RESULT,
    query,
    communityId,
  };
}

export function getSearchResultSuccess() {
  return {
    type: GET_SEARCH_RESULT_SUCCESS,
  };
}

export function getChunkSuccess(answers, writeLast, threadId) {
  return {
    type: GET_CHUNK_SUCCESS,
    answers,
    writeLast,
    threadId,
  };
}

export function stopGeneration() {
  return {
    type: STOP_GENERATION,
  };
}

export function startOver() {
  return {
    type: START_OVER,
  };
}

export function getSearchResultError(error) {
  return {
    type: GET_SEARCH_RESULT_ERROR,
    error,
  };
}
