/*
 *
 * Modal reducer
 *
 */

import { fromJS } from 'immutable';
import { CHOOSE_MODAL_CONTENT } from './constants';

export const initialState = fromJS({
  content: null,
  modalSize: 'lg',
});

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_MODAL_CONTENT:
      return state
        .set('content', action.content)
        .set('modalSize', action.modalSize);
    default:
      return state;
  }
}

export default modalReducer;
