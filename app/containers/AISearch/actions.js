import { GET_SEARCH_RESULT, GET_SEARCH_RESULT_ERROR, GET_SEARCH_RESULT_SUCCESS } from './constants';

export function getSearchResult(query, communityId) {
  return {
    type: GET_SEARCH_RESULT,
    query,
    communityId,
  };
}

export function getSearchResultSuccess(searchResult) {
  return {
    type: GET_SEARCH_RESULT_SUCCESS,
    searchResult,
  };
}

export function getSearchResultError(error) {
  return {
    type: GET_SEARCH_RESULT_ERROR,
    error,
  };
}
