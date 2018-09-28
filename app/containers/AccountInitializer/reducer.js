/*
 *
 * AccountInitializer reducer
 *
 */

import {
  REVIEW_ACCOUNT,
  REVIEW_ACCOUNT_SUCCESS,
  REVIEW_ACCOUNT_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: null,
};

function accountInitializerReducer(state = initialState, action) {
  const { type, err, acc } = action;
  switch (type) {
    case REVIEW_ACCOUNT:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        acc,
      };
    case REVIEW_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        err,
      };
    default:
      return state;
  }
}

export default accountInitializerReducer;
