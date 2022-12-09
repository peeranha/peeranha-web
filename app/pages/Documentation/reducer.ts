import { fromJS } from 'immutable';

import {
  GET_ARTICLE,
  GET_ARTICLE_ERROR,
  GET_ARTICLE_SUCCESS,
  TOGGLE_EDIT_DOCUMENTATION,
  SET_VIEW_ARTICLE,
  SAVE_MENU_DRAFT,
  UPDATE_DOCUMENTATION_MENU,
  SAVE_DRAFTS_IDS,
  UPDATE_DOCUMENTATION_MENU_SUCCESS,
  UPDATE_DOCUMENTATION_MENU_FAILED,
  SET_EDIT_ARTICLE,
  PINNED_ARTICLE,
  REMOVE_ARTICLE,
} from './constants';
import {
  PinnedArticleType,
  DocumentationItemMenuType,
  DocumentationArticle,
} from './types';
import { removeArticle } from 'components/Documentation/helpers';

export const initialState = fromJS({
  documentationLoading: false,
  documentation: [],
  faqError: '',
  isEdit: false,
  editArticleId: '',
  editArticleParentId: '',
  isEditArticle: false,
  viewArticleId: '',
  isLoading: false,
  documentationMenuDraft: [],
  activeViewArticle: '',
  pinnedArticleId: '',
  pinnedArticleTitle: '',
  draftsIds: [],
});

function documentationReducer(
  state = initialState,
  action: {
    type: string;
    documentationError: any;
    documentationArticle: DocumentationArticle;
    id: string;
    parentId: string;
    menu: Array<DocumentationItemMenuType>;
    isEditArticle: boolean;
    pinnedArticle: PinnedArticleType;
    draftsIds: Array<string>;
  },
) {
  const {
    type,
    documentationArticle,
    documentationError,
    id,
    parentId,
    menu,
    isEditArticle,
    pinnedArticle,
    draftsIds,
  } = action;

  switch (type) {
    case GET_ARTICLE:
      return state.set('documentationLoading', true);
    case GET_ARTICLE_SUCCESS:
      return state
        .set('documentationLoading', false)
        .set(
          'documentation',
          documentationArticle
            ? state.get('documentation').push(documentationArticle)
            : state.get('documentation'),
        );
    case GET_ARTICLE_ERROR:
      return state
        .set('documentationLoading', false)
        .set('documentationError', documentationError);
    case TOGGLE_EDIT_DOCUMENTATION:
      return state.set('isEdit', !state.get('isEdit'));
    case SET_VIEW_ARTICLE:
      return state.set('viewArticleId', id);
    case SET_EDIT_ARTICLE:
      return state
        .set('editArticleId', id)
        .set('editArticleParentId', parentId)
        .set('isEditArticle', isEditArticle);
    case REMOVE_ARTICLE:
      return state
        .set(
          'documentationMenuDraft',
          removeArticle(state.get('documentationMenuDraft'), id),
        )
        .set(
          'pinnedArticleId',
          state.get('pinnedArticleId') === id
            ? ''
            : state.get('pinnedArticleId'),
        )
        .set(
          'pinnedArticleTitle',
          state.get('pinnedArticleId') === id
            ? ''
            : state.get('pinnedArticleTitle'),
        );
    case SAVE_MENU_DRAFT:
      return state.set('documentationMenuDraft', menu);
    case SAVE_DRAFTS_IDS:
      return state.set('draftsIds', draftsIds);
    case UPDATE_DOCUMENTATION_MENU:
      return state.set('documentationLoading', true);
    case UPDATE_DOCUMENTATION_MENU_SUCCESS:
      return state.set('documentationLoading', false);
    case UPDATE_DOCUMENTATION_MENU_FAILED:
      return state.set('documentationLoading', false);
    case PINNED_ARTICLE:
      return state
        .set('pinnedArticleId', pinnedArticle.id)
        .set('pinnedArticleTitle', pinnedArticle.title);
    default:
      return state;
  }
}

export default documentationReducer;
