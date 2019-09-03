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
} from './constants';

export const initialState = fromJS({
  getWeekStatProcessing: false,
  getWeekStatError: null,
  weekStat: null,
});

function walletReducer(state = initialState, action) {
  const { type, getWeekStatError, weekStat } = action;

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

    default:
      return state;
  }
}

export default walletReducer;
