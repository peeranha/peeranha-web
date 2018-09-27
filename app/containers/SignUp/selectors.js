import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sign state domain
 */

const selectSignUpDomain = state => state.get('signUp', initialState);

const makeSelectSign = () =>
  createSelector(selectSignUpDomain, substate => substate);

export default makeSelectSign;
export { selectSignUpDomain };
