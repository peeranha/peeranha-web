import { fromJS } from 'immutable';

import {
  SHOW_LEFT_MENU,
  HIDE_LEFT_MENU,
  GET_DOCUMENTATION_MENU_ERROR,
  GET_DOCUMENTATION_MENU_SUCCESS,
  UPDATE_DOCUMENTATION_MENU_DRAFT,
} from './constants';

export const initialState = fromJS({
  isMenuVisible: false,
  documentationMenu: [],
  documentationMenuError: null,
});

function appWrapperReducer(state = initialState, action) {
  const { type, documentationMenu, documentationMenuError, treeMenu } = action;

  switch (type) {
    case SHOW_LEFT_MENU:
      return state.set('isMenuVisible', !state.get('isMenuVisible'));
    case HIDE_LEFT_MENU:
      return state.set('isMenuVisible', false);
    case GET_DOCUMENTATION_MENU_SUCCESS:
      return state.set('documentationMenu', documentationMenu);
    case GET_DOCUMENTATION_MENU_ERROR:
      return state.set('documentationMenuError', documentationMenuError);
    case UPDATE_DOCUMENTATION_MENU_DRAFT:
      return state.set('documentationMenu', treeMenu);
    default:
      return state;
  }
}

export default appWrapperReducer;
