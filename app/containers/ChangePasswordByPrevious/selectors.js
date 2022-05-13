import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordByPrevious state domain
 */

const selectChangePasswordByPreviousDomain = (state) =>
  state.get('changePasswordByPrevious', initialState).toJS();

const selectContent = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    (subState) => subState.content,
  );

const selectShowModal = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    (subState) => subState.showModal,
  );

const selectChangePasswordProcessing = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    (subState) => subState.changePasswordProcessing,
  );

const selectChangePasswordError = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    (subState) => subState.changePasswordError,
  );

const selectEmail = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    (subState) => subState.email,
  );

const selectVerificationCode = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    (subState) => subState.verificationCode,
  );

export {
  selectChangePasswordByPreviousDomain,
  selectContent,
  selectShowModal,
  selectChangePasswordProcessing,
  selectChangePasswordError,
  selectEmail,
  selectVerificationCode,
};
