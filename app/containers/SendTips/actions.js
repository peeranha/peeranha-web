/*
 *
 * SendTips actions
 *
 */

import {
  SELECT_ACCOUNT_ERROR,
  REMOVE_SELECTED_ACCOUNTS,
  SHOW_SEND_TIPS_MODAL,
  HIDE_SEND_TIPS_MODAL,
  SEND_TIPS,
  SEND_TIPS_SUCCESS,
  SEND_TIPS_ERROR,
  SEND_TIPS_NOTIFICATION,
  ADD_TIPS_SCATTER_EOS_SERVICE,
  ADD_TIPS_KEYCAT_EOS_SERVICE,
  REMOVE_TIPS_EOS_SERVICES,
  SELECT_SCATTER_ACCOUNT,
  SELECT_KEYCAT_ACCOUNT,
  SELECT_KEYCAT_ACCOUNT_SUCCESS,
  SELECT_SCATTER_ACCOUNT_SUCCESS,
  SEND_FB_VERIFICATION_EMAIL,
  SET_SEND_TIPS_PROCESSING,
  SHOW_VERIFY_FB_MODAL,
  SEND_ANOTHER_CODE,
  VERIFY_FB_ACTION,
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

export function sendTipsNotification(
  data,
  questionId,
  answerId,
  transactionId,
  block,
) {
  return {
    type: SEND_TIPS_NOTIFICATION,
    data,
    questionId,
    answerId,
    transactionId,
    block,
  };
}

export const selectScatterAccount = () => ({
  type: SELECT_SCATTER_ACCOUNT,
});

export const selectScatterAccountSuccess = selectedScatterAccount => ({
  type: SELECT_SCATTER_ACCOUNT_SUCCESS,
  selectedScatterAccount,
});

export const selectKeycatAccount = () => ({
  type: SELECT_KEYCAT_ACCOUNT,
});

export const selectKeycatAccountSuccess = selectedKeycatAccount => ({
  type: SELECT_KEYCAT_ACCOUNT_SUCCESS,
  selectedKeycatAccount,
});

export const selectAccountErr = selectAccountError => ({
  type: SELECT_ACCOUNT_ERROR,
  selectAccountError,
});

export const removeSelectedAccounts = () => ({
  type: REMOVE_SELECTED_ACCOUNTS,
});

export const addScatterTipsEosService = tipsScatterEosService => ({
  type: ADD_TIPS_SCATTER_EOS_SERVICE,
  tipsScatterEosService,
});

export const addTipsKeycatEosService = tipsKeycatEosService => ({
  type: ADD_TIPS_KEYCAT_EOS_SERVICE,
  tipsKeycatEosService,
});

export const removeTipsEosServices = () => ({
  type: REMOVE_TIPS_EOS_SERVICES,
});

export const setSendTipsProcessing = processing => ({
  type: SET_SEND_TIPS_PROCESSING,
  processing,
});

export function sendFbVerificationEmail(...args) {
  return {
    type: SEND_FB_VERIFICATION_EMAIL,
    fbSendTipsFormValues: {
      val: args[0].toJS(),
      resetForm: args[2].reset,
      questionId: args[4],
      answerId: args[5],
    },
  };
}

export function showVerifyFbModal() {
  return {
    type: SHOW_VERIFY_FB_MODAL,
  };
}

export function sendAnotherCode() {
  return {
    type: SEND_ANOTHER_CODE,
  };
}

export function verifyFbAction(...args) {
  return {
    type: VERIFY_FB_ACTION,
    verifyFormVals: args[0].toJS(),
  };
}
