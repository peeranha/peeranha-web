import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectToastDomain = state => state.get('toast', initialState);

const makeSelectToasts = () =>
  createSelector(selectToastDomain, substate => substate.get('toasts'));

export { selectToastDomain, makeSelectToasts };
