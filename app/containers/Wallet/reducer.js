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
  PICKUP_REWARD,
  PICKUP_REWARD_SUCCESS,
  PICKUP_REWARD_ERROR,
} from './constants';

export const initialState = fromJS({
  getWeekStatProcessing: false,
  getWeekStatError: null,
  pickupRewardProcessing: false,
  pickupRewardError: null,
  weekStat: null,
});

function walletReducer(state = initialState, action) {
  const { type, getWeekStatError, weekStat, pickupRewardError } = action;

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

    case PICKUP_REWARD:
      return state.set('pickupRewardProcessing', true);
    case PICKUP_REWARD_SUCCESS:
      return state.set('pickupRewardProcessing', false);
    case PICKUP_REWARD_ERROR:
      return state
        .set('pickupRewardProcessing', false)
        .set('pickupRewardError', pickupRewardError);

    default:
      return state;
  }
}

export default walletReducer;
