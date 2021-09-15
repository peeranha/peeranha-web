import { fromJS } from 'immutable';

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
  sorting: 'creationTime',
  searchText: '',
  limit: 5,
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
      console.log('success');
      console.log(reload);
      return state
        .set('getUsersLoading', false)
        .set('isLastFetch', users.length < initialState.get('limit'))
        .set('users', loadMore ? state.toJS().users.concat(users) : users)
        .set(
          'skip',
          reload ? state.toJS().limit : state.toJS().skip + state.toJS().limit,
        );
    case GET_USERS_ERROR:
      return state
        .set('getUsersLoading', false)
        .set('getUsersError', getUsersError);

    case CHANGE_SORTING_TYPE:
      return state.set('sorting', sorting || state.get('sorting'));

    default:
      return state;
  }
}

export default usersReducer;
