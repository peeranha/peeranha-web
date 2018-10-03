import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

const selectProfileDomain = state => state.get('profile', initialState);

const makeSelectLoadingProfile = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('loadingProfile'),
  );

const makeSelectLoadingImage = () =>
  createSelector(selectProfileDomain, substate => substate.get('loadingImage'));

const makeSelectErrorProfile = () =>
  createSelector(selectProfileDomain, substate => substate.get('errorProfile'));

const makeSelectErrorUploadImage = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get('errorUploadImage'),
  );

const makeSelectUserKey = () =>
  createSelector(selectProfileDomain, substate => substate.get('userKey'));

const makeSelectProfile = () =>
  createSelector(selectProfileDomain, substate => substate.get('profile'));

const makeSelectImageSrc = () =>
  createSelector(selectProfileDomain, substate => substate.get('imageSrc'));

export {
  selectProfileDomain,
  makeSelectProfile,
  makeSelectLoadingProfile,
  makeSelectLoadingImage,
  makeSelectErrorProfile,
  makeSelectUserKey,
  makeSelectImageSrc,
  makeSelectErrorUploadImage,
};
