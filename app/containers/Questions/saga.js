import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { getQuestions } from 'utils/questionsManagement';

import { GET_QUESTIONS_LIST } from './constants';
import { getQuestionsListSuccess, getQuestionsListError } from './actions';

export function* getQuestionsListWorker(res) {
  try {
    const eosService = yield select(selectEos);
    const questionsList = yield call(() =>
      getQuestions(res.limit, eosService, res.offset),
    );
    yield put(getQuestionsListSuccess(questionsList));
  } catch (err) {
    yield put(getQuestionsListError(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS_LIST, getQuestionsListWorker);
}
