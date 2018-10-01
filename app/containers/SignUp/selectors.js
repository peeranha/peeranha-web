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

const makeSelectRegistred = () =>
  createSelector(selectSignUpDomain, substate => substate.get('registred'));

export {
  selectSignUpDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectRegistred,
};
