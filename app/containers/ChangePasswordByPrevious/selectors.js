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

const selectSendEmailProcessingError = () =>
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

export {
  selectChangePasswordByPreviousDomain,
  selectContent,
  selectShowModal,
  selectSendEmailProcessing,
  selectSendEmailProcessingError,
  selectSubmitEmailProcessing,
  selectSubmitEmailError,
  selectChangePasswordProcessing,
  selectChangePasswordError,
};
