import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the showOwnerKey state domain
 */

const selectShowOwnerKeyDomain = state =>
  state.get('showOwnerKey', initialState).toJS();

const selectShowModal = () =>
  createSelector(selectShowOwnerKeyDomain, substate => substate.showModal);

const selectContent = () =>
  createSelector(selectShowOwnerKeyDomain, substate => substate.content);

const selectShowOwnerKeyProcessing = () =>
  createSelector(
    selectShowOwnerKeyDomain,
    substate => substate.showOwnerKeyProcessing,
  );

const selectShowOwnerKeyError = () =>
  createSelector(
    selectShowOwnerKeyDomain,
    substate => substate.showOwnerKeyError,
  );

const selectSendEmailProcessing = () =>
  createSelector(
    selectShowOwnerKeyDomain,
    substate => substate.sendEmailProcessing,
  );

const selectSendEmailError = () =>
  createSelector(selectShowOwnerKeyDomain, substate => substate.sendEmailError);

const selectPassword = () =>
  createSelector(selectShowOwnerKeyDomain, substate => substate.password);

const selectOwnerKey = () =>
  createSelector(selectShowOwnerKeyDomain, substate => substate.ownerKey);

export {
  selectShowOwnerKeyDomain,
  selectShowModal,
  selectOwnerKey,
  selectShowOwnerKeyProcessing,
  selectShowOwnerKeyError,
  selectSendEmailProcessing,
  selectSendEmailError,
  selectPassword,
  selectContent,
};
