import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR } from './constants';

export const initialState = fromJS({
  users: [],
  getUsersLoading: false,
  getUsersError: null,
  isLastFetch: false,
  sorting: 'id',
  searchText: '',
  limit: 30,
});

function usersReducer(state = initialState, action) {
  const { type, getUsersError, users, sorting, loadMore, searchText } = action;

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
        .set('users', loadMore ? state.toJS().users.concat(users) : users);

    case GET_USERS_ERROR:
      return state
        .set('getUsersLoading', false)
        .set('getUsersError', getUsersError);

    case LOCATION_CHANGE:
      return initialState;

    default:
      return state;
  }
}

export default usersReducer;
