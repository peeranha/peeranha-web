/*
 *
 * SendTips reducer
 *
 */

import { fromJS } from 'immutable';

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

export const initialState = fromJS({
  showModal: '',
  sendTipsProcessing: false,
  sendTipsError: null,
  selectedAccount: null,
  tipsEosService: null,
  whoWillBeTipped: null,
});

function sendTipsReducer(state = initialState, action) {
  const {
    type,
    sendTipsError,
    form,
    selectedAccount,
    tipsEosService,
    whoWillBeTipped,
  } = action;

  switch (type) {
    case SHOW_SEND_TIPS_MODAL:
      return state
        .set('showModal', form)
        .set('whoWillBeTipped', whoWillBeTipped);
    case HIDE_SEND_TIPS_MODAL:
      return state.set('showModal', '').set('whoWillBeTipped', '');

    case SEND_TIPS:
      return state.set('sendTipsProcessing', true);
    case SEND_TIPS_SUCCESS:
      return state.set('sendTipsProcessing', false);
    case SEND_TIPS_ERROR:
      return state
        .set('sendTipsProcessing', false)
        .set('sendTipsError', sendTipsError);

    case SELECT_ACCOUNT:
      return state.set('selectAccountProcessing', true);
    case SELECT_ACCOUNT_SUCCESS:
      return state
        .set('selectAccountProcessing', false)
        .set('selectedAccount', selectedAccount);
    case SELECT_ACCOUNT_ERROR:
      return state
        .set('selectAccountProcessing', false)
        .set('selectedAccount', null);

    case REMOVE_SELECTED_ACCOUNT:
      return state.set('selectedAccount', null);

    case ADD_TIPS_EOS_SERVICE:
      return state.set('tipsEosService', tipsEosService);
    case REMOVE_TIPS_EOS_SERVICE:
      return state.set('tipsEosService', null);

    default:
      return state;
  }
}

export default sendTipsReducer;
