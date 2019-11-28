/*
 *
 * EditProfilePage actions
 *
 */

import {
  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_ERROR,
  SET_DEFAULT_REDUCER,
  REDIRECT_TO_EDIT_PROFILE_PAGE,
} from './constants';

/*
 *
 * saveProfile actions
 *
 */

export function saveProfile({ profile, userKey }) {
  return {
    type: SAVE_PROFILE,
    profile,
    userKey,
  };
}

export function saveProfileSuccess() {
  return {
    type: SAVE_PROFILE_SUCCESS,
  };
}

export function saveProfileErr(saveProfileError) {
  return {
    type: SAVE_PROFILE_ERROR,
    saveProfileError,
  };
}

export function setDefaultReducer() {
  return {
    type: SET_DEFAULT_REDUCER,
  };
}

// TODO: test
export function redirectToEditProfilePage(ev) {
  return {
    type: REDIRECT_TO_EDIT_PROFILE_PAGE,
    buttonId: ev.currentTarget.id,
    user: ev.currentTarget.dataset.user,
  };
}
