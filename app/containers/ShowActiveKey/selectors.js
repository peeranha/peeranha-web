import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the showActiveKey state domain
 */

const selectShowActiveKeyDomain = state =>
  state.get('showActiveKey', initialState).toJS();

const selectShowModal = () =>
  createSelector(selectShowActiveKeyDomain, substate => substate.showModal);

const selectShowActiveKeyProcessing = () =>
  createSelector(
    selectShowActiveKeyDomain,
    substate => substate.showActiveKeyProcessing,
  );

const selectShowActiveKeyError = () =>
  createSelector(
    selectShowActiveKeyDomain,
    substate => substate.showActiveKeyError,
  );

const selectActiveKey = () =>
  createSelector(selectShowActiveKeyDomain, substate => substate.activeKey);

export {
  selectShowActiveKeyDomain,
  selectShowModal,
  selectShowActiveKeyProcessing,
  selectShowActiveKeyError,
  selectActiveKey,
};
