import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the wallet state domain
 */

const selectWalletDomain = state => state.get('wallet', initialState).toJS();

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
