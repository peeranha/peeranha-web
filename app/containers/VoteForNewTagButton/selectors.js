import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the suggestedCommunities state domain
 */

const selectVoteForNewTagButtonDomain = state =>
  state.get('voteForNewTagButton', initialState);

const selectUpVoteLoading = () =>
  createSelector(
    selectVoteForNewTagButtonDomain,
    substate => substate.toJS().upVoteLoading,
  );

const selectUpVoteError = () =>
  createSelector(
    selectVoteForNewTagButtonDomain,
    substate => substate.toJS().upVoteError,
  );

const selectDownVoteLoading = () =>
  createSelector(
    selectVoteForNewTagButtonDomain,
    substate => substate.toJS().downVoteLoading,
  );

const selectDownVoteError = () =>
  createSelector(
    selectVoteForNewTagButtonDomain,
    substate => substate.toJS().downVoteError,
  );

export {
  selectVoteForNewTagButtonDomain,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
};
