import { createSelector } from 'reselect';

import { STATE_KEY } from './constants';

import { initialState } from './reducer';

const selectSuperPowerDomain = state => state.get(STATE_KEY, initialState).toJS();

const selectGetWeekStatProcessing = () =>
  createSelector(
    selectSuperPowerDomain,
    substate => substate.getWeekStatProcessing,
  );

const selectGetWeekStatError = () =>
  createSelector(selectSuperPowerDomain, substate => substate.getWeekStatError);

const selectWeekStat = () =>
  createSelector(selectSuperPowerDomain, substate => substate.weekStat);

const selectChangeBetLoading = () =>
  createSelector(selectSuperPowerDomain, substate => substate.changeBetLoading);

export {
  selectSuperPowerDomain,
  selectGetWeekStatProcessing,
  selectWeekStat,
  selectGetWeekStatError,
  selectChangeBetLoading,
};
