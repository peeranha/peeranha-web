import { fromJS } from 'immutable';

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

export const initialState = fromJS({
  documentationLoading: true,
  documentation: [],
  faqError: '',
  isEdit: false,
  editArticle: { id: '', parentId: '' },
  isEditArticle: false,
  tempSavedContent: [],
  isLoading: false,
  documentationMenuDraft: [],
  activeViewArticle: '',
});

function documentationReducer(
  state = initialState,
  action: {
    type: string;
    documentationError: any;
    documentationSection: any;
    id: string;
    ipfsHash: string;
    parentId: string;
    menu: any;
    isEditArticle: boolean;
  },
) {
  const {
    type,
    documentationSection,
    documentationError,
    id,
    parentId,
    ipfsHash,
    menu,
    isEditArticle,
  } = action;

  switch (type) {
    case GET_DOCUMENTATION:
      return state.set('documentationLoading', true);
    case GET_DOCUMENTATION_SUCCESS:
      return state
        .set('documentationLoading', false)
        .set(
          'documentation',
          documentationSection
            ? state.get('documentation').push(documentationSection)
            : state.get('documentation'),
        );
    case GET_DOCUMENTATION_ERROR:
      return state
        .set('documentationLoading', false)
        .set('documentationError', documentationError);
    case TOGGLE_EDIT_DOCUMENTATION:
      return state.set('isEdit', !state.get('isEdit'));
    case SET_EDIT_DOCUMENTATION:
      return state.set('editArticle', { id, parentId });
    case VIEW_ARTICLE:
      return state.set('editArticle', { id, parentId: '' });
    case SET_EDIT_ARTICLE:
      return state.set('isEditArticle', isEditArticle);
    case SAVE_ARTICLE_TO_IPFS:
      return state.set('isLoading', true);
    case SAVE_ARTICLE_TO_IPFS_SUCCESS:
      return state
        .set('isLoading', false)
        .set('tempSavedContent', state.get('tempSavedContent').push(ipfsHash));
    case SAVE_MENU_DRAFT:
      return state.set('documentationMenuDraft', menu);
    case UPDATE_DOCUMENTATION_MENU:
      return state.set('documentationLoading', true);
    case UPDATE_DOCUMENTATION_MENU_SUCCESS:
      return state.set('documentationLoading', false);
    case UPDATE_DOCUMENTATION_MENU_FAILED:
      return state.set('documentationLoading', false);
    default:
      return state;
  }
}

export default documentationReducer;
