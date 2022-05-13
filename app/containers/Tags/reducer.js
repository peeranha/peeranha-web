import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
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
  const { type, sorting, loadMore, existingTags, getExistingTagsError, text } =
    action;

  switch (type) {
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
