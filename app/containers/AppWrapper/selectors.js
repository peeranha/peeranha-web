import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppWrapperDomain = state => state.get('appWrapper', initialState);

const selectIsMenuVisible = () =>
  createSelector(selectAppWrapperDomain, substate =>
    substate.get('isMenuVisible'),
  );

const selectDocumentationMenu = () =>
  createSelector(selectAppWrapperDomain, substate =>
    substate.get('documentationMenu'),
  );

const selectDocumentationNotIncluded = () =>
  createSelector(selectAppWrapperDomain, substate =>
    substate.get('documentationNotIncluded'),
  );

export {
  selectAppWrapperDomain,
  selectIsMenuVisible,
  selectDocumentationMenu,
  selectDocumentationNotIncluded,
};
