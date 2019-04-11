import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the suggestedCommunities state domain
 */

const selectSuggestedCommunitiesDomain = state =>
  state.get('communities', initialState);

const selectSuggestedCommunities = () =>
  createSelector(
    selectSuggestedCommunitiesDomain,
    substate => substate.toJS().suggestedCommunities,
  );

const selectSuggestedCommunitiesLoading = () =>
  createSelector(
    selectSuggestedCommunitiesDomain,
    substate => substate.toJS().getSuggestedCommunitiesLoading,
  );

const selectSuggestedCommunitiesError = () =>
  createSelector(
    selectSuggestedCommunitiesDomain,
    substate => substate.toJS().getSuggestedCommunitiesError,
  );

export {
  selectSuggestedCommunitiesDomain,
  selectSuggestedCommunities,
  selectSuggestedCommunitiesLoading,
  selectSuggestedCommunitiesError,
};
