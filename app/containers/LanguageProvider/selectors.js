import { createSelector } from 'reselect';
import { initialState } from '../AppWrapper/reducer';

export const selectLocale = state => state.get('appWrapper', initialState);

const makeSelectLocale = () =>
  createSelector(selectLocale, substate => substate.get('locale'));

export { makeSelectLocale };
