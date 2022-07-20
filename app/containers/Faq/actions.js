import {
  GET_FAQ,
  GET_FAQ_ERROR,
  GET_FAQ_SUCCESS,
} from 'containers/Faq/constants';

export function getFaq({ communityIdFilter }) {
  return {
    type: GET_FAQ,
    communityIdFilter,
  };
}

export function getFaqSuccess(faqList) {
  return {
    type: GET_FAQ_SUCCESS,
    faqList,
  };
}

export function getFaqError(faqError) {
  return {
    type: GET_FAQ_ERROR,
    faqError,
  };
}
