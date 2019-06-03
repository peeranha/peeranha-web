import { createSelector } from 'reselect';
import { routeInitialState } from './reducers';

/**
 * Direct selector to the editQuestion state domain
 */

const selectRouteDomain = state => state.get('route', routeInitialState).toJS();

const selectLocation = () =>
  createSelector(selectRouteDomain, substate => substate.location);

export { selectRouteDomain, selectLocation };
