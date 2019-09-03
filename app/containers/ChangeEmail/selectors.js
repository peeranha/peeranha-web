import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changeEmail state domain
 */

const selectChangeEmailDomain = state =>
  state.get('changeEmail', initialState).toJS();

const selectShowModal = () =>
  createSelector(selectChangeEmailDomain, substate => substate.showModal);

const selectChangeEmailProcessing = () =>
  createSelector(
    selectChangeEmailDomain,
    substate => substate.changeEmailProcessing,
  );

const selectChangeEmailError = () =>
  createSelector(
    selectChangeEmailDomain,
    substate => substate.changeEmailError,
  );

const selectContent = () =>
  createSelector(selectChangeEmailDomain, substate => substate.content);

const selectSendOldEmailProcessing = () =>
  createSelector(
    selectChangeEmailDomain,
    substate => substate.sendOldEmailProcessing,
  );

const selectSendOldEmailError = () =>
  createSelector(
    selectChangeEmailDomain,
    substate => substate.sendOldEmailError,
  );

const selectConfirmOldEmailProcessing = () =>
  createSelector(
    selectChangeEmailDomain,
    substate => substate.confirmOldEmailProcessing,
  );

const selectConfirmOldEmailError = () =>
  createSelector(
    selectChangeEmailDomain,
    substate => substate.confirmOldEmailError,
  );

const selectEmail = () =>
  createSelector(selectChangeEmailDomain, substate => substate.email);

const selectVerificationCode = () =>
  createSelector(
    selectChangeEmailDomain,
    substate => substate.verificationCode,
  );

export {
  selectChangeEmailDomain,
  selectShowModal,
  selectChangeEmailProcessing,
  selectChangeEmailError,
  selectContent,
  selectSendOldEmailProcessing,
  selectSendOldEmailError,
  selectConfirmOldEmailProcessing,
  selectConfirmOldEmailError,
  selectEmail,
  selectVerificationCode,
};
