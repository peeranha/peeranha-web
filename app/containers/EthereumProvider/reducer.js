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
} from './constants';

export const initialState = fromJS({
  initializing: false,
  ethereum: null,
  error: null,
});

function ethereumProviderReducer(state = initialState, action) {
  const { type, error, ethereum } = action;

  switch (type) {
    case INIT_ETHEREUM:
      return state.set('initializing', true);
    case INIT_ETHEREUM_SUCCESS:
      return state.set('initializing', false).set('ethereum', ethereum);
    case INIT_ETHEREUM_ERROR:
      return state.set('initializing', false).set('error', error);
    default:
      return state;
  }
}

export default ethereumProviderReducer;
