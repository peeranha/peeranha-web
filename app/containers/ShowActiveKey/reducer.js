/*
 *
 * ShowActiveKey reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  SHOW_ACTIVE_KEY,
  SHOW_ACTIVE_KEY_SUCCESS,
  SHOW_ACTIVE_KEY_ERROR,
  SHOW_ACTIVE_KEY_MODAL,
  HIDE_ACTIVE_KEY_MODAL,
  REMOVE_ACTIVE_KEY,
  SEND_FB_VERIFICATION_EMAIL,
  SET_SHOW_ACTIVE_KEY_PROCESSING,
} from './constants';

export const initialState = fromJS({
  showModal: false,
  showActiveKeyProcessing: false,
  showActiveKeyError: null,
  activeKey: null,
});

function showActiveKeyReducer(state = initialState, action) {
  const { type, showActiveKeyError, activeKey, processing } = action;

  switch (type) {
    case SHOW_ACTIVE_KEY_MODAL:
      return state.set('showModal', true);
    case HIDE_ACTIVE_KEY_MODAL:
      return state.set('showModal', false);

    case REMOVE_ACTIVE_KEY:
      return state.set('activeKey', initialState.get('activeKey'));

    case SHOW_ACTIVE_KEY:
    case SEND_FB_VERIFICATION_EMAIL:
      return state.set('showActiveKeyProcessing', true);
    case SHOW_ACTIVE_KEY_SUCCESS:
      return state
        .set('showActiveKeyProcessing', false)
        .set('activeKey', activeKey)
        .set('showModal', initialState.get('showModal'));
    case SHOW_ACTIVE_KEY_ERROR:
      return state
        .set('showActiveKeyProcessing', false)
        .set('showActiveKeyError', showActiveKeyError);

    case SET_SHOW_ACTIVE_KEY_PROCESSING:
      return state.set('showActiveKeyProcessing', processing);

    case LOCATION_CHANGE:
      return initialState;

    default:
      return state;
  }
}

export default showActiveKeyReducer;
