/* eslint indent: 0 */
import { fromJS } from 'immutable';

import { GET_FAQ, GET_FAQ_ERROR, GET_FAQ_SUCCESS } from './constants';
import FaqList from 'components/QuestionForm/types';

export const initialState = fromJS({
  faqLoading: true,
  faqList: [],
  faqError: '',
});

function faqReducer(
  state = initialState,
  action: { type: string; faqList?: FaqList; faqError: any },
) {
  const { type, faqList = [], faqError } = action;

  switch (type) {
    case GET_FAQ:
      return state.set('faqLoading', true);
    case GET_FAQ_SUCCESS:
      return state.set('faqLoading', false).set('faqList', faqList);
    case GET_FAQ_ERROR:
      return state.set('faqLoading', false).set('faqError', faqError);
    default:
      return state;
  }
}

export default faqReducer;
