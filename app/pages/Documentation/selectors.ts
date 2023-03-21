import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectDocumentationDomain = (state: {
  get: (arg0: string, arg1: any) => any;
}) => state.get('documentationReducer', initialState);

export const selectDocumentationLoading = () =>
  createSelector(selectDocumentationDomain, (substate) =>
    substate.get('documentationLoading'),
  );

export const selectDocumentation = () =>
  createSelector(selectDocumentationDomain, (substate) =>
    substate.get('documentation'),
  );

export const selectDraftsIds = () =>
  createSelector(selectDocumentationDomain, (substate) =>
    substate.get('draftsIds'),
  );

export const selectFaqError = () =>
  createSelector(selectDocumentationDomain, (substate) =>
    substate.get('documentationError'),
  );

export const selectIsEditDocumentation = () =>
  createSelector(selectDocumentationDomain, (substate) =>
    substate.get('isEdit'),
  );

export const selectEditArticle = () =>
  createSelector(selectDocumentationDomain, (substate) => ({
    id: substate.get('editArticleId'),
    parentId: substate.get('editArticleParentId'),
    isEditArticle: substate.get('isEditArticle'),
  }));

export const selectDocumentationMenuDraft = () =>
  createSelector(selectDocumentationDomain, (substate) =>
    substate.get('documentationMenuDraft'),
  );

export const selectViewArticle = () =>
  createSelector(selectDocumentationDomain, (substate) =>
    substate.get('viewArticleId'),
  );

export const selectPinnedArticleDraft = () =>
  createSelector(selectDocumentationDomain, (substate) => ({
    id: substate.get('pinnedArticleId'),
    title: substate.get('pinnedArticleTitle'),
  }));

export const selectEditOrder = () =>
  createSelector(selectDocumentationDomain, (substate) =>
    substate.get('isEditOrder'),
  );
