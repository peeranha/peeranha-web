import {
  GET_ARTICLE,
  GET_ARTICLE_ERROR,
  GET_ARTICLE_SUCCESS,
  TOGGLE_EDIT_DOCUMENTATION,
  SET_VIEW_ARTICLE,
  SAVE_MENU_DRAFT,
  SAVE_DRAFTS_IDS,
  UPDATE_DOCUMENTATION_MENU,
  UPDATE_DOCUMENTATION_MENU_SUCCESS,
  UPDATE_DOCUMENTATION_MENU_FAILED,
  UPDATE_DOCUMENTATION_MENU_DRAFT,
  SET_EDIT_ARTICLE,
  PINNED_ARTICLE,
  REMOVE_ARTICLE,
} from './constants';
import {
  PinnedArticleType,
  DocumentationItemMenuType,
  DocumentationArticle,
} from './types';

export function getArticleDocumentation(articleId: string) {
  return {
    type: GET_ARTICLE,
    articleId,
  };
}

export function getArticleDocumentationSuccess(
  documentationArticle?: DocumentationArticle,
) {
  return {
    type: GET_ARTICLE_SUCCESS,
    documentationArticle,
  };
}

export function getArticleDocumentationError(documentationError: any) {
  return {
    type: GET_ARTICLE_ERROR,
    documentationError,
  };
}

export function toggleEditDocumentation() {
  return {
    type: TOGGLE_EDIT_DOCUMENTATION,
  };
}

export function setViewArticle(id: string) {
  return {
    type: SET_VIEW_ARTICLE,
    id,
  };
}

export function setEditArticle({
  isEditArticle,
  id,
  parentId,
}: {
  isEditArticle: boolean;
  id: string;
  parentId: string;
}) {
  return {
    type: SET_EDIT_ARTICLE,
    isEditArticle,
    id,
    parentId,
  };
}

export function removeArticle(id: string) {
  return {
    type: REMOVE_ARTICLE,
    id,
  };
}

export function saveMenuDraft(menu: Array<DocumentationItemMenuType>) {
  return {
    type: SAVE_MENU_DRAFT,
    menu,
  };
}

export function saveDraftsIds(draftsIds: Array<string>) {
  return {
    type: SAVE_DRAFTS_IDS,
    draftsIds,
  };
}

export function updateDocumentationMenu(
  menu: Array<DocumentationItemMenuType>,
) {
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

export function updateDocumentationMenuDraft(
  menu: Array<DocumentationItemMenuType>,
) {
  return {
    type: UPDATE_DOCUMENTATION_MENU_DRAFT,
    menu,
  };
}

export function pinnedArticleMenuDraft(pinnedArticle: PinnedArticleType) {
  return {
    type: PINNED_ARTICLE,
    pinnedArticle,
  };
}
