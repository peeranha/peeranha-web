/*
 *
 * editProfileReducer reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_ERROR,
} from './constants';

export const initialState = fromJS({
  isProfileSaving: false,
  saveProfileError: null,
});

function editProfileReducer(state = initialState, action) {
  const { type, saveProfileError } = action;

  switch (type) {
    case SAVE_PROFILE:
      return state.set('isProfileSaving', true);
    case SAVE_PROFILE_SUCCESS:
      return state.set('isProfileSaving', false);
    case SAVE_PROFILE_ERROR:
      return state
        .set('saveProfileError', saveProfileError)
        .set('isProfileSaving', false);

    default:
      return state;
  }
}

export default editProfileReducer;
