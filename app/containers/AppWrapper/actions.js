import {
  SHOW_LEFT_MENU,
  HIDE_LEFT_MENU,
  GET_DOCUMENTATION_MENU,
  GET_DOCUMENTATION_MENU_SUCCESS,
  GET_DOCUMENTATION_MENU_ERROR,
} from './constants';

export function showLeftMenu() {
  return {
    type: SHOW_LEFT_MENU,
  };
}

export function hideLeftMenu() {
  return {
    type: HIDE_LEFT_MENU,
  };
}

export function getDocumentationMenu(communityId) {
  return {
    type: GET_DOCUMENTATION_MENU,
    communityId,
  };
}

export function getDocumentationMenuSuccess(documentationMenu) {
  return {
    type: GET_DOCUMENTATION_MENU_SUCCESS,
    documentationMenu,
  };
}

export function getDocumentationMenuError(documentationMenuError) {
  return {
    type: GET_DOCUMENTATION_MENU_ERROR,
    documentationMenuError,
  };
}
