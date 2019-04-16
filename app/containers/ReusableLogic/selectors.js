import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectReusableLogicDomain = state =>
  state.get('reusableLogic', initialState);

const selectFollowHandlerLoading = () =>
  createSelector(
    selectReusableLogicDomain,
    substate => substate.toJS().followHandlerLoading,
  );

const selectFollowHandlerError = () =>
  createSelector(
    selectReusableLogicDomain,
    substate => substate.toJS().followHandlerError,
  );

const selectUpVoteLoading = () =>
  createSelector(
    selectReusableLogicDomain,
    substate => substate.toJS().upVoteLoading,
  );

const selectUpVoteError = () =>
  createSelector(
    selectReusableLogicDomain,
    substate => substate.toJS().upVoteError,
  );

const selectDownVoteLoading = () =>
  createSelector(
    selectReusableLogicDomain,
    substate => substate.toJS().downVoteLoading,
  );

const selectDownVoteError = () =>
  createSelector(
    selectReusableLogicDomain,
    substate => substate.toJS().downVoteError,
  );

export {
  selectReusableLogicDomain,
  selectFollowHandlerLoading,
  selectFollowHandlerError,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
};
