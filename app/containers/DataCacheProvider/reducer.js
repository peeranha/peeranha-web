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
  REMOVE_USER_PROFILE,
  GET_STAT,
  GET_STAT_SUCCESS,
  GET_STAT_ERROR,
  GET_FAQ,
  GET_FAQ_SUCCESS,
  GET_FAQ_ERROR,
} from './constants';

export const initialState = fromJS({
  communities: [],
  communitiesLoading: false,
  getCommunitiesWithTagsError: null,
  users: {},
  usersLoading: false,
  getUserProfileError: null,
  stat: {},
  statLoading: false,
  getStatError: null,
  faq: null,
  getFaqLoading: false,
  getFaqError: null,
});

/* eslint no-param-reassign: 0, indent: 0, no-case-declarations: 0 */
function dataCacheProviderReducer(state = initialState, action) {
  const {
    type,
    communities,
    getCommunitiesWithTagsError,
    getUserProfileError,
    profile,
    user,
    stat,
    getStatError,
    faq,
    getFaqError,
  } = action;

  switch (type) {
    case GET_STAT:
      return state.set('statLoading', true);
    case GET_STAT_SUCCESS:
      return state.set('statLoading', false).set('stat', stat);
    case GET_STAT_ERROR:
      return state.set('statLoading', false).set('getStatError', getStatError);

    case GET_FAQ:
      return state.set('getFaqLoading', true);
    case GET_FAQ_SUCCESS:
      return state.set('getFaqLoading', false).set('faq', faq);
    case GET_FAQ_ERROR:
      return state.set('getFaqLoading', false).set('getFaqError', getFaqError);

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

    case REMOVE_USER_PROFILE:
      const users = state.get('users').toJS();
      delete users[user];

      return state.set('users', fromJS(users));

    case GET_USER_PROFILE:
      return state.set('usersLoading', true);
    case GET_USER_PROFILE_SUCCESS:
      return state.set('usersLoading', false).set(
        'users',
        profile
          ? fromJS({
              ...state.get('users').toJS(),
              [profile.user]: profile,
            })
          : state.get('users'),
      );
    case GET_USER_PROFILE_ERROR:
      return state
        .set('usersLoading', false)
        .set('getUserProfileError', getUserProfileError);

    default:
      return state;
  }
}

export default dataCacheProviderReducer;
