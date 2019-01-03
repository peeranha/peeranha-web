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
} from './constants';

export const initialState = fromJS({
  communities: [],
  communitiesLoading: false,
  getCommunitiesWithTagsError: null,
});

function dataCacheProviderReducer(state = initialState, action) {
  const { type, communities, getCommunitiesWithTagsError } = action;

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

    default:
      return state;
  }
}

export default dataCacheProviderReducer;
