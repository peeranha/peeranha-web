import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the suggestedCommunities state domain
 */

const selectSuggestedTagsDomain = state =>
  state.get('suggestedTags', initialState);

const selectTags = () =>
  createSelector(selectSuggestedTagsDomain, substate => substate.toJS().tags);

const selectTagsLoading = () =>
  createSelector(
    selectSuggestedTagsDomain,
    substate => substate.toJS().tagsLoading,
  );

const selectTagsError = () =>
  createSelector(
    selectSuggestedTagsDomain,
    substate => substate.toJS().getSuggestedTagsError,
  );

const selectUpVoteLoading = () =>
  createSelector(
    selectSuggestedTagsDomain,
    substate => substate.toJS().upVoteLoading,
  );

const selectUpVoteError = () =>
  createSelector(
    selectSuggestedTagsDomain,
    substate => substate.toJS().upVoteError,
  );

const selectDownVoteLoading = () =>
  createSelector(
    selectSuggestedTagsDomain,
    substate => substate.toJS().downVoteLoading,
  );

const selectDownVoteError = () =>
  createSelector(
    selectSuggestedTagsDomain,
    substate => substate.toJS().downVoteError,
  );

export {
  selectSuggestedTagsDomain,
  selectTags,
  selectTagsLoading,
  selectTagsError,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
};
