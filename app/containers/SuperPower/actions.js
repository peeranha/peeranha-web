/*
 *
 * SuperPower actions
 *
 */

import {
  GET_WEEK_STAT,
  GET_WEEK_STAT_SUCCESS,
  GET_WEEK_STAT_ERROR,
  CHANGE_BET,
  CHANGE_BET_PROCESSING,
  CHANGE_BET_SUCCESS,
  CHANGE_BET_ERROR,
  SUPERPOWER_PREDICTION_FORM,
  CURRENT_BET_FORM,
  BET_TYPE_FORM,
} from './constants';

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

export function changeBet(val) {
  return {
    type: CHANGE_BET,
    superPowerPrediction: val.get(SUPERPOWER_PREDICTION_FORM),
    currentBet: val.get(CURRENT_BET_FORM),
    betType: val.get(BET_TYPE_FORM),
  };
}

export function changeBetProcessing() {
  return {
    type: CHANGE_BET_PROCESSING,
  };
}

export function changeBetSuccess() {
  return {
    type: CHANGE_BET_SUCCESS,
  };
}

export function changeBetErr(changeBetError) {
  return {
    type: CHANGE_BET_ERROR,
    changeBetError,
  };
}
