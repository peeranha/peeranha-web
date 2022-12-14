export type DocumentationSection = {
  id: string;
  title: string;
  children: Array<DocumentationSection>;

  isDeleted?: boolean;
  content?: string;
};

export type PinnedArticleType = {
  id: string;
  title: string;
};

export type DocumentationItemMenuType = {
  id: string;
  title: string;
  children: Array<DocumentationItemMenuType>;
};

export type DocumentationMenuType = {
  pinnedPost: PinnedArticleType;
  documentations: Array<DocumentationItemMenuType>;
};

export type DocumentationArticle = {
  id: string;
  title: string;
  content: string;
};

export type OutputSelector = {
  isArticleLoading: boolean;
  documentation: Array<DocumentationSection>;
  pinnedItemMenu: PinnedArticleType;
  documentationMenu: Array<DocumentationItemMenuType>;
};

export interface RouterDocumentetion {
  sectionId: string;
}
