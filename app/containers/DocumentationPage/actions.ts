import {
  GET_DOCUMENTATION,
  GET_DOCUMENTATION_ERROR,
  GET_DOCUMENTATION_SUCCESS,
} from 'containers/DocumentationPage/constants';

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
