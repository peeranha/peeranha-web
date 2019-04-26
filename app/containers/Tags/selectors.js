import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the suggestedCommunities state domain
 */

const selectTagsDomain = state => state.get('tags', initialState);

const selectTags = () =>
  createSelector(selectTagsDomain, substate => substate.toJS().tags);

const selectTagsLoading = () =>
  createSelector(selectTagsDomain, substate => substate.toJS().tagsLoading);

const selectTagsError = () =>
  createSelector(
    selectTagsDomain,
    substate => substate.toJS().getSuggestedTagsError,
  );

const selectUpVoteLoading = () =>
  createSelector(selectTagsDomain, substate => substate.toJS().upVoteLoading);

const selectUpVoteError = () =>
  createSelector(selectTagsDomain, substate => substate.toJS().upVoteError);

const selectDownVoteLoading = () =>
  createSelector(selectTagsDomain, substate => substate.toJS().downVoteLoading);

const selectDownVoteError = () =>
  createSelector(selectTagsDomain, substate => substate.toJS().downVoteError);

export {
  selectTagsDomain,
  selectTags,
  selectTagsLoading,
  selectTagsError,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
};
