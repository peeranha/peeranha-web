import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sign state domain
 */

const selectSignUpDomain = state => state.get('signUp', initialState);

const makeSelectLoading = () =>
  createSelector(selectSignUpDomain, substate => substate.get('loading'));

const makeSelectError = () =>
  createSelector(selectSignUpDomain, substate => substate.get('error'));

const makeSelectRegistered = () =>
  createSelector(selectSignUpDomain, substate => substate.get('registered'));

export {
  selectSignUpDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectRegistered,
};
