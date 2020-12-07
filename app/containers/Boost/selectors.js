import { createSelector } from 'reselect';

import { STATE_KEY } from './constants';

import { initialState } from './reducer';

const selectBoostDomain = state => state.get(STATE_KEY, initialState).toJS();

const selectGetWeekStatProcessing = () =>
  createSelector(
    selectBoostDomain,
    substate => substate.getWeekStatProcessing,
  );

const selectGetWeekStatError = () =>
  createSelector(selectBoostDomain, substate => substate.getWeekStatError);

const selectWeekStat = () =>
  createSelector(selectBoostDomain, substate => substate.weekStat);

const selectChangeStakeLoading = () =>
  createSelector(selectBoostDomain, substate => substate.changeStakeLoading);

export {
  selectBoostDomain,
  selectGetWeekStatProcessing,
  selectWeekStat,
  selectGetWeekStatError,
  selectChangeStakeLoading,
};
