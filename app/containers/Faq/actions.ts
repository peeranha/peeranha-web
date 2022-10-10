import {
  GET_FAQ,
  GET_FAQ_ERROR,
  GET_FAQ_SUCCESS,
} from 'containers/Faq/constants';
import FaqList from 'components/QuestionForm/types';

export function getFaq({ communityIdFilter }: { communityIdFilter: number }) {
  return {
    type: GET_FAQ,
    communityIdFilter,
  };
}

export function getFaqSuccess(faqList: FaqList) {
  return {
    type: GET_FAQ_SUCCESS,
    faqList,
  };
}

export function getFaqError(faqError: any) {
  return {
    type: GET_FAQ_ERROR,
    faqError,
  };
}
