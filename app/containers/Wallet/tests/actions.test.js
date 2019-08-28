import { getWeekStat, getWeekStatSuccess, getWeekStatErr } from '../actions';

import {
  GET_WEEK_STAT,
  GET_WEEK_STAT_SUCCESS,
  GET_WEEK_STAT_ERROR,
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
});
