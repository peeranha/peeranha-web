import { fromJS } from 'immutable';

import {
  GET_DOCUMENTATION,
  GET_DOCUMENTATION_ERROR,
  GET_DOCUMENTATION_SUCCESS,
  TOGGLE_EDIT_DOCUMENTATION,
  SET_EDIT_DOCUMENTATION,
} from './constants';

export const initialState = fromJS({
  documentationLoading: true,
  documentation: [],
  faqError: '',
  isEdit: false,
  editArticleId: '',
});

function documentationReducer(
  state = initialState,
  action: {
    type: string;
    documentationError: any;
    documentationSection: any;
    id: string;
  },
) {
  const { type, documentationSection, documentationError, id } = action;

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
      return state.set('isEdit', !state.get('isEdit')).set('editArticleId', id);
    case SET_EDIT_DOCUMENTATION:
      return state.set('editArticleId', id);
    default:
      return state;
  }
}

export default documentationReducer;
