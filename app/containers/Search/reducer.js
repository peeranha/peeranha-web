import { fromJS } from 'immutable';

import {
  GET_RESULTS,
  GET_RESULTS_SUCCESS,
  GET_RESULTS_ERROR,
} from './constants';

export const initialState = fromJS({
  items: [],
  getResultsProcessing: false,
  getResultsError: null,
});

function searchReducer(state = initialState, action) {
  const { type, getResultsError, items } = action;

  switch (type) {
    case GET_RESULTS:
      return state.set('getResultsProcessing', true);
    case GET_RESULTS_SUCCESS:
      return state
        .set('getResultsProcessing', false)
        .set('items', items ? items.slice(0, 9) : initialState.get('items'));
    case GET_RESULTS_ERROR:
      return state
        .set('getResultsProcessing', false)
        .set('getResultsError', getResultsError);

    default:
      return state;
  }
}

export default searchReducer;
