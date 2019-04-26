import { fromJS } from 'immutable';
import {
  GET_SUGGESTED_TAGS,
  GET_SUGGESTED_TAGS_SUCCESS,
  GET_SUGGESTED_TAGS_ERROR,
} from './constants';

export const initialState = fromJS({
  tags: [],
  getSuggestedTagsError: null,
  tagsLoading: false,
});

function tagsReducer(state = initialState, action) {
  const { type, getSuggestedTagsError, tags } = action;

  switch (type) {
    case GET_SUGGESTED_TAGS:
      return state.set('tagsLoading', true);
    case GET_SUGGESTED_TAGS_SUCCESS:
      return state.set('tagsLoading', false).set('tags', tags);
    case GET_SUGGESTED_TAGS_ERROR:
      return state
        .set('tagsLoading', false)
        .set('getSuggestedTagsError', getSuggestedTagsError);

    default:
      return state;
  }
}

export default tagsReducer;
