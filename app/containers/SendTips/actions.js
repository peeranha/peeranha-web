/*
 *
 * SendTips actions
 *
 */

import {
  SELECT_ACCOUNT,
  SELECT_ACCOUNT_SUCCESS,
  SELECT_ACCOUNT_ERROR,
  REMOVE_SELECTED_ACCOUNT,
  SHOW_SEND_TIPS_MODAL,
  HIDE_SEND_TIPS_MODAL,
  SEND_TIPS,
  SEND_TIPS_SUCCESS,
  SEND_TIPS_ERROR,
  ADD_TIPS_EOS_SERVICE,
  REMOVE_TIPS_EOS_SERVICE,
} from './constants';

export const showSendTipsModal = (form, whoWillBeTipped) => ({
  type: SHOW_SEND_TIPS_MODAL,
  form,
  whoWillBeTipped,
});

export function hideSendTipsModal() {
  return {
    type: HIDE_SEND_TIPS_MODAL,
  };
}

export function sendTips(...args) {
  return {
    type: SEND_TIPS,
    val: args[0].toJS(),
    resetForm: args[2].reset,
    questionId: args[4],
    answerId: args[5],
  };
}

export function sendTipsSuccess() {
  return {
    type: SEND_TIPS_SUCCESS,
  };
}

export function sendTipsErr(sendTipsError) {
  return {
    type: SEND_TIPS_ERROR,
    sendTipsError,
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

export const addTipsEosService = tipsEosService => ({
  type: ADD_TIPS_EOS_SERVICE,
  tipsEosService,
});

export const removeTipsEosService = () => ({
  type: REMOVE_TIPS_EOS_SERVICE,
});
