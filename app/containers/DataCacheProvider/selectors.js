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

export {
  selectDataCacheProviderDomain,
  selectCommunities,
  selectCommunitiesLoading,
  selectGetCommunitiesWithTagsError,
};
