import {
  GET_FAQ,
  GET_FAQ_ERROR,
  GET_FAQ_SUCCESS,
} from 'containers/Faq/constants';

export function getQuestions(communityIdFilter) {
  return {
    type: GET_FAQ,
    communityIdFilter,
  };
}

export function getQuestionsSuccess(faqList) {
  return {
    type: GET_FAQ_SUCCESS,
    faqList,
  };
}

export function getQuestionsError(faqError) {
  return {
    type: GET_FAQ_ERROR,
    faqError,
  };
}
