import { fromJS } from 'immutable';

import { SHOW_LEFT_MENU, HIDE_LEFT_MENU } from './constants';

export const initialState = fromJS({
  isMenuVisible: false,
});

function appWrapperReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SHOW_LEFT_MENU:
      return state.set('isMenuVisible', !state.get('isMenuVisible'));
    case HIDE_LEFT_MENU:
      return state.set('isMenuVisible', false);
    default:
      return state;
  }
}

export default appWrapperReducer;
