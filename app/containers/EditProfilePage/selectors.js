import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

const selectEditProfileDomain = (state) =>
  state.get('editProfileReducer', initialState);

const selectSaveProfileError = () =>
  createSelector(selectEditProfileDomain, (substate) =>
    substate.get('saveProfileError'),
  );

const selectIsProfileSaving = () =>
  createSelector(selectEditProfileDomain, (substate) =>
    substate.get('isProfileSaving'),
  );

export {
  selectEditProfileDomain,
  selectSaveProfileError,
  selectIsProfileSaving,
};
