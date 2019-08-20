/*
 *
 * ShowActiveKey reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SHOW_ACTIVE_KEY,
  SHOW_ACTIVE_KEY_SUCCESS,
  SHOW_ACTIVE_KEY_ERROR,
  SHOW_ACTIVE_KEY_MODAL,
  HIDE_ACTIVE_KEY_MODAL,
} from './constants';

export const initialState = fromJS({
  showModal: false,
  showActiveKeyProcessing: false,
  showActiveKeyError: null,
});

function showActiveKeyReducer(state = initialState, action) {
  const { type, showActiveKeyError } = action;

  switch (type) {
    case SHOW_ACTIVE_KEY_MODAL:
      return state.set('showModal', true);
    case HIDE_ACTIVE_KEY_MODAL:
      return state.set('showModal', false);

    case SHOW_ACTIVE_KEY:
      return state.set('showActiveKeyProcessing', true);
    case SHOW_ACTIVE_KEY_SUCCESS:
      return state.set('showActiveKeyProcessing', false);
    case SHOW_ACTIVE_KEY_ERROR:
      return state
        .set('showActiveKeyProcessing', false)
        .set('showActiveKeyError', showActiveKeyError);

    default:
      return state;
  }
}

export default showActiveKeyReducer;

