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
  userBoostStat: null,
  ids: [],
  takenIdFromPeriod: null,
});

function walletReducer(state = initialState, action) {
  const {
    type,
    getWeekStatError,
    weekStat,
    userBoostStat,
    pickupRewardError,
    buttonId,
    period,
  } = action;

  switch (type) {
    case GET_WEEK_STAT:
      return state.set('getWeekStatProcessing', true);
    case GET_WEEK_STAT_SUCCESS:
      const updateWeekStat = weekStat.map(item => ({
        ...item,
        hasTaken:
          item.period === String(state.get('takenIdFromPeriod')) ||
          item.hasTaken,
      }));
      return state
        .set('getWeekStatProcessing', false)
        .set('weekStat', updateWeekStat)
        .set('takenIdFromPeriod', null)
        .set('userBoostStat', userBoostStat);
    case GET_WEEK_STAT_ERROR:
      return state
        .set('getWeekStatProcessing', false)
        .set('getWeekStatError', getWeekStatError);

    case PICKUP_REWARD:
      return state
        .set('pickupRewardProcessing', true)
        .set('takenIdFromPeriod', period)
        .set('ids', [...state.toJS().ids, buttonId]);
    case PICKUP_REWARD_SUCCESS:
      return state
        .set('pickupRewardProcessing', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case PICKUP_REWARD_ERROR:
      return state
        .set('pickupRewardProcessing', false)
        .set('takenIdFromPeriod', null)
        .set('pickupRewardError', pickupRewardError)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    default:
      return state;
  }
}

export default walletReducer;
