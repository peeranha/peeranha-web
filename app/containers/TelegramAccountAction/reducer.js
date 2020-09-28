/*
 *
 * ShowOwnerKey reducer
 *
 */

import { fromJS } from 'immutable';

import {
  CONFIRM_TELEGRAM_ACCOUNT,
  CONFIRM_TELEGRAM_ACCOUNT_SUCCESS,
  CONFIRM_TELEGRAM_ACCOUNT_ERROR,
  UNLINK_TELEGRAM_ACCOUNT,
  UNLINK_TELEGRAM_ACCOUNT_SUCCESS,
  UNLINK_TELEGRAM_ACCOUNT_ERROR,
} from './constants';

export const initialState = fromJS({
  confirmAccountError: null,
  unlinkAccountError: null,
});

function telegramAccountActionReducer(state = initialState, action) {
  // console.log(action)
  switch (action.type) {
    case CONFIRM_TELEGRAM_ACCOUNT:
      return state.set('confirmTelegramAccountProcessing', true);
    case CONFIRM_TELEGRAM_ACCOUNT_SUCCESS:
      return state
        .set('confirmTelegramAccountProcessing', false)
        .set('userTgData', action.userTgData);
    case CONFIRM_TELEGRAM_ACCOUNT_ERROR:
      return state
        .set('confirmTelegramAccountProcessing', false)
        .set('confirmTelegramAccountErr', action.confirmTelegramAccountErr);

    case UNLINK_TELEGRAM_ACCOUNT:
      return state.set('unlinkTelegramAccountProcessing', true);
    case UNLINK_TELEGRAM_ACCOUNT_SUCCESS:
      return state
        .set('unlinkTelegramAccountProcessing', false)
        .set('userTgData', null);
    case UNLINK_TELEGRAM_ACCOUNT_ERROR:
      return state
        .set('unlinkTelegramAccountProcessing', false)
        .set('unlinkTelegramAccountErr', action.unlinkTelegramAccountErr);

    default:
      return state;
  }
}

export default telegramAccountActionReducer;
