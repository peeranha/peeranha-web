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
} from './constants';

export const initialState = fromJS({
  showModal: false,
  sendTokensProcessing: false,
  sendTokensError: null,
});

function sendTokensReducer(state = initialState, action) {
  const { type, sendTokensError } = action;

  switch (type) {
    case SHOW_SENDTOKENS_MODAL:
      return state.set('showModal', true);
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

    default:
      return state;
  }
}

export default sendTokensReducer;
