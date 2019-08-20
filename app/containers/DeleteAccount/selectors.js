import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the deleteAccount state domain
 */

const selectDeleteAccountDomain = state =>
  state.get('deleteAccount', initialState).toJS();

const selectContent = () =>
  createSelector(selectDeleteAccountDomain, substate => substate.content);

const selectShowModal = () =>
  createSelector(selectDeleteAccountDomain, substate => substate.showModal);

const selectSendEmailProcessing = () =>
  createSelector(
    selectDeleteAccountDomain,
    substate => substate.sendEmailProcessing,
  );

const selectSendEmailError = () =>
  createSelector(
    selectDeleteAccountDomain,
    substate => substate.sendEmailError,
  );

const selectDeleteAccountProcessing = () =>
  createSelector(
    selectDeleteAccountDomain,
    substate => substate.deleteAccountProcessing,
  );

const selectDeleteAccountError = () =>
  createSelector(
    selectDeleteAccountDomain,
    substate => substate.deleteAccountError,
  );

export {
  selectDeleteAccountDomain,
  selectContent,
  selectShowModal,
  selectSendEmailProcessing,
  selectSendEmailError,
  selectDeleteAccountProcessing,
  selectDeleteAccountError,
};
