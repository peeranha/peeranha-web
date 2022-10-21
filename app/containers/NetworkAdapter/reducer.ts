/*
 *
 * EthereumProvider reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TRANSACTION_IN_PENDING,
  TRANSACTION_COMPLETED,
  TRANSACTION_FAILED,
  TRANSACTION_INITIALISED,
  INIT_NETWORK_ADAPTER,
  INIT_NETWORK_ADAPTER_SUCCESS,
  INIT_NETWORK_ADAPTER_ERROR,
} from './constants';

export const initialState = fromJS({
  initializing: false,
  networkAdapter: null,
  error: null,
  showModal: false,
  transactionInitialised: false,
  inPending: false,
  transactionHash: null,
});

function networkAdapterProviderReducer(state = initialState, action) {
  const { type, error, networkAdapter, transactionHash } = action;

  switch (type) {
    case INIT_NETWORK_ADAPTER:
      return state.set('initializing', true);
    case INIT_NETWORK_ADAPTER_SUCCESS:
      return state
        .set('initializing', false)
        .set('networkAdapter', networkAdapter);
    case INIT_NETWORK_ADAPTER_ERROR:
      return state.set('initializing', false).set('error', error);
    case TRANSACTION_INITIALISED:
      return state.set('transactionInitialised', true);
    case TRANSACTION_IN_PENDING:
      return state
        .set('inPending', true)
        .set('transactionHash', transactionHash);
    case TRANSACTION_COMPLETED:
      return state.set('inPending', false).set('transactionInitialised', false);
    case TRANSACTION_FAILED:
      return state.set('inPending', false).set('transactionInitialised', false);
    default:
      return state;
  }
}

export default networkAdapterProviderReducer;
