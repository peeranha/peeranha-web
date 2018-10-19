/*
 *
 * AccountInitializer reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  INIT_SCATTER,
  INIT_SCATTER_SUCCESS,
  INIT_SCATTER_ERROR,
  SELECT_POPUP_ACCOUNT_SUCCESS,
  SELECT_POPUP_ACCOUNT_ERROR,
  PUT_EOS_INIT,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: null,
  account: null,
  eosInit: {},
  errorScatterInit: null,
  selectAccountError: null,
  userIsInSystem: null,
});

function accountInitializerReducer(state = initialState, action) {
  const {
    type,
    err,
    acc,
    eosInit,
    errorScatterInit,
    selectAccountError,
    userIsInSystem,
  } = action;

  switch (type) {
    case GET_CURRENT_ACCOUNT:
      return state.set('loading', true);
    case GET_CURRENT_ACCOUNT_SUCCESS:
      return state
        .set('loading', false)
        .set('eosInit', eosInit)
        .set('account', acc);
    case GET_CURRENT_ACCOUNT_ERROR:
      return state.set('loading', false).set('error', err);
    case INIT_SCATTER:
      return state.set('initScatter', true);
    case INIT_SCATTER_SUCCESS:
      return state.set('initScatter', false);
    case INIT_SCATTER_ERROR:
      return state
        .set('initScatter', false)
        .set('errorScatterInit', errorScatterInit);
    case SELECT_POPUP_ACCOUNT_SUCCESS:
      return state
        .set('account', acc || state.get('account'))
        .set('userIsInSystem', userIsInSystem);
    case SELECT_POPUP_ACCOUNT_ERROR:
      return state.set('selectAccountError', selectAccountError);
    case PUT_EOS_INIT:
      return state.set('eosInit', {
        ...state.get('eosInit'),
        userIsInSystem: eosInit.userIsInSystem,
        selectedScatterAccount: eosInit.selectedScatterAccount,
      });
    default:
      return state;
  }
}

export default accountInitializerReducer;
