import {
  GET_DOCUMENTATION,
  GET_DOCUMENTATION_ERROR,
  GET_DOCUMENTATION_SUCCESS,
  TOGGLE_EDIT_DOCUMENTATION,
  SET_EDIT_DOCUMENTATION,
} from './constants';

export function getDocumentation(section: number) {
  return {
    type: GET_DOCUMENTATION,
    section,
  };
}

export function getDocumentationSuccess(documentationSection?: any) {
  return {
    type: GET_DOCUMENTATION_SUCCESS,
    documentationSection,
  };
}

export function getDocumentationError(documentationError: any) {
  return {
    type: GET_DOCUMENTATION_ERROR,
    documentationError,
  };
}

export function toggleEditDocumentation(id: string) {
  return {
    type: TOGGLE_EDIT_DOCUMENTATION,
    id,
  };
}

export function setEditDocumentation(id: string) {
  return {
    type: SET_EDIT_DOCUMENTATION,
    id,
  };
}
