/*
 *
 * AccountProvider reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  GET_CURRENT_ACCOUNT_PROCESSING,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: null,
  account: null,
  balance: null,
});

function accountProviderReducer(state = initialState, action) {
  const { type, err, account, balance } = action;

  switch (type) {
    case GET_CURRENT_ACCOUNT_PROCESSING:
      return state.set('loading', true);
    case GET_CURRENT_ACCOUNT_SUCCESS:
      return state
        .set('loading', false)
        .set('account', account || initialState.get('account'))
        .set('balance', balance || initialState.get('balance'));
    case GET_CURRENT_ACCOUNT_ERROR:
      return state.set('loading', false).set('error', err);

    default:
      return state;
  }
}

export default accountProviderReducer;
