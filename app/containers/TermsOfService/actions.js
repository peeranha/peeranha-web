import { GET_TERMS, GET_TERMS_SUCCESS, GET_TERMS_ERROR } from './constants';

export function getTerms() {
  return {
    type: GET_TERMS,
  };
}

export function getTermsSuccess(terms) {
  return {
    type: GET_TERMS_SUCCESS,
    terms,
  };
}

export function getTermsErr(getTermsError) {
  return {
    type: GET_TERMS_ERROR,
    getTermsError,
  };
}
