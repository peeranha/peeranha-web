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

const selectRewardsWeeksNumber = () =>
  createSelector(
    selectWalletDomain,
    substate =>
      substate.weekStat
        ? substate.weekStat.filter(el => el.reward > 0 && el.hasTaken === false)
            .length
        : null,
  );

const selectPickupRewardProcessing = () =>
  createSelector(
    selectWalletDomain,
    substate => substate.pickupRewardProcessing,
  );

const selectPickupRewardError = () =>
  createSelector(selectWalletDomain, substate => substate.pickupRewardError);

const selectIds = () =>
  createSelector(selectWalletDomain, substate => [...substate.ids]);

export {
  selectWalletDomain,
  selectGetWeekStatProcessing,
  selectWeekStat,
  selectGetWeekStatError,
  selectPickupRewardProcessing,
  selectPickupRewardError,
  selectIds,
  selectRewardsWeeksNumber,
};
