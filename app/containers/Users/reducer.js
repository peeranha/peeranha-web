import { fromJS } from 'immutable';
import _sortBy from 'lodash/sortBy';

import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  CHANGE_SORTING_TYPE,
} from './constants';

export const initialState = fromJS({
  users: [],
  getUsersLoading: false,
  getUsersError: null,
  isLastFetch: false,
  sorting: 'asc',
  searchText: '',
  limit: 50,
  skip: 0,
});

function usersReducer(state = initialState, action) {
  const {
    type,
    getUsersError,
    users,
    sorting,
    loadMore,
    searchText,
    reload,
  } = action;
  switch (type) {
    case GET_USERS:
      return state
        .set('getUsersLoading', true)
        .set('searchText', searchText || state.get('searchText'))
        .set('sorting', sorting || state.get('sorting'));

    case GET_USERS_SUCCESS:
      return state
        .set('getUsersLoading', false)
        .set('isLastFetch', users.length < initialState.get('limit'))
        .set('users', loadMore ? state.toJS().users.concat(users) : users)
        .set(
          'skip',
          reload ? state.get('limit') : state.get('skip') + state.get('limit'),
        );
    case GET_USERS_ERROR:
      return state
        .set('getUsersLoading', false)
        .set('getUsersError', getUsersError);

    case CHANGE_SORTING_TYPE:
      return state
        .set('sorting', sorting || state.get('sorting'))
        .set(
          'users',
          sorting !== state.get('sorting')
            ? _sortBy(
                state.get('users'),
                sorting || state.get('sorting'),
              ).reverse()
            : state.get('users'),
        );

    default:
      return state;
  }
}

export default usersReducer;
