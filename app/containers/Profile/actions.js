/*
 *
 * Profile actions
 *
 */

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

/*
 *
 * getProfileInformation actions
 *
 */

export function getProfileInfo(userKey, account) {
  return {
    type: GET_PROFILE_INFORMATION,
    userKey,
    account,
  };
}

export function getProfileInfoSuccess(profile) {
  return {
    type: GET_PROFILE_INFORMATION_SUCCESS,
    profile,
  };
}

export function getProfileInfoError(errorLoadProfile) {
  return {
    type: GET_PROFILE_INFORMATION_ERROR,
    errorLoadProfile,
  };
}

export function setDefaultProps() {
  return {
    type: SET_DEFAULT_PROPS,
  };
}

/*
 *
 * get citiesList actions
 *
 */

export function getCitiesList(locationSearch) {
  return {
    type: GET_LOCATION_LIST,
    locationSearch,
  };
}

export function getCitiesListSuccess(citiesList) {
  return {
    type: GET_LOCATION_LIST_SUCCESS,
    citiesList,
  };
}

export function getCitiesListError(errorCitiesList) {
  return {
    type: GET_LOCATION_LIST_ERROR,
    errorCitiesList,
  };
}

export function chooseLocation(cityId, city) {
  return {
    type: CHOOSE_CITY_ACTION,
    cityId,
    city,
  };
}
