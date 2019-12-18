import { fromJS } from 'immutable';

import { GET_TERMS, GET_TERMS_SUCCESS, GET_TERMS_ERROR } from './constants';

export const initialState = fromJS({
  terms: null,
  getTermsProcessing: false,
  getTermsError: null,
});

function termsOfServiceReducer(state = initialState, action) {
  const { type, terms, getTermsError } = action;

  switch (type) {
    case GET_TERMS:
      return state.set('getTermsProcessing', true);
    case GET_TERMS_SUCCESS:
      return state.set('getTermsProcessing', false).set('terms', terms);
    case GET_TERMS_ERROR:
      return state
        .set('getTermsProcessing', false)
        .set('getTermsError', getTermsError);

    default:
      return state;
  }
}

export default termsOfServiceReducer;
