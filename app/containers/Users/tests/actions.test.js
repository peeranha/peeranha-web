import { getUsers, getUsersSuccess, getUsersErr } from '../actions';

import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR } from '../constants';

describe('Users actions', () => {
  it('GET_USERS', () => {
    const obj = { searchText: '1', loadMore: false, sorting: '2' };

    const expected = {
      type: GET_USERS,
      searchText: obj.searchText,
      sorting: obj.sorting,
      loadMore: obj.loadMore,
    };

    expect(getUsers(obj)).toEqual(expected);
  });

  it('GET_USERS_SUCCESS', () => {
    const users = [];
    const loadMore = false;

    const expected = {
      type: GET_USERS_SUCCESS,
      users,
      loadMore,
    };

    expect(getUsersSuccess(users, loadMore)).toEqual(expected);
  });

  it('GET_USERS_ERROR', () => {
    const getUsersError = 'getUsersError';

    const expected = {
      type: GET_USERS_ERROR,
      getUsersError,
    };

    expect(getUsersErr(getUsersError)).toEqual(expected);
  });
});
