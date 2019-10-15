import {
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  SET_DEFAULT_STORE,
} from './constants';
/*
 *
 * createCommunity actions
 *
 */

export function createCommunity(community, reset) {
  return {
    type: CREATE_COMMUNITY,
    community,
    reset,
  };
}

export function createCommunitySuccess() {
  return {
    type: CREATE_COMMUNITY_SUCCESS,
  };
}

export function createCommunityErr(createCommunityError) {
  return {
    type: CREATE_COMMUNITY_ERROR,
    createCommunityError,
  };
}

export function setDefaultStore() {
  return {
    type: SET_DEFAULT_STORE,
  };
}
