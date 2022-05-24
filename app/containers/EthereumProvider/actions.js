/*
 *
 * EthereumProvider actions
 *
 */

import {
  INIT_ETHEREUM,
  INIT_ETHEREUM_SUCCESS,
  INIT_ETHEREUM_ERROR,
  SHOW_MODAL,
  HIDE_MODAL,
  TRANSACTION_COMPLETED,
  TRANSACTION_IN_PENDING,
} from './constants';

export function initEthereum(data) {
  return {
    type: INIT_ETHEREUM,
    data,
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

export function showModal() {
  return {
    type: SHOW_MODAL,
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}

export function transactionInPending(transactionHash) {
  return {
    type: TRANSACTION_IN_PENDING,
    transactionHash,
  };
}

export function transactionCompleted() {
  return {
    type: TRANSACTION_COMPLETED,
  };
}
