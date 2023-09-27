import { fromJS } from 'immutable';
import {
  GET_SEARCH_RESULT,
  GET_SEARCH_RESULT_ERROR,
  GET_SEARCH_RESULT_SUCCESS,
} from 'containers/AISearch/constants';

export const initialState = fromJS({
  searchResult: {},
  searchResultLoading: false,
  searchResultError: '',
});

function aiSearchReducer(state = initialState, action: any) {
  const { type, error, searchResult } = action;

  switch (type) {
    case GET_SEARCH_RESULT:
      return state.set('searchResultLoading', true);
    case GET_SEARCH_RESULT_SUCCESS:
      return state.set('searchResultLoading', false).set('searchResult', searchResult);
    case GET_SEARCH_RESULT_ERROR:
      return state.set('searchResultLoading', false).set('searchResultError', error);
    default:
      return state;
  }
}

export default aiSearchReducer;
