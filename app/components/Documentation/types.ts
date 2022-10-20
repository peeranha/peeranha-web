import {
  PinnedArticleType,
  DocumentationItemMenuType,
  DocumentationArticle,
} from 'pages/Documentation/types';

export type EditArticleType = {
  id: string;
  parentId: string;
  isEditArticle: boolean;
};

export type EditDocumentationProps = {
  documentationMenu: Array<DocumentationItemMenuType>;
  toggleEditDocumentation: () => void;
  editArticle: EditArticleType;
  getArticleDocumentationDispatch: (id: string) => void;
  documentation: Array<DocumentationArticle>;
  setEditArticleDispatch: (data: EditArticleType) => void;
  saveMenuDraftDispatch: (data: Array<DocumentationItemMenuType>) => void;
  documentationMenuDraft: Array<DocumentationItemMenuType>;
  updateDocumentationMenuDispatch: (
    data: Array<DocumentationItemMenuType>,
  ) => void;
  isArticleLoading: boolean;
  viewArticleId: string;
  setViewArticleDispatch: (id: string) => void;
  pinnedArticleMenuDraftDispatch: (data: PinnedArticleType) => void;
};

export type DocumentationFormProps = {
  documentationMenu: Array<DocumentationItemMenuType>;
  documentationArticle: DocumentationArticle;
  articleParentId: string;
  updateDocumentationMenuDraft: (
    data: Array<DocumentationItemMenuType>,
  ) => void;
  setViewArticle: (id: string) => void;
  setEditArticle: (data: EditArticleType) => void;
};
