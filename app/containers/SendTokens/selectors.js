import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sendTokens state domain
 */

const selectSendTokensDomain = state =>
  state.get('sendTokens', initialState).toJS();

const selectShowModal = () =>
  createSelector(selectSendTokensDomain, substate => substate.showModal);

const selectSendTokensProcessing = () =>
  createSelector(
    selectSendTokensDomain,
    substate => substate.sendTokensProcessing,
  );

const selectSendTokensError = () =>
  createSelector(selectSendTokensDomain, substate => substate.sendTokensError);

const selectVerifyFbModal = () =>
  createSelector(selectSendTokensDomain, substate => substate.isVerifyFbModal);

const selectFbSendTokensFormValues = () =>
  createSelector(
    selectSendTokensDomain,
    substate => substate.fbSendTokensFormValues,
  );

export {
  selectSendTokensDomain,
  selectShowModal,
  selectVerifyFbModal,
  selectSendTokensProcessing,
  selectSendTokensError,
  selectFbSendTokensFormValues,
};
