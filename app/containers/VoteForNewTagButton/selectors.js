import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the suggestedCommunities state domain
 */

const selectVoteForNewTagButtonDomain = state =>
  state.get('voteForNewTagButton', initialState).toJS();

const selectUpVoteLoading = () =>
  createSelector(
    selectVoteForNewTagButtonDomain,
    substate => substate.upVoteLoading,
  );

const selectUpVoteError = () =>
  createSelector(
    selectVoteForNewTagButtonDomain,
    substate => substate.upVoteError,
  );

const selectDownVoteLoading = () =>
  createSelector(
    selectVoteForNewTagButtonDomain,
    substate => substate.downVoteLoading,
  );

const selectDownVoteError = () =>
  createSelector(
    selectVoteForNewTagButtonDomain,
    substate => substate.downVoteError,
  );

const selectIds = () =>
  createSelector(selectVoteForNewTagButtonDomain, substate => [
    ...substate.ids,
  ]);

export {
  selectVoteForNewTagButtonDomain,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
  selectIds,
};
