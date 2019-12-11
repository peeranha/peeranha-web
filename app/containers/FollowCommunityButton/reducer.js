import { fromJS } from 'immutable';
import {
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
} from './constants';

export const initialState = fromJS({
  followHandlerLoading: false,
  followHandlerError: null,
  ids: [],
});

function followCommunityButtonReducer(state = initialState, action) {
  const { type, followHandlerError, buttonId } = action;

  switch (type) {
    case FOLLOW_HANDLER:
      return state
        .set('followHandlerLoading', true)
        .set('ids', [...state.toJS().ids, buttonId]);
    case FOLLOW_HANDLER_SUCCESS:
      return state
        .set('followHandlerLoading', false)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));
    case FOLLOW_HANDLER_ERROR:
      return state
        .set('followHandlerLoading', false)
        .set('followHandlerError', followHandlerError)
        .set('ids', state.toJS().ids.filter(x => x !== buttonId));

    default:
      return state;
  }
}

export default followCommunityButtonReducer;
