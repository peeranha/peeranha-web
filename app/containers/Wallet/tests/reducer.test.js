import { fromJS } from 'immutable';
import getWeekStatReducer from '../reducer';

import {
  getWeekStat,
  getWeekStatSuccess,
  getWeekStatErr,
  pickupReward,
  pickupRewardSuccess,
  pickupRewardErr,
} from '../actions';

describe('getWeekStatReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    }).set('ids', []);
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
    const userBoostStat = 'userBoostStat';
    const obj = state
      .set('getWeekStatProcessing', false)
      .set('weekStat', weekStat)
      .set('userBoostStat', userBoostStat);

    expect(
      getWeekStatReducer(state, getWeekStatSuccess(weekStat, userBoostStat)),
    ).toEqual(obj);
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

  it('pickupReward', () => {
    const period = 1;
    const buttonId = 0;
    const obj = state
      .set('pickupRewardProcessing', true)
      .set('ids', [buttonId]);

    expect(getWeekStatReducer(state, pickupReward(period, buttonId))).toEqual(
      obj,
    );
  });

  it('pickupRewardSuccess', () => {
    const obj = state.set('pickupRewardProcessing', false);

    expect(getWeekStatReducer(state, pickupRewardSuccess())).toEqual(obj);
  });

  it('pickupRewardErr', () => {
    const pickupRewardError = 'pickupRewardError';
    const obj = state
      .set('pickupRewardProcessing', false)
      .set('pickupRewardError', pickupRewardError);

    expect(
      getWeekStatReducer(state, pickupRewardErr(pickupRewardError)),
    ).toEqual(obj);
  });
});
