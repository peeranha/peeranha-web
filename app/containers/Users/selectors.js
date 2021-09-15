import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUsersDomain = state => state.get('users', initialState).toJS();

const selectUsers = () =>
  createSelector(selectUsersDomain, substate => substate.users);

const selectUsersLoading = () =>
  createSelector(selectUsersDomain, substate => substate.getUsersLoading);

const selectUsersError = () =>
  createSelector(selectUsersDomain, substate => substate.getUsersError);

const selectIsLastFetch = () =>
  createSelector(selectUsersDomain, substate => substate.isLastFetch);

const selectSorting = () =>
  createSelector(selectUsersDomain, substate => substate.sorting);

const selectSearchText = () =>
  createSelector(selectUsersDomain, substate => substate.searchText);

const selectLimit = () =>
  createSelector(selectUsersDomain, substate => substate.limit);

const selectLastUserId = () =>
  createSelector(selectUsersDomain, substate => substate.lastUserId);

const selectSkip = () =>
  createSelector(selectUsersDomain, substate => substate.skip);

export {
  selectUsersDomain,
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectIsLastFetch,
  selectSorting,
  selectSearchText,
  selectLimit,
  selectLastUserId,
  selectSkip,
};
