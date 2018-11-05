/*
 *
 * Toast reducer
 *
 */

import { fromJS } from 'immutable';
import { ADD_TOAST, REMOVE_TOAST } from './constants';

export const initialState = fromJS({
  toasts: [],
});

function toastReducer(state = initialState, action) {
  const { type, toastKey, addedToast } = action;

  switch (type) {
    case ADD_TOAST:
      return state.set('toasts', [
        ...state.get('toasts'),
        {
          ...addedToast,
          toastKey: Math.random()
            .toString()
            .slice(2),
        },
      ]);
    case REMOVE_TOAST:
      return state.set(
        'toasts',
        state.get('toasts').filter(x => x.toastKey !== toastKey),
      );
    default:
      return state;
  }
}

export default toastReducer;
