/*
 *
 * SendTips reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ADD_TIPS_SCATTER_EOS_SERVICE,
  ADD_TIPS_KEYCAT_EOS_SERVICE,
  HIDE_SEND_TIPS_MODAL,
  REMOVE_SELECTED_ACCOUNTS,
  REMOVE_TIPS_EOS_SERVICES,
  SELECT_SCATTER_ACCOUNT,
  SELECT_KEYCAT_ACCOUNT,
  SELECT_ACCOUNT_ERROR,
  SELECT_KEYCAT_ACCOUNT_SUCCESS,
  SELECT_SCATTER_ACCOUNT_SUCCESS,
  SEND_TIPS,
  SEND_TIPS_ERROR,
  SEND_TIPS_SUCCESS,
  SHOW_SEND_TIPS_MODAL,
  SEND_FB_VERIFICATION_EMAIL,
  SET_SEND_TIPS_PROCESSING,
  SHOW_VERIFY_FB_MODAL,
} from './constants';

export const initialState = fromJS({
  showModal: '',
  sendTipsProcessing: false,
  sendTipsError: null,
  selectedScatterAccount: null,
  selectedKeycatAccount: null,
  tipsScatterEosService: null,
  tipsKeycatEosService: null,
  whoWillBeTipped: null,
  selectAccountProcessing: false,
  fbSendTipsFormValues: null,
  isVerifyFbModal: false,
});

const sendTipsReducer = (state = initialState, action) => {
  const {
    type,
    sendTipsError,
    form,
    selectedScatterAccount,
    selectedKeycatAccount,
    tipsScatterEosService,
    tipsKeycatEosService,
    whoWillBeTipped,
    fbSendTipsFormValues,
    processing,
  } = action;

  switch (type) {
    case SHOW_SEND_TIPS_MODAL:
      return state
        .set('showModal', form)
        .set('whoWillBeTipped', whoWillBeTipped);
    case HIDE_SEND_TIPS_MODAL:
      return state
        .set('showModal', '')
        .set('whoWillBeTipped', '')
        .set('isVerifyFbModal', false)
        .set('fbSendTipsFormValues', null);

    case SEND_TIPS:
      return state.set('sendTipsProcessing', true);
    case SEND_TIPS_SUCCESS:
      return state
        .set('sendTipsProcessing', false)
        .set('isVerifyFbModal', false)
        .set('fbSendTipsFormValues', null);
    case SEND_TIPS_ERROR:
      return state
        .set('sendTipsProcessing', false)
        .set('sendTipsError', sendTipsError);
    case SET_SEND_TIPS_PROCESSING:
      return state.set('sendTipsProcessing', processing);

    case SEND_FB_VERIFICATION_EMAIL:
      return state
        .set('fbSendTipsFormValues', fbSendTipsFormValues)
        .set('sendTipsProcessing', true);
    case SHOW_VERIFY_FB_MODAL:
      return state.set('isVerifyFbModal', true);

    case SELECT_SCATTER_ACCOUNT:
    case SELECT_KEYCAT_ACCOUNT:
      return state.set('selectAccountProcessing', true);
    case SELECT_KEYCAT_ACCOUNT_SUCCESS:
      return state
        .set('selectAccountProcessing', false)
        .set('selectedKeycatAccount', selectedKeycatAccount);
    case SELECT_SCATTER_ACCOUNT_SUCCESS:
      return state
        .set('selectAccountProcessing', false)
        .set('selectedScatterAccount', selectedScatterAccount);
    case SELECT_ACCOUNT_ERROR:
      return state.set('selectAccountProcessing', false);

    case REMOVE_SELECTED_ACCOUNTS:
      return state
        .set('selectedScatterAccount', null)
        .set('selectedKeycatAccount', null);

    case ADD_TIPS_SCATTER_EOS_SERVICE:
      return state.set('tipsScatterEosService', tipsScatterEosService);

    case ADD_TIPS_KEYCAT_EOS_SERVICE:
      return state.set('tipsKeycatEosService', tipsKeycatEosService);

    case REMOVE_TIPS_EOS_SERVICES:
      return state
        .set('tipsScatterEosService', null)
        .set('tipsKeycatEosService', null);
    default:
      return state;
  }
};

export default sendTipsReducer;
