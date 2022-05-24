/*
 *
 * EthereumProvider reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT_ETHEREUM,
  INIT_ETHEREUM_SUCCESS,
  INIT_ETHEREUM_ERROR,
  SHOW_MODAL,
  HIDE_MODAL,
  TRANSACTION_IN_PENDING,
  TRANSACTION_COMPLETED,
} from './constants';

export const initialState = fromJS({
  initializing: false,
  ethereum: null,
  error: null,
  showModal: false,
  inPending: false,
  transactionHash: null,
});

function ethereumProviderReducer(state = initialState, action) {
  const { type, error, ethereum, transactionHash } = action;

  switch (type) {
    case INIT_ETHEREUM:
      return state.set('initializing', true);
    case INIT_ETHEREUM_SUCCESS:
      return state.set('initializing', false).set('ethereum', ethereum);
    case INIT_ETHEREUM_ERROR:
      return state.set('initializing', false).set('error', error);
    case SHOW_MODAL:
      return state.set('showModal', true);
    case HIDE_MODAL:
      return state.set('showModal', false);
    case TRANSACTION_IN_PENDING:
      return state
        .set('inPending', true)
        .set('transactionHash', transactionHash);
    case TRANSACTION_COMPLETED:
      return state.set('inPending', false);
    default:
      return state;
  }
}

export default ethereumProviderReducer;
