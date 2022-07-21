import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  CHANGE_SORTING_TYPE,
} from './constants';

export function getUsers({
  limit,
  searchText,
  loadMore,
  sorting,
  fetcher,
  reload,
  communityId,
}) {
  return {
    type: GET_USERS,
    limit,
    searchText,
    sorting,
    loadMore,
    fetcher,
    reload,
    communityId,
  };
}

export function getUsersSuccess(users, loadMore, reload) {
  return {
    type: GET_USERS_SUCCESS,
    users,
    loadMore,
    reload,
  };
}

export function getUsersErr(getUsersError) {
  return {
    type: GET_USERS_ERROR,
    getUsersError,
  };
}

export const changeSortingType = sorting => ({
  type: CHANGE_SORTING_TYPE,
  sorting,
});
