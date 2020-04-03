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
} from './constants';

export const initialState = fromJS({
  showModal: '',
  sendTipsProcessing: false,
  sendTipsError: null,
  selectedAccount: null,
});

function sendTipsReducer(state = initialState, action) {
  const { type, sendTipsError, form, selectedAccount } = action;

  switch (type) {
    case SHOW_SEND_TIPS_MODAL:
      return state.set('showModal', form);
    case HIDE_SEND_TIPS_MODAL:
      return state.set('showModal', '');

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

    default:
      return state;
  }
}

export default sendTipsReducer;
