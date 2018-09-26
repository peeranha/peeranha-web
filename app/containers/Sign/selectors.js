import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sign state domain
 */

const selectSignDomain = state => state.get('sign', initialState);

const makeSelectSign = () =>
  createSelector(selectSignDomain, substate => substate.toJS());

export default makeSelectSign;
export { selectSignDomain };
