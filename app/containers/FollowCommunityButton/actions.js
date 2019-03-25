/*
 *
 * subscribedHandler actions
 *
 */

import {
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
} from './constants';

export function followHandler(communityIdFilter, isFollowed) {
  return {
    type: FOLLOW_HANDLER,
    communityIdFilter,
    isFollowed,
  };
}

export function followHandlerSuccess() {
  return {
    type: FOLLOW_HANDLER_SUCCESS,
  };
}

export function followHandlerErr(followHandlerError) {
  return {
    type: FOLLOW_HANDLER_ERROR,
    followHandlerError,
  };
}
