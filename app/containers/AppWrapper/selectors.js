import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppWrapperDomain = (state) => state.get('appWrapper', initialState);

const selectIsMenuVisible = () =>
  createSelector(selectAppWrapperDomain, (substate) =>
    substate.get('isMenuVisible'),
  );

const selectDocumentationMenu = () =>
  createSelector(selectAppWrapperDomain, (substate) =>
    substate.get('documentationMenu'),
  );

export { selectAppWrapperDomain, selectIsMenuVisible, selectDocumentationMenu };
