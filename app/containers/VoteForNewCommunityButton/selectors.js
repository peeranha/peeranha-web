import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectVoteForNewCommunityButtonDomain = state =>
  state.get('voteForNewCommunityButton', initialState);

const selectUpVoteLoading = () =>
  createSelector(
    selectVoteForNewCommunityButtonDomain,
    substate => substate.toJS().upVoteLoading,
  );

const selectUpVoteError = () =>
  createSelector(
    selectVoteForNewCommunityButtonDomain,
    substate => substate.toJS().upVoteError,
  );

const selectDownVoteLoading = () =>
  createSelector(
    selectVoteForNewCommunityButtonDomain,
    substate => substate.toJS().downVoteLoading,
  );

const selectDownVoteError = () =>
  createSelector(
    selectVoteForNewCommunityButtonDomain,
    substate => substate.toJS().downVoteError,
  );

export {
  selectVoteForNewCommunityButtonDomain,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
};
