import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewProfilePage state domain
 */

const selectViewProfilePageDomain = state =>
  state.get('viewProfileReducer', initialState);

const makeSelectViewProfilePage = () =>
  createSelector(selectViewProfilePageDomain, substate => substate.toJS());

export default makeSelectViewProfilePage;
export { selectViewProfilePageDomain };
