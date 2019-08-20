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

export {
  selectChangeEmailDomain,
  selectShowModal,
  selectChangeEmailProcessing,
  selectChangeEmailError,
};
