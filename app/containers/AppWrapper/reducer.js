import { fromJS } from 'immutable';

import { SHOW_LEFT_MENU, HIDE_LEFT_MENU, CHANGE_LOCALE } from './constants';

export const initialState = fromJS({
  isMenuVisible: false,
  locale: 'en',
});

function appWrapperReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SHOW_LEFT_MENU:
      return state.set('isMenuVisible', !state.get('isMenuVisible'));
    case HIDE_LEFT_MENU:
      return state.set('isMenuVisible', false);
    case CHANGE_LOCALE:
      return state.set('locale', action.locale);
    default:
      return state;
  }
}

export default appWrapperReducer;
