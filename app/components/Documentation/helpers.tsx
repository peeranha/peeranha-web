import { getText } from 'utils/ipfs';

import { keyframes } from '@emotion/react';

const TEMP_SAVED_CONTENT = 'tempSavedContent';

export const updateMenu = (documentationMenu) =>
  documentationMenu.map((item) => ({
    label: item.title,
    value: item.id,
    items: updateMenu(item.children),
  }));

export const initMenu = (documentationMenu) => [
  {
    label: 'Documentation',
    value: '1',
    items: updateMenu(documentationMenu),
  },
];

export const saveDraft = (menu): void => {
  localStorage.setItem(TEMP_SAVED_CONTENT, JSON.stringify(menu));
};

export const getSavedDraft = (id: string) => {
  if (localStorage.getItem(TEMP_SAVED_CONTENT)) {
    const drafts = JSON.parse(localStorage.getItem(TEMP_SAVED_CONTENT));

    return drafts.find((item) => item.id === id)?.id || '';
  }

  return '';
};

export const getSavedDrafts = () => {
  if (localStorage.getItem(TEMP_SAVED_CONTENT)) {
    const drafts = JSON.parse(localStorage.getItem(TEMP_SAVED_CONTENT));

    return drafts;
  }

  return [];
};

export const addArticle = (documentationMenu = [], { id, parentId, title }) => {
  const newMenu = [];

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
  documentationMenu = [],
  { id, prevId, parentId, title },
) =>
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
