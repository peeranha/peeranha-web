import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectVoteForNewCommunityButtonDomain = state =>
  state.get('voteForNewCommunityButton', initialState).toJS();

const selectUpVoteLoading = () =>
  createSelector(
    selectVoteForNewCommunityButtonDomain,
    substate => substate.upVoteLoading,
  );

const selectUpVoteError = () =>
  createSelector(
    selectVoteForNewCommunityButtonDomain,
    substate => substate.upVoteError,
  );

const selectDownVoteLoading = () =>
  createSelector(
    selectVoteForNewCommunityButtonDomain,
    substate => substate.downVoteLoading,
  );

const selectDownVoteError = () =>
  createSelector(
    selectVoteForNewCommunityButtonDomain,
    substate => substate.downVoteError,
  );

const selectIds = () =>
  createSelector(selectVoteForNewCommunityButtonDomain, substate => [
    ...substate.ids,
  ]);

export {
  selectVoteForNewCommunityButtonDomain,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
  selectIds,
};
