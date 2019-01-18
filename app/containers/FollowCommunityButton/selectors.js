import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFollowCommunityButtonDomain = state =>
  state.get('followCommunityButton', initialState);

const selectFollowHandlerLoading = () =>
  createSelector(
    selectFollowCommunityButtonDomain,
    substate => substate.toJS().followHandlerLoading,
  );

const selectFollowHandlerError = () =>
  createSelector(
    selectFollowCommunityButtonDomain,
    substate => substate.toJS().followHandlerError,
  );

export {
  selectFollowCommunityButtonDomain,
  selectFollowHandlerLoading,
  selectFollowHandlerError,
};
