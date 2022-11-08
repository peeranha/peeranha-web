import { keyframes } from '@emotion/react';
import { DocumentationItemMenuType } from 'pages/Documentation/types';
import { DocumentationSection } from '../../pages/Documentation/types';

const TEMP_SAVED_CONTENT = 'tempSavedContent';
const DRAFTS_IDS = 'draftsIds';

export const updateMenu = (
  documentationMenu: Array<DocumentationItemMenuType>,
): Array<DocumentationItemMenuType> =>
  documentationMenu.map((item) => ({
    label: item.title,
    value: item.id,
    items: updateMenu(item.children),
  }));

export const initMenu = (
  documentationMenu: Array<DocumentationItemMenuType>,
) => [
  {
    label: 'Documentation',
    value: '1',
    items: updateMenu(documentationMenu),
  },
];

export const getSavedDraftsIds = (): Array<string> => {
  if (localStorage.getItem(DRAFTS_IDS)) {
    return JSON.parse(localStorage.getItem(DRAFTS_IDS));
  }

  return [];
};

export const saveDraftsIds = (draftId: string): Array<string> => {
  const draftsIds = getSavedDraftsIds();

  localStorage.setItem(DRAFTS_IDS, JSON.stringify([...draftsIds, draftId]));

  return [...draftsIds, draftId];
};

export const saveDraft = (menu: Array<DocumentationItemMenuType>): void => {
  localStorage.setItem(TEMP_SAVED_CONTENT, JSON.stringify(menu));
};

export const getSavedDraft = (id: string) => {
  if (localStorage.getItem(TEMP_SAVED_CONTENT)) {
    const drafts: Array<DocumentationItemMenuType> = JSON.parse(
      localStorage.getItem(TEMP_SAVED_CONTENT),
    );

    return drafts.find((item) => item.id === id)?.id || '';
  }

  return '';
};

export const getSavedDrafts = (): Array<DocumentationItemMenuType> => {
  if (localStorage.getItem(TEMP_SAVED_CONTENT)) {
    const drafts = JSON.parse(localStorage.getItem(TEMP_SAVED_CONTENT));

    return drafts;
  }

  return [];
};

export const clearSavedDrafts = () => {
  localStorage.removeItem(TEMP_SAVED_CONTENT);
  localStorage.removeItem(DRAFTS_IDS);
};

export const addArticle = (
  documentationMenu: Array<DocumentationItemMenuType> = [],
  { id, parentId, title }: { id: string; parentId: string; title: string },
) => {
  const newMenu: Array<DocumentationItemMenuType> = [];

  if (documentationMenu.map((item) => item.id).includes(id)) {
    return documentationMenu;
  }

  if (parentId === '1') {
    return [...documentationMenu, { id, title, children: [] }];
  }

  documentationMenu.forEach((item) => {
    newMenu.push({
      ...item,
      children:
        parentId === item.id
          ? [...item.children, { id, title, children: [] }]
          : addArticle(item.children, { id, parentId, title }),
    });
  });

  return newMenu;
};

export const updateMenuDraft = (
  documentationMenu: Array<DocumentationItemMenuType> = [],
  {
    id,
    prevId,
    parentId,
    title,
  }: { id: string; prevId: string; parentId: string; title: string },
): Array<DocumentationItemMenuType> =>
  documentationMenu.map((item) => {
    if (item.id === prevId) {
      return {
        id,
        title,
        children: item.children,
      };
    }

    return {
      ...item,
      children: updateMenuDraft(item.children, { id, prevId, parentId, title }),
    };
  });

export const removeArticle = (
  documentationMenu: Array<DocumentationItemMenuType>,
  id: string,
) => {
  const cleanedMenu: Array<DocumentationItemMenuType> = [];

  documentationMenu.forEach((item) => {
    if (item.id !== id) {
      cleanedMenu.push({
        ...item,
        children: removeArticle(item.children, id),
      });
    }
  });

  return cleanedMenu;
};

export const animationDocumentation = (screenWidth: number) =>
  keyframes({
    '0%': {
      left: '100%',
    },
    '80%': {
      left: screenWidth + 50,
    },
    '90%': {
      left: screenWidth + 100,
    },
    '95%': {
      left: screenWidth + 75,
    },
    '100%': {
      left: screenWidth + 86,
    },
  });

export const isEditableChildItem = (
  item: DocumentationSection,
  editedItemId?: string,
): boolean => {
  if (item.children && editedItemId) {
    const isFoundItem = item.children.find(
      (child: DocumentationSection) => editedItemId === child.id,
    );

    if (isFoundItem) {
      return true;
    }

    return item.children.some((childItem) =>
      isEditableChildItem(childItem, editedItemId),
    );
  }
  return false;
};
