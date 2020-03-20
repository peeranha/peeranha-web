/*
 *
 * SendTokens actions
 *
 */

import {
  SHOW_SENDTOKENS_MODAL,
  HIDE_SENDTOKENS_MODAL,
  SEND_TOKENS,
  SEND_TOKENS_SUCCESS,
  SEND_TOKENS_ERROR,
  SELECT_ACCOUNT,
  SELECT_ACCOUNT_SUCCESS,
  SELECT_ACCOUNT_ERROR,
  REMOVE_SELECTED_ACCOUNT,
} from './constants';

export function showSendTokensModal(form) {
  return {
    type: SHOW_SENDTOKENS_MODAL,
    form,
  };
}

export function hideSendTokensModal() {
  return {
    type: HIDE_SENDTOKENS_MODAL,
  };
}

export function sendTokens(...args) {
  return {
    type: SEND_TOKENS,
    val: args[0].toJS(),
    resetForm: args[2].reset,
  };
}

export function sendTokensSuccess() {
  return {
    type: SEND_TOKENS_SUCCESS,
  };
}

export function sendTokensErr(sendTokensError) {
  return {
    type: SEND_TOKENS_ERROR,
    sendTokensError,
  };
}

export const selectAccount = () => ({
  type: SELECT_ACCOUNT,
});

export const selectAccountSuccess = selectedAccount => ({
  type: SELECT_ACCOUNT_SUCCESS,
  selectedAccount,
});

export const selectAccountErr = selectAccountError => ({
  type: SELECT_ACCOUNT_ERROR,
  selectAccountError,
});

export const removeSelectedAccount = () => ({
  type: REMOVE_SELECTED_ACCOUNT,
});
