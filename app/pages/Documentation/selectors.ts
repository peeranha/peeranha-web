import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectFaqDomain = (state: {
  get: (arg0: string, arg1: any) => any;
}) => state.get('documentationReducer', initialState);

export const selectDocumentationLoading = () =>
  createSelector(selectFaqDomain, (substate) =>
    substate.get('documentationLoading'),
  );

export const selectDocumentation = () =>
  createSelector(selectFaqDomain, (substate) => substate.get('documentation'));

export const selectFaqError = () =>
  createSelector(selectFaqDomain, (substate) =>
    substate.get('documentationError'),
  );

export const selectIsEditDocumentation = () =>
  createSelector(selectFaqDomain, (substate) => substate.get('isEdit'));

export const selectEditArticle = () =>
  createSelector(selectFaqDomain, (substate) => ({
    id: substate.get('editArticleId'),
    parentId: substate.get('editArticleParentId'),
    isEditArticle: substate.get('isEditArticle'),
  }));

export const selectDocumentationMenuDraft = () =>
  createSelector(selectFaqDomain, (substate) =>
    substate.get('documentationMenuDraft'),
  );

export const selectViewArticle = () =>
  createSelector(selectFaqDomain, (substate) => substate.get('viewArticleId'));

export const selectPinnedArticleDraft = () =>
  createSelector(selectFaqDomain, (substate) => ({
    id: substate.get('pinnedArticleId'),
    title: substate.get('pinnedArticleTitle'),
  }));
