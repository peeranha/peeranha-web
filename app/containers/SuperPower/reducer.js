/*
 *
 * Wallet reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_WEEK_STAT,
  GET_WEEK_STAT_SUCCESS,
  GET_WEEK_STAT_ERROR,
  CHANGE_BET,
  CHANGE_BET_PROCESSING,
  CHANGE_BET_SUCCESS,
  CHANGE_BET_ERROR,
} from './constants';

export const initialState = fromJS({
  getWeekStatProcessing: false,
  getWeekStatError: null,
  weekStat: null,
  changeBetLoading: false,
  changeBetError: null,
});

function walletReducer(state = initialState, action) {
  const {
    type,
    getWeekStatError,
    weekStat,
    changeBetError,
  } = action;

  switch (type) {
    case GET_WEEK_STAT:
      return state.set('getWeekStatProcessing', true);
    case GET_WEEK_STAT_SUCCESS:
      return state
        .set('getWeekStatProcessing', false)
        .set('weekStat', weekStat);
    case GET_WEEK_STAT_ERROR:
      return state
        .set('getWeekStatProcessing', false)
        .set('getWeekStatError', getWeekStatError);

    case CHANGE_BET:
      return state.set('changeBetLoading', true);
    case CHANGE_BET_PROCESSING:
      return state.set('changeBetLoading', true);
    case CHANGE_BET_SUCCESS:
      return state
        .set('changeBetLoading', false);
    case CHANGE_BET_ERROR:
      return state
        .set('changeBetLoading', false)
        .set('changeBetError', changeBetError);

    default:
      return state;
  }
}

export default walletReducer;
