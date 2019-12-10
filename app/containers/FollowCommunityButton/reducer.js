import { fromJS } from 'immutable';
import {
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
} from './constants';

export const initialState = fromJS({
  followHandlerLoading: false,
  followHandlerError: null,
  ids: new Set(),
});

function followCommunityButtonReducer(state = initialState, action) {
  const { type, followHandlerError, buttonId } = action;

  switch (type) {
    case FOLLOW_HANDLER:
      return state
        .set('followHandlerLoading', true)
        .set('ids', state.toJS().ids.add(buttonId));
    case FOLLOW_HANDLER_SUCCESS:
      state.toJS().ids.delete(buttonId);
      return state
        .set('followHandlerLoading', false)
        .set('ids', state.toJS().ids);
    case FOLLOW_HANDLER_ERROR:
      state.toJS().ids.delete(buttonId);
      return state
        .set('followHandlerLoading', false)
        .set('followHandlerError', followHandlerError)
        .set('ids', state.toJS().ids);

    default:
      return state;
  }
}

export default followCommunityButtonReducer;
