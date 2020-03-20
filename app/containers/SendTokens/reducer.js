/*
 *
 * SendTokens reducer
 *
 */

import { fromJS } from 'immutable';

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

export const initialState = fromJS({
  showModal: false,
  sendTokensProcessing: false,
  sendTokensError: null,
  selectedAccount: null,
});

function sendTokensReducer(state = initialState, action) {
  const { type, sendTokensError, form, selectedAccount } = action;

  switch (type) {
    case SHOW_SENDTOKENS_MODAL:
      return state.set('showModal', form);
    case HIDE_SENDTOKENS_MODAL:
      return state.set('showModal', false);

    case SEND_TOKENS:
      return state.set('sendTokensProcessing', true);
    case SEND_TOKENS_SUCCESS:
      return state.set('sendTokensProcessing', false);
    case SEND_TOKENS_ERROR:
      return state
        .set('sendTokensProcessing', false)
        .set('sendTokensError', sendTokensError);

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

export default sendTokensReducer;
