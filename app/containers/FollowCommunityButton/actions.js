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

export function followHandler(communityIdFilter, isFollowed, buttonId) {
  return {
    type: FOLLOW_HANDLER,
    communityIdFilter,
    isFollowed,
    buttonId,
  };
}

export function followHandlerSuccess({ communityIdFilter, isFollowed }) {
  return {
    type: FOLLOW_HANDLER_SUCCESS,
    communityIdFilter,
    isFollowed,
  };
}

export function followHandlerErr(followHandlerError) {
  return {
    type: FOLLOW_HANDLER_ERROR,
    followHandlerError,
  };
}
