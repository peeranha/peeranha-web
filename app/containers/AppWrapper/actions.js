import {
  SHOW_LEFT_MENU,
  HIDE_LEFT_MENU,
  GET_DOCUMENTATION_MENU,
  GET_DOCUMENTATION_MENU_SUCCESS,
  GET_DOCUMENTATION_MENU_ERROR,
  PINNED_MENU_ITEM,
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

export function getDocumentationMenuSuccess(
  documentationMenu,
  documentationNotIncluded,
) {
  return {
    type: GET_DOCUMENTATION_MENU_SUCCESS,
    documentationMenu,
    documentationNotIncluded,
  };
}

export function getDocumentationMenuError(documentationMenuError) {
  return {
    type: GET_DOCUMENTATION_MENU_ERROR,
    documentationMenuError,
  };
}

export function setPinnedItemMenu(pinnedItem) {
  return {
    type: PINNED_MENU_ITEM,
    pinnedItem,
  };
}
