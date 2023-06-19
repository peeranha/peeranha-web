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
  TRANSACTION_FAILED,
  SET_TRANSACTION_LIST,
  TRANSACTION_INITIALIZED,
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

export function transactionInitialised() {
  return {
    type: TRANSACTION_INITIALIZED,
  };
}

export function transactionInPending(transactionHash, transactionList) {
  return {
    type: TRANSACTION_IN_PENDING,
    transactionHash,
    transactionList,
  };
}

export function transactionCompleted(transactionList) {
  return {
    type: TRANSACTION_COMPLETED,
    transactionList,
  };
}

export function setTransactionList(transactionList) {
  return {
    type: SET_TRANSACTION_LIST,
    transactionList,
  };
}

export function transactionFailed(data) {
  return {
    type: TRANSACTION_FAILED,
    data,
  };
}
