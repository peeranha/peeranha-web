import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

export const selectProfileDomain = state => state.get('profile', initialState);

export const selectIsProfileLoading = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('isProfileLoading'),
  );

export const selectIsImageLoading = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('isImageLoading'),
  );

export const selectErrorLoadProfile = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('errorLoadProfile'),
  );

export const selectUserKey = () =>
  createSelector(selectProfileDomain, substate => substate.get('userKey'));

export const selectProfile = () =>
  createSelector(selectProfileDomain, substate => substate.get('profile'));

export const selectCitiesList = () =>
  createSelector(selectProfileDomain, substate => substate.get('citiesList'));

export const selectLoadingGetCitiesList = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('loadingGetCitiesList'),
  );

export const selectErrorCitiesList = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('errorCitiesList'),
  );
