/*
 *
 * DataCacheProvider reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_COMMUNITIES_WITH_TAGS,
  GET_COMMUNITIES_WITH_TAGS_ERROR,
  GET_COMMUNITIES_WITH_TAGS_SUCCESS,
  UPDATE_TAG_OF_COMMUNITY,
  GET_FAQ,
  GET_FAQ_ERROR,
  GET_FAQ_SUCCESS,
  GET_TUTORIAL,
  GET_TUTORIAL_ERROR,
  GET_TUTORIAL_SUCCESS,
  GET_STAT,
  GET_STAT_ERROR,
  GET_STAT_SUCCESS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS,
  REMOVE_USER_PROFILE,
  UPDATE_USER_ACHIEVEMENTS,
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
  getDocumentationLoading: false,
  getFaqError: null,
  tutorial: null,
  getTutorialLoading: false,
  getTutorialError: null,
});

/* eslint no-param-reassign: 0, indent: 0, no-case-declarations: 0 */
function dataCacheProviderReducer(state = initialState, action) {
  const {
    type,
    communities,
    getCommunitiesWithTagsError,
    updatedTagCommId,
    updatedTagId,
    updatedTag,
    getUserProfileError,
    profile,
    user,
    stat,
    getStatError,
    faq,
    getFaqError,
    tutorial,
    getTutorialError,
    userForUpdate,
    updatedAchCount,
  } = action;

  switch (type) {
    case GET_STAT:
      return state.set('statLoading', true);
    case GET_STAT_SUCCESS:
      return state.set('statLoading', false).set('stat', fromJS(stat));
    case GET_STAT_ERROR:
      return state.set('statLoading', false).set('getStatError', getStatError);

    case GET_FAQ:
      return state.set('getDocumentationLoading', true);
    case GET_FAQ_SUCCESS:
      return state
        .set('getDocumentationLoading', false)
        .set('faq', fromJS(faq));
    case GET_FAQ_ERROR:
      return state
        .set('getDocumentationLoading', false)
        .set('getFaqError', getFaqError);

    case GET_TUTORIAL:
      return state.set('getTutorialLoading', true);
    case GET_TUTORIAL_SUCCESS:
      return state
        .set('getTutorialLoading', false)
        .set('tutorial', fromJS(tutorial));
    case GET_TUTORIAL_ERROR:
      return state
        .set('getTutorialLoading', false)
        .set('getTutorialError', getTutorialError);

    case GET_COMMUNITIES_WITH_TAGS:
      return state.set('communitiesLoading', true);
    case GET_COMMUNITIES_WITH_TAGS_SUCCESS:
      return state
        .set('communitiesLoading', false)
        .set('communities', fromJS(communities));

    case GET_COMMUNITIES_WITH_TAGS_ERROR:
      return state
        .set('communitiesLoading', false)
        .set('getCommunitiesWithTagsError', getCommunitiesWithTagsError);

    case UPDATE_TAG_OF_COMMUNITY:
      const updatedCommunities = [
        ...state
          .get('communities')
          .toJS()
          .map((community, i) => {
            if (i === updatedTagCommId) {
              return {
                ...community,
                tags: community.tags.map((tag, j) => {
                  if (j === updatedTagId) return updatedTag;
                  return tag;
                }),
              };
            }
            return community;
          }),
      ];

      return state.set('communities', fromJS(updatedCommunities));

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
              [profile.user]: {
                ...state.get('users').toJS()[profile.profile],
                ...profile,
              },
            })
          : state.get('users'),
      );
    case GET_USER_PROFILE_ERROR:
      return state
        .set('usersLoading', false)
        .set('getUserProfileError', getUserProfileError);

    case UPDATE_USER_ACHIEVEMENTS:
      return state.setIn(
        ['users', `${userForUpdate}`, 'achievements'],
        updatedAchCount,
      );

    default:
      return state;
  }
}

export default dataCacheProviderReducer;
