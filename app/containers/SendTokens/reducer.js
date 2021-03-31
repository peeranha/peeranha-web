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
  SHOW_VERIFY_FB_MODAL,
  SET_SEND_TOKENS_PROCESSING,
  SEND_FB_VERIFICATION_EMAIL,
} from './constants';

export const initialState = fromJS({
  showModal: false,
  sendTokensProcessing: false,
  sendTokensError: null,
  isVerifyFbModal: false,
  fbSendTokensFormValues: null,
});

function sendTokensReducer(state = initialState, action) {
  const { type, sendTokensError, fbSendTokensFormValues, processing } = action;

  switch (type) {
    case SHOW_SENDTOKENS_MODAL:
      return state.set('showModal', true);
    case HIDE_SENDTOKENS_MODAL:
      return state
        .set('showModal', false)
        .set('isVerifyFbModal', false)
        .set('fbSendTokensFormValues', null);

    case SHOW_VERIFY_FB_MODAL:
      return state.set('isVerifyFbModal', true);

    case SEND_FB_VERIFICATION_EMAIL:
      return state
        .set('sendTokensProcessing', true)
        .set('fbSendTokensFormValues', fbSendTokensFormValues);

    case SEND_TOKENS:
      return state.set('sendTokensProcessing', true);
    case SET_SEND_TOKENS_PROCESSING:
      return state.set('sendTokensProcessing', processing);
    case SEND_TOKENS_SUCCESS:
      return state
        .set('sendTokensProcessing', false)
        .set('isVerifyFbModal', false)
        .set('fbSendTokensFormValues', null);
    case SEND_TOKENS_ERROR:
      return state
        .set('sendTokensProcessing', false)
        .set('sendTokensError', sendTokensError);

    default:
      return state;
  }
}

export default sendTokensReducer;
