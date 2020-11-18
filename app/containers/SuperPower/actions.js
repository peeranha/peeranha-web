/*
 *
 * SuperPower actions
 *
 */

import {
  GET_WEEK_STAT,
  GET_WEEK_STAT_SUCCESS,
  GET_WEEK_STAT_ERROR,
} from './constants';

// Get reward stat actions

export function getWeekStat() {
  return {
    type: GET_WEEK_STAT,
  };
}

export function getWeekStatSuccess(weekStat) {
  return {
    type: GET_WEEK_STAT_SUCCESS,
    weekStat,
  };
}

export function getWeekStatErr(getWeekStatError) {
  return {
    type: GET_WEEK_STAT_ERROR,
    getWeekStatError,
  };
}
