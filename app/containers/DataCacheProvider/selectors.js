import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dataCacheProvider state domain
 */

const selectDataCacheProviderDomain = state =>
  state.get('dataCacheProvider', initialState).toJS();

const selectCommunities = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.communities,
  );

const selectCommunitiesLoading = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.communitiesLoading,
  );

const selectGetCommunitiesWithTagsError = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.getCommunitiesWithTagsError,
  );

const selectUsers = username =>
  createSelector(
    selectDataCacheProviderDomain,
    substate =>
      username !== undefined ? substate.users[username] : substate.users,
  );

const selectUsersLoading = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.usersLoading,
  );

const selectGetUserProfileError = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.getUserProfileError,
  );

const selectStat = () =>
  createSelector(selectDataCacheProviderDomain, substate => substate.stat);

const selectStatLoading = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.statLoading,
  );

const selectStatError = () =>
  createSelector(
    selectDataCacheProviderDomain,
    substate => substate.getStatError,
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
