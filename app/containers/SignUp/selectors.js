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

const makeSelectUserIsInSystem = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('userIsInSystem'),
  );

const makeSelectUserInSystemActionError = () =>
  createSelector(selectSignUpDomain, substate =>
    substate.get('userInSystemActionError'),
  );

export {
  selectSignUpDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectRegistered,
  makeSelectUserIsInSystem,
  makeSelectUserInSystemActionError,
};
