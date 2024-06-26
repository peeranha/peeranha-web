/*
 *
 * Boost actions
 *
 */

import {
  GET_WEEK_STAT,
  GET_WEEK_STAT_SUCCESS,
  GET_WEEK_STAT_ERROR,
  CHANGE_STAKE,
  CHANGE_STAKE_PROCESSING,
  CHANGE_STAKE_SUCCESS,
  CHANGE_STAKE_ERROR,
  CURRENT_STAKE_FORM,
} from './constants';

export function getWeekStat() {
  return {
    type: GET_WEEK_STAT,
  };
}

export function getWeekStatSuccess(weekStat, globalBoostStat, userBoostStat) {
  return {
    type: GET_WEEK_STAT_SUCCESS,
    weekStat,
    globalBoostStat,
    userBoostStat,
  };
}

export function getWeekStatErr(getWeekStatError) {
  return {
    type: GET_WEEK_STAT_ERROR,
    getWeekStatError,
  };
}

export function changeStake(val) {
  return {
    type: CHANGE_STAKE,
    currentStake: val.get(CURRENT_STAKE_FORM),
  };
}

export function changeStakeProcessing() {
  return {
    type: CHANGE_STAKE_PROCESSING,
  };
}

export function changeStakeSuccess(userBoostStat) {
  return {
    type: CHANGE_STAKE_SUCCESS,
    userBoostStat,
  };
}

export function changeStakeErr(changeStakeError) {
  return {
    type: CHANGE_STAKE_ERROR,
    changeStakeError,
  };
}
