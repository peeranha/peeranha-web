import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the suggestedCommunities state domain
 */

const selectSuggestedCommunitiesDomain = state =>
  state.get('suggestedCommunities', initialState);

const selectCommunities = () =>
  createSelector(
    selectSuggestedCommunitiesDomain,
    substate => substate.toJS().communities,
  );

const selectCommunitiesLoading = () =>
  createSelector(
    selectSuggestedCommunitiesDomain,
    substate => substate.toJS().getSuggestedCommunitiesLoading,
  );

const selectCommunitiesError = () =>
  createSelector(
    selectSuggestedCommunitiesDomain,
    substate => substate.toJS().getSuggestedCommunitiesError,
  );

const selectUpVoteLoading = () =>
  createSelector(
    selectSuggestedCommunitiesDomain,
    substate => substate.toJS().upVoteLoading,
  );

const selectUpVoteError = () =>
  createSelector(
    selectSuggestedCommunitiesDomain,
    substate => substate.toJS().upVoteError,
  );

const selectDownVoteLoading = () =>
  createSelector(
    selectSuggestedCommunitiesDomain,
    substate => substate.toJS().downVoteLoading,
  );

const selectDownVoteError = () =>
  createSelector(
    selectSuggestedCommunitiesDomain,
    substate => substate.toJS().downVoteError,
  );

export {
  selectSuggestedCommunitiesDomain,
  selectCommunities,
  selectCommunitiesLoading,
  selectCommunitiesError,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
};
