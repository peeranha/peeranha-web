import usersReducer, { initialState } from '../reducer';
import { getUsers, getUsersSuccess, getUsersErr } from '../actions';

describe('usersReducer', () => {
  let state;

  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    expect(usersReducer(state, {})).toEqual(state);
  });

  describe('getUsers', () => {
    const sorting = 'id';
    const searchText = 'searchText';

    it('sorting is NOT null', () => {
      const obj = state
        .set('getUsersLoading', true)
        .set('searchText', searchText)
        .set('sorting', sorting);

      expect(usersReducer(state, getUsers({ sorting, searchText }))).toEqual(
        obj,
      );
    });

    it('sorting is null', () => {
      const obj = state
        .set('getUsersLoading', true)
        .set('searchText', searchText)
        .set('sorting', state.get('sorting'));

      expect(usersReducer(state, getUsers({ searchText }))).toEqual(obj);
    });

    it('searchText is NOT STRING', () => {
      const obj = state
        .set('getUsersLoading', true)
        .set('searchText', state.get('searchText'))
        .set('sorting', state.get('sorting'));

      expect(usersReducer(state, getUsers({}))).toEqual(obj);
    });
  });

  describe('getUsersSuccess', () => {
    let users = [];
    let loadMore = false;

    it('users.length < limit', () => {
      users = [];

      const obj = state
        .set('getUsersLoading', false)
        .set('users', users)
        .set('isLastFetch', true)
        .set('skip', 50);

      expect(usersReducer(state, getUsersSuccess(users, loadMore))).toEqual(
        obj,
      );
    });

    it('users.length === limit', () => {
      users = Array(initialState.get('limit')).fill();

      const obj = state
        .set('getUsersLoading', false)
        .set('users', users)
        .set('isLastFetch', false)
        .set('skip', 50);

      expect(usersReducer(state, getUsersSuccess(users, loadMore))).toEqual(
        obj,
      );
    });

    it('loadMore is TRUE', () => {
      loadMore = true;
      users = [];

      const obj = state
        .set('getUsersLoading', false)
        .set('users', state.toJS().users.concat(users))
        .set('isLastFetch', true)
        .set('skip', 50);

      expect(usersReducer(state, getUsersSuccess(users, loadMore))).toEqual(
        obj,
      );
    });
  });

  it('getUsersErr', () => {
    const getUsersError = 'getUsersError';

    const obj = state
      .set('getUsersLoading', false)
      .set('getUsersError', getUsersError);

    expect(usersReducer(state, getUsersErr(getUsersError))).toEqual(obj);
  });
});
