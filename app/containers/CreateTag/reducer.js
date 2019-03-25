/*
 *
 * CreateTag reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SUGGEST_TAG,
  SUGGEST_TAG_SUCCESS,
  SUGGEST_TAG_ERROR,
} from './constants';

export const initialState = fromJS({
  suggestTagLoading: false,
  suggestTagError: null,
});

function createTagReducer(state = initialState, action) {
  const { type, suggestTagError } = action;

  switch (type) {
    case SUGGEST_TAG:
      return state.set('suggestTagLoading', true);
    case SUGGEST_TAG_SUCCESS:
      return state.set('suggestTagLoading', false);
    case SUGGEST_TAG_ERROR:
      return state
        .set('suggestTagLoading', false)
        .set('suggestTagError', suggestTagError);

    default:
      return state;
  }
}

export default createTagReducer;
