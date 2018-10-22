import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginDomain = state => state.get('login', initialState);

const makeSelectContent = () =>
  createSelector(selectLoginDomain, substate => substate.get('content'));

export { makeSelectContent };
