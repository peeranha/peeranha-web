/*
 *
 * Profile reducer
 *
 */

import { fromJS } from 'immutable';

/* eslint-disable */
import { LOCATION_FIELD } from 'containers/Profile/constants';
import {
  GET_PROFILE_INFORMATION,
  GET_PROFILE_INFORMATION_SUCCESS,
  GET_PROFILE_INFORMATION_ERROR,
} from './constants';
/* eslint-enable */

export const initialState = fromJS({
  isProfileLoading: false,
  errorLoadProfile: '',
  profile: null,
  userKey: '',
});

function profileReducer(state = initialState, action) {
  const { type, profile, errorLoadProfile, userKey } = action;

  switch (type) {
    case GET_PROFILE_INFORMATION:
      return state.set('isProfileLoading', true).set('userKey', userKey);
    case GET_PROFILE_INFORMATION_SUCCESS:
      return state.set('isProfileLoading', false).set('profile', profile);
    case GET_PROFILE_INFORMATION_ERROR:
      return state
        .set('isProfileLoading', false)
        .set('profile', null)
        .set('errorLoadProfile', errorLoadProfile);

    default:
      return state;
  }
}

export default profileReducer;
