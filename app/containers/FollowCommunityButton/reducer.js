import { fromJS } from 'immutable';
import {
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
} from './constants';

export const initialState = fromJS({
  followHandlerLoading: false,
  followHandlerError: null,
});

function followCommunityButtonReducer(state = initialState, action) {
  const { type, followHandlerError } = action;

  switch (type) {
    case FOLLOW_HANDLER:
      return state.set('followHandlerLoading', true);
    case FOLLOW_HANDLER_SUCCESS:
      return state.set('followHandlerLoading', false);
    case FOLLOW_HANDLER_ERROR:
      return state
        .set('followHandlerLoading', false)
        .set('followHandlerError', followHandlerError);

    default:
      return state;
  }
}

export default followCommunityButtonReducer;
