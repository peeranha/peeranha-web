import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFollowCommunityButtonDomain = state =>
  state.get('followCommunityButton', initialState).toJS();

const selectFollowHandlerLoading = () =>
  createSelector(
    selectFollowCommunityButtonDomain,
    substate => substate.followHandlerLoading,
  );

const selectFollowHandlerError = () =>
  createSelector(
    selectFollowCommunityButtonDomain,
    substate => substate.followHandlerError,
  );

const selectIds = () =>
  createSelector(selectFollowCommunityButtonDomain, substate => [
    ...substate.ids,
  ]);

export {
  selectFollowCommunityButtonDomain,
  selectFollowHandlerLoading,
  selectFollowHandlerError,
  selectIds,
};
