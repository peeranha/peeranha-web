import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sign state domain
 */

const selectSignUpDomain = state => state.get('sign', initialState);

const makeSelectSign = () =>
  createSelector(selectSignUpDomain, substate => substate.toJS());

export default makeSelectSign;
export { selectSignUpDomain };
