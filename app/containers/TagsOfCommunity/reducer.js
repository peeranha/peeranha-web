/* 
  *
  * TagsOfCommunity reducer
  * 
 */

import { fromJS } from 'immutable';
import { RESET_EDIT_TAG_DATA, SET_EDIT_TAG_DATA } from './constants';

const initialState = fromJS({
  editTagData: null,
});

const tagsOfCommunityReducer = (state = initialState, action) => {
  const { type, editTagData } = action;

  switch (type) {
    case SET_EDIT_TAG_DATA:
      return state.set('editTagData', editTagData);

    case RESET_EDIT_TAG_DATA:
      return state.set('editTagData', null);

    default:
      return state;
  }
};

export default tagsOfCommunityReducer;
