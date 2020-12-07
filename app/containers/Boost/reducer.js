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
  CHANGE_STAKE,
  CHANGE_STAKE_PROCESSING,
  CHANGE_STAKE_SUCCESS,
  CHANGE_STAKE_ERROR,
} from './constants';

export const initialState = fromJS({
  getWeekStatProcessing: false,
  getWeekStatError: null,
  weekStat: null,
  changeStakeLoading: false,
  changeStakeError: null,
});

function walletReducer(state = initialState, action) {
  const {
    type,
    getWeekStatError,
    weekStat,
    changeStakeError,
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

    case CHANGE_STAKE:
      return state.set('changeStakeLoading', true);
    case CHANGE_STAKE_PROCESSING:
      return state.set('changeStakeLoading', true);
    case CHANGE_STAKE_SUCCESS:
      return state
        .set('changeStakeLoading', false);
    case CHANGE_STAKE_ERROR:
      return state
        .set('changeStakeLoading', false)
        .set('changeStakeError', changeStakeError);

    default:
      return state;
  }
}

export default walletReducer;
