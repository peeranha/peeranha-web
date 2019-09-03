import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordByPrevious state domain
 */

const selectChangePasswordByPreviousDomain = state =>
  state.get('changePasswordByPrevious', initialState).toJS();

const selectContent = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    substate => substate.content,
  );

const selectShowModal = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    substate => substate.showModal,
  );

const selectSendEmailProcessing = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    substate => substate.sendEmailProcessing,
  );

const selectSendEmailError = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    substate => substate.sendEmailError,
  );

const selectSubmitEmailProcessing = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    substate => substate.submitEmailProcessing,
  );

const selectSubmitEmailError = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    substate => substate.submitEmailError,
  );

const selectChangePasswordProcessing = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    substate => substate.changePasswordProcessing,
  );

const selectChangePasswordError = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    substate => substate.changePasswordError,
  );

const selectEmail = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    substate => substate.email,
  );

const selectVerificationCode = () =>
  createSelector(
    selectChangePasswordByPreviousDomain,
    substate => substate.verificationCode,
  );

export {
  selectChangePasswordByPreviousDomain,
  selectContent,
  selectShowModal,
  selectSendEmailProcessing,
  selectSendEmailError,
  selectSubmitEmailProcessing,
  selectSubmitEmailError,
  selectChangePasswordProcessing,
  selectChangePasswordError,
  selectEmail,
  selectVerificationCode,
};
