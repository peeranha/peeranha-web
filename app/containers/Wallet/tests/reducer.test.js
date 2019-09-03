import { fromJS } from 'immutable';
import getWeekStatReducer from '../reducer';

import { getWeekStat, getWeekStatSuccess, getWeekStatErr } from '../actions';

describe('getWeekStatReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(getWeekStatReducer(state, {})).toEqual(state);
  });

  it('getWeekStat', () => {
    const obj = state.set('getWeekStatProcessing', true);

    expect(getWeekStatReducer(state, getWeekStat())).toEqual(obj);
  });

  it('getWeekStatSuccess', () => {
    const weekStat = [];
    const obj = state
      .set('getWeekStatProcessing', false)
      .set('weekStat', weekStat);

    expect(getWeekStatReducer(state, getWeekStatSuccess(weekStat))).toEqual(
      obj,
    );
  });

  it('getWeekStatErr', () => {
    const getWeekStatError = 'getWeekStatError';
    const obj = state
      .set('getWeekStatProcessing', false)
      .set('getWeekStatError', getWeekStatError);

    expect(getWeekStatReducer(state, getWeekStatErr(getWeekStatError))).toEqual(
      obj,
    );
  });
});
