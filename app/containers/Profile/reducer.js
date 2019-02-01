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
  SET_DEFAULT_PROPS,
  GET_LOCATION_LIST,
  GET_LOCATION_LIST_SUCCESS,
  GET_LOCATION_LIST_ERROR,
  CHOOSE_CITY_ACTION,
} from './constants';
/* eslint-enable */

export const initialState = fromJS({
  isProfileLoading: false,
  errorLoadProfile: '',
  profile: null,
  userKey: '',
  citiesList: null,
  locationSearch: '',
  loadingGetCitiesList: false,
  errorCitiesList: '',
});

function profileReducer(state = initialState, action) {
  const {
    type,
    profile,
    cityId,
    city,
    citiesList,
    errorLoadProfile,
    locationSearch,
    errorCitiesList,
    userKey,
  } = action;

  switch (type) {
    case GET_PROFILE_INFORMATION:
      return state.set('isProfileLoading', true).set('userKey', userKey);
    case GET_PROFILE_INFORMATION_SUCCESS:
      return state.set('isProfileLoading', false).set('profile', profile);
    case GET_PROFILE_INFORMATION_ERROR:
      return state
        .set('isProfileLoading', false)
        .set('profile', {})
        .set('errorLoadProfile', errorLoadProfile);
    case GET_LOCATION_LIST:
      return state.set('locationSearch', locationSearch).set('profile', {
        ...state.get('profile'),
        profile: {
          ...state.get('profile').profile,
          [LOCATION_FIELD]: {
            name: locationSearch,
          },
        },
      });
    case GET_LOCATION_LIST_SUCCESS:
      return state
        .set('citiesList', citiesList)
        .set('loadingGetCitiesList', false);
    case GET_LOCATION_LIST_ERROR:
      return state
        .set('loadingGetCitiesList', false)
        .set('errorCitiesList', errorCitiesList);
    case CHOOSE_CITY_ACTION:
      return state.set('profile', {
        ...state.get('profile'),
        profile: {
          ...state.get('profile').profile,
          [LOCATION_FIELD]: {
            id: cityId,
            name: city,
          },
        },
      });
    case SET_DEFAULT_PROPS:
      return initialState;
    default:
      return state;
  }
}

export default profileReducer;
