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
  ids: new Set(),
});

function walletReducer(state = initialState, action) {
  const {
    type,
    getWeekStatError,
    weekStat,
    pickupRewardError,
    buttonId,
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

    case PICKUP_REWARD:
      return state
        .set('pickupRewardProcessing', true)
        .set('ids', new Set([...state.toJS().ids.add(buttonId)]));
    case PICKUP_REWARD_SUCCESS:
      state.toJS().ids.delete(buttonId);
      return state
        .set('pickupRewardProcessing', false)
        .set('ids', new Set([...state.toJS().ids]));
    case PICKUP_REWARD_ERROR:
      state.toJS().ids.delete(buttonId);
      return state
        .set('pickupRewardProcessing', false)
        .set('pickupRewardError', pickupRewardError)
        .set('ids', new Set([...state.toJS().ids]));

    default:
      return state;
  }
}

export default walletReducer;
