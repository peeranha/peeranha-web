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
  SELECT_ACCOUNT_SUCCESS,
  SELECT_ACCOUNT_ERROR,
  FORGET_IDENTITY_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: null,
  account: null,
  eosInit: {},
  selectAccountError: null,
  forgetIdentityError: null,
});

function accountInitializerReducer(state = initialState, action) {
  const {
    type,
    err,
    acc,
    eosInit,
    selectAccountError,
    forgetIdentityError,
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
    case SELECT_ACCOUNT_SUCCESS:
      return state.set('account', acc).set('eosInit', {
        ...state.get('eosInit'),
        userIsInSystem:
          eosInit.userIsInSystem || state.get('eosInit').userIsInSystem,
        selectedScatterAccount:
          eosInit.selectedScatterAccount ||
          state.get('eosInit').selectedScatterAccount,
        scatterInstalled:
          eosInit.scatterInstalled || state.get('eosInit').scatterInstalled,
      });
    case SELECT_ACCOUNT_ERROR:
      return state.set('selectAccountError', selectAccountError);
    case FORGET_IDENTITY_ERROR:
      return state.set('forgetIdentityError', forgetIdentityError);
    default:
      return state;
  }
}

export default accountInitializerReducer;
