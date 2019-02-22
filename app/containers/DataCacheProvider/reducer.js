/*
 *
 * DataCacheProvider reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_COMMUNITIES_WITH_TAGS_SUCCESS,
  GET_COMMUNITIES_WITH_TAGS_ERROR,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
} from './constants';

export const initialState = fromJS({
  communities: [],
  communitiesLoading: false,
  getCommunitiesWithTagsError: null,
  users: {},
  usersLoading: false,
  getUserProfileError: null,
});

function dataCacheProviderReducer(state = initialState, action) {
  const {
    type,
    communities,
    getCommunitiesWithTagsError,
    getUserProfileError,
    profile,
  } = action;

  switch (type) {
    case GET_COMMUNITIES_WITH_TAGS:
      return state.set('communitiesLoading', true);
    case GET_COMMUNITIES_WITH_TAGS_SUCCESS:
      return state
        .set('communitiesLoading', false)
        .set('communities', communities);
    case GET_COMMUNITIES_WITH_TAGS_ERROR:
      return state
        .set('communitiesLoading', false)
        .set('getCommunitiesWithTagsError', getCommunitiesWithTagsError);

    case GET_USER_PROFILE:
      return state.set('usersLoading', true);
    case GET_USER_PROFILE_SUCCESS:
      return state.set('usersLoading', false).set('users', {
        ...state.get('users').toJS(),
        [profile.user]: profile,
      });
    case GET_USER_PROFILE_ERROR:
      return state
        .set('usersLoading', false)
        .set('getUserProfileError', getUserProfileError);

    default:
      return state;
  }
}

export default dataCacheProviderReducer;
