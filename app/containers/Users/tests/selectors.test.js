import { fromJS } from 'immutable';

import {
  selectUsersDomain,
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectIsLastFetch,
  selectSorting,
  selectSearchText,
  selectLimit,
} from '../selectors';

describe('selectUsersDomain', () => {
  const users = 'users';
  const getUsersLoading = 'getUsersLoading';
  const getUsersError = 'getUsersError';
  const isLastFetch = 'usersError';
  const sorting = 'sorting';
  const searchText = 'searchText';
  const limit = 'limit';

  const globalState = fromJS({
    users,
    getUsersLoading,
    getUsersError,
    isLastFetch,
    sorting,
    searchText,
    limit,
  });

  const mockedState = fromJS({
    users: globalState,
  });

  it('should select the global state', () => {
    expect(selectUsersDomain(mockedState)).toEqual(globalState.toJS());
  });

  it('selectUsers', () => {
    const isSelectUsers = selectUsers();
    expect(isSelectUsers(mockedState)).toEqual(users);
  });

  it('selectUsersLoading', () => {
    const isSelectUsersLoading = selectUsersLoading();
    expect(isSelectUsersLoading(mockedState)).toEqual(getUsersLoading);
  });

  it('selectUsersError', () => {
    const isSelectUsersError = selectUsersError();
    expect(isSelectUsersError(mockedState)).toEqual(getUsersError);
  });

  it('selectIsLastFetch', () => {
    const isSelectLastFetch = selectIsLastFetch();
    expect(isSelectLastFetch(mockedState)).toEqual(isLastFetch);
  });

  it('selectSorting', () => {
    const isSelectSorting = selectSorting();
    expect(isSelectSorting(mockedState)).toEqual(sorting);
  });

  it('selectSearchText', () => {
    const isSelectSearchText = selectSearchText();
    expect(isSelectSearchText(mockedState)).toEqual(searchText);
  });

  it('selectLimit', () => {
    const isSelectLimit = selectLimit();
    expect(isSelectLimit(mockedState)).toEqual(limit);
  });
});
