import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppWrapperDomain = (state) => state.get('appWrapper', initialState);

const selectIsMenuVisible = () =>
  createSelector(selectAppWrapperDomain, (substate) =>
    substate.get('isMenuVisible'),
  );

export { selectAppWrapperDomain, selectIsMenuVisible };
