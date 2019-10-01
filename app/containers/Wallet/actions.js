/*
 *
 * Wallet actions
 *
 */

import {
  GET_WEEK_STAT,
  GET_WEEK_STAT_SUCCESS,
  GET_WEEK_STAT_ERROR,
  PICKUP_REWARD,
  PICKUP_REWARD_SUCCESS,
  PICKUP_REWARD_ERROR,
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

// Pickup reward actions

export function pickupReward(period) {
  return {
    type: PICKUP_REWARD,
    period,
  };
}

export function pickupRewardSuccess() {
  return {
    type: PICKUP_REWARD_SUCCESS,
  };
}

export function pickupRewardErr(pickupRewardError) {
  return {
    type: PICKUP_REWARD_ERROR,
    pickupRewardError,
  };
}
