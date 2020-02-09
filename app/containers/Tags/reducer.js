import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  GET_SUGGESTED_TAGS,
  GET_SUGGESTED_TAGS_SUCCESS,
  GET_SUGGESTED_TAGS_ERROR,
  GET_EXISTING_TAGS,
  GET_EXISTING_TAGS_SUCCESS,
  GET_EXISTING_TAGS_ERROR,
} from './constants';

export const initialState = fromJS({
  suggestedTags: [],
  getSuggestedTagsError: null,
  suggestedTagsLoading: false,
  isLastFetchForSuggestedTags: false,
  sorting: 'id',
  limit: 12,
  existingTags: [],
  getExistingTagsError: null,
  existingTagsLoading: false,
  isLastFetchForExistingTags: false,
  text: '',
});

function tagsReducer(state = initialState, action) {
  const {
    type,
    getSuggestedTagsError,
    suggestedTags,
    sorting,
    loadMore,
    existingTags,
    getExistingTagsError,
    text,
  } = action;

  switch (type) {
    case GET_SUGGESTED_TAGS:
      return state
        .set('suggestedTagsLoading', true)
        .set('sorting', sorting || state.get('sorting'));

    case GET_SUGGESTED_TAGS_SUCCESS:
      return state
        .set('suggestedTagsLoading', false)
        .set(
          'isLastFetchForSuggestedTags',
          suggestedTags.length < initialState.get('limit'),
        )
        .set(
          'suggestedTags',
          loadMore
            ? state.toJS().suggestedTags.concat(suggestedTags)
            : suggestedTags,
        );

    case GET_SUGGESTED_TAGS_ERROR:
      return state
        .set('suggestedTagsLoading', false)
        .set('getSuggestedTagsError', getSuggestedTagsError);

    case GET_EXISTING_TAGS:
      return state
        .set('existingTagsLoading', true)
        .set('text', typeof text === 'string' ? text : state.get('text'))
        .set('sorting', sorting || state.get('sorting'));

    case GET_EXISTING_TAGS_SUCCESS:
      return state
        .set('existingTagsLoading', false)
        .set(
          'isLastFetchForExistingTags',
          existingTags.length < initialState.get('limit'),
        )
        .set(
          'existingTags',
          loadMore
            ? state.toJS().existingTags.concat(existingTags)
            : existingTags,
        );

    case GET_EXISTING_TAGS_ERROR:
      return state
        .set('existingTagsLoading', false)
        .set('getExistingTagsError', getExistingTagsError);

    case LOCATION_CHANGE:
      return state.set('text', initialState.get('text'));

    default:
      return state;
  }
}

export default tagsReducer;
