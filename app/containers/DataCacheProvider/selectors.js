import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dataCacheProvider state domain
 */

const selectDataCacheProviderDomain = state =>
  state.get('dataCacheProvider', initialState);

const selectCommunities = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.toJS().communities,
  );

const selectCommunitiesLoading = () =>
  createSelector(selectDataCacheProviderDomain, substate =>
    substate.get('communitiesLoading'),
  );

const selectGetCommunitiesWithTagsError = () =>
  createSelector(selectDataCacheProviderDomain, substate =>
    substate.get('getCommunitiesWithTagsError'),
  );

const selectUsers = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.toJS().users,
  );

const selectUsersLoading = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.toJS().usersLoading,
  );

const selectGetUserProfileError = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.toJS().getUserProfileError,
  );

const selectStat = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.toJS().stat,
  );

const selectStatLoading = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.toJS().statLoading,
  );

const selectStatError = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.toJS().getStatError,
  );

export {
  selectDataCacheProviderDomain,
  selectCommunities,
  selectCommunitiesLoading,
  selectGetCommunitiesWithTagsError,
  selectUsers,
  selectUsersLoading,
  selectGetUserProfileError,
  selectStat,
  selectStatLoading,
  selectStatError,
};
