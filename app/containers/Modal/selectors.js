import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectModalDomain = state => state.get('modal', initialState);

const makeSelectContent = () =>
  createSelector(selectModalDomain, substate => substate.get('content'));

const makeSelectModalSize = () =>
  createSelector(selectModalDomain, substate => substate.get('modalSize'));

export { selectModalDomain, makeSelectContent, makeSelectModalSize };
