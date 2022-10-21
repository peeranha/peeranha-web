/*
 *
 * EthereumProvider actions
 *
 */

import {
  INIT_NETWORK_ADAPTER,
  INIT_NETWORK_ADAPTER_SUCCESS,
  INIT_NETWORK_ADAPTER_ERROR,
  SHOW_MODAL,
  HIDE_MODAL,
  TRANSACTION_COMPLETED,
  TRANSACTION_IN_PENDING,
  TRANSACTION_FAILED,
  TRANSACTION_INITIALISED,
} from './constants';

export function initNetworkAdapter(network) {
  console.log(network);
  return {
    type: INIT_NETWORK_ADAPTER,
    network,
  };
}

export function initNetworkAdapterSuccess(networkAdapter) {
  return {
    type: INIT_NETWORK_ADAPTER_SUCCESS,
    networkAdapter,
  };
}

export function initNetworkAdapterError(error) {
  return {
    type: INIT_NETWORK_ADAPTER_ERROR,
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

export function transactionInitialised() {
  return {
    type: TRANSACTION_INITIALISED,
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

export function transactionFailed(error) {
  return {
    type: TRANSACTION_FAILED,
    error,
  };
}
