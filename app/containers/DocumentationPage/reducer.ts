/* eslint indent: 0 */
import { fromJS } from 'immutable';

import {
  GET_DOCUMENTATION,
  GET_DOCUMENTATION_ERROR,
  GET_DOCUMENTATION_SUCCESS,
} from './constants';

export const initialState = fromJS({
  documentationLoading: true,
  documentation: [],
  faqError: '',
});

function documentationReducer(
  state = initialState,
  action: { type: string; documentationError: any; documentationSection: any },
) {
  const { type, documentationSection, documentationError } = action;

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
    default:
      return state;
  }
}

export default documentationReducer;
