import { createSelector } from 'reselect';

import { STATE_KEY } from './constants';

import { initialState } from './reducer';

/**
 * Direct selector to the wallet state domain
 */

const selectWalletDomain = state => state.get(STATE_KEY, initialState).toJS();

const selectGetWeekStatProcessing = () =>
  createSelector(
    selectWalletDomain,
    substate => substate.getWeekStatProcessing,
  );

const selectGetWeekStatError = () =>
  createSelector(selectWalletDomain, substate => substate.getWeekStatError);

const selectWeekStat = () =>
  createSelector(selectWalletDomain, substate => substate.weekStat);

export {
  selectWalletDomain,
  selectGetWeekStatProcessing,
  selectWeekStat,
  selectGetWeekStatError,
};
