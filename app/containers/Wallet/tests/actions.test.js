import {
  getWeekStat,
  getWeekStatSuccess,
  getWeekStatErr,
  pickupReward,
  pickupRewardSuccess,
  pickupRewardErr,
} from '../actions';

import {
  GET_WEEK_STAT,
  GET_WEEK_STAT_SUCCESS,
  GET_WEEK_STAT_ERROR,
  PICKUP_REWARD,
  PICKUP_REWARD_SUCCESS,
  PICKUP_REWARD_ERROR,
} from '../constants';

describe('wallet actions', () => {
  it('getWeekStat', () => {
    const expected = {
      type: GET_WEEK_STAT,
    };

    expect(getWeekStat()).toEqual(expected);
  });

  it('getWeekStatSuccess', () => {
    const weekStat = 'weekStat';
    const expected = {
      type: GET_WEEK_STAT_SUCCESS,
      weekStat,
    };

    expect(getWeekStatSuccess(weekStat)).toEqual(expected);
  });

  it('getWeekStatErr', () => {
    const getWeekStatError = 'getWeekStatError';
    const expected = {
      type: GET_WEEK_STAT_ERROR,
      getWeekStatError,
    };

    expect(getWeekStatErr(getWeekStatError)).toEqual(expected);
  });

  it('pickupReward', () => {
    const period = 1;
    const expected = {
      type: PICKUP_REWARD,
      period,
    };

    expect(pickupReward(period)).toEqual(expected);
  });

  it('pickupRewardSuccess', () => {
    const expected = {
      type: PICKUP_REWARD_SUCCESS,
    };

    expect(pickupRewardSuccess()).toEqual(expected);
  });

  it('pickupRewardErr', () => {
    const pickupRewardError = 'pickupRewardError';
    const expected = {
      type: PICKUP_REWARD_ERROR,
      pickupRewardError,
    };

    expect(pickupRewardErr(pickupRewardError)).toEqual(expected);
  });
});
