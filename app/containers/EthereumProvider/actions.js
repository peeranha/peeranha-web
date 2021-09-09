/*
 *
 * EthereumProvider actions
 *
 */

import {
  INIT_ETHEREUM,
  INIT_ETHEREUM_SUCCESS,
  INIT_ETHEREUM_ERROR,
} from './constants';

export function initEthereum(key, initWithMetaMask, selectedAccount) {
  return {
    type: INIT_ETHEREUM,
    key,
    initWithMetaMask,
    selectedAccount,
  };
}

export function initEthereumSuccess(ethereum) {
  return {
    type: INIT_ETHEREUM_SUCCESS,
    ethereum,
  };
}

export function initEthereumError(error) {
  return {
    type: INIT_ETHEREUM_ERROR,
    error,
  };
}
