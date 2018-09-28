import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAccountInitializerDomain = state =>
  state.get('accountInitializer', initialState);

const makeSelectAccountInitializer = () =>
  createSelector(selectAccountInitializerDomain, substate => substate);

export default makeSelectAccountInitializer;
export { selectAccountInitializerDomain };
