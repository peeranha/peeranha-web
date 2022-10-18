import {
  GET_DOCUMENTATION,
  GET_DOCUMENTATION_ERROR,
  GET_DOCUMENTATION_SUCCESS,
  TOGGLE_EDIT_DOCUMENTATION,
  SET_EDIT_DOCUMENTATION,
  SAVE_ARTICLE_TO_IPFS,
  SAVE_ARTICLE_TO_IPFS_SUCCESS,
  SAVE_ARTICLE_TO_IPFS_FAILED,
  SAVE_MENU_DRAFT,
  VIEW_ARTICLE,
  UPDATE_DOCUMENTATION_MENU,
  UPDATE_DOCUMENTATION_MENU_SUCCESS,
  UPDATE_DOCUMENTATION_MENU_FAILED,
  UPDATE_DOCUMENTATION_MENU_DRAFT,
  SET_EDIT_ARTICLE,
} from './constants';

export function getDocumentation(section: string) {
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

export function toggleEditDocumentation() {
  return {
    type: TOGGLE_EDIT_DOCUMENTATION,
  };
}

export function setEditDocumentation(id: string, parentId: string) {
  return {
    type: SET_EDIT_DOCUMENTATION,
    id,
    parentId,
  };
}

export function setEditArticle(isEditArticle: boolean) {
  return {
    type: SET_EDIT_ARTICLE,
    isEditArticle,
  };
}

export function saveArticleToIpfs(data: { title: string; content: string }) {
  return {
    type: SAVE_ARTICLE_TO_IPFS,
    data,
  };
}

export function saveArticleToIpfsSuccess(ipfsHash: string) {
  return {
    type: SAVE_ARTICLE_TO_IPFS_SUCCESS,
    ipfsHash,
  };
}

export function saveArticleToIpfsFailed() {
  return {
    type: SAVE_ARTICLE_TO_IPFS_FAILED,
  };
}

export function saveMenuDraft(menu: any) {
  return {
    type: SAVE_MENU_DRAFT,
    menu,
  };
}

export function viewArticle(id: string) {
  return {
    type: VIEW_ARTICLE,
    id,
  };
}

export function updateDocumentationMenu(menu: any) {
  return {
    type: UPDATE_DOCUMENTATION_MENU,
    menu,
  };
}

export function updateDocumentationMenuSuccess() {
  return {
    type: UPDATE_DOCUMENTATION_MENU_SUCCESS,
  };
}

export function updateDocumentationMenuFailed() {
  return {
    type: UPDATE_DOCUMENTATION_MENU_FAILED,
  };
}

export function updateDocumentationMenuDraft(menu: any) {
  return {
    type: UPDATE_DOCUMENTATION_MENU_DRAFT,
    menu,
  };
}
