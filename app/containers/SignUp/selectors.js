import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signup state domain
 */

const selectSignUpDomain = state => state.get('signUp', initialState);

const makeSelectLoading = () =>
  createSelector(selectSignUpDomain, substate => substate.get('loading'));

const makeSelectError = () =>
  createSelector(selectSignUpDomain, substate => substate.get('error'));

const makeSelectRegistered = () =>
  createSelector(selectSignUpDomain, substate => substate.get('registered'));

const makeSelectContent = () =>
  createSelector(selectSignUpDomain, substate => substate.get('content'));

const makeSelectShowModal = () =>
  createSelector(selectSignUpDomain, substate => substate.get('showModal'));

export {
  selectSignUpDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectRegistered,
  makeSelectContent,
  makeSelectShowModal,
};
