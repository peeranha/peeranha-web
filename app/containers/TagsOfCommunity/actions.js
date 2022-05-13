/*
 *
 * TagsOfCommunity actions
 *
 */

import { SET_EDIT_TAG_DATA, RESET_EDIT_TAG_DATA } from './constants';

export const setEditTagData = (tagId, communityId) => ({
  type: SET_EDIT_TAG_DATA,
  editTagData: {
    communityId,
    tagId,
  },
});

export const resetEditTagData = () => ({ type: RESET_EDIT_TAG_DATA });
