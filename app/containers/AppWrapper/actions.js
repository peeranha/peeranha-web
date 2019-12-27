import { SHOW_LEFT_MENU, HIDE_LEFT_MENU } from './constants';

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
