import {
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  SET_DEFAULT_STORE,
  REDIRECT_TO_CREATE_COMMUNITY,
  GET_FORM,
  GET_FORM_PROCESSING,
  GET_FORM_SUCCESS,
  GET_FORM_ERROR,
} from './constants';

export function redirectToCreateCommunity(ev) {
  return {
    type: REDIRECT_TO_CREATE_COMMUNITY,
    buttonId: ev.currentTarget.id,
  };
}

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

export function getForm() {
  return {
    type: GET_FORM,
  };
}

export function getFormProcessing() {
  return {
    type: GET_FORM_PROCESSING,
  };
}

export function getFormSuccess(isFormAvailable) {
  return {
    type: GET_FORM_SUCCESS,
    isFormAvailable,
  };
}

export function getFormError(getFormError) {
  return {
    type: GET_FORM_ERROR,
    getFormError,
  };
}
