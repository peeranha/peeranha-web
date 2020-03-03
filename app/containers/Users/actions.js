import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  CHANGE_SORTING_TYPE,
} from './constants';

export function getUsers({ searchText, loadMore, sorting, fetcher }) {
  return {
    type: GET_USERS,
    searchText,
    sorting,
    loadMore,
    fetcher,
  };
}

export function getUsersSuccess(users, loadMore) {
  return {
    type: GET_USERS_SUCCESS,
    users,
    loadMore,
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
