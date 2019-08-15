/*
 *
 * AccountProvider reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: null,
  account: null,
});

function accountProviderReducer(state = initialState, action) {
  const { type, err, account } = action;

  switch (type) {
    case GET_CURRENT_ACCOUNT:
      return state.set('loading', true);
    case GET_CURRENT_ACCOUNT_SUCCESS:
      return state.set('loading', false).set('account', account);
    case GET_CURRENT_ACCOUNT_ERROR:
      return state.set('loading', false).set('error', err);

    default:
      return state;
  }
}

export default accountProviderReducer;
