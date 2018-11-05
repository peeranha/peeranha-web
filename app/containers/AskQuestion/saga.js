import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { postQuestion } from 'utils/questionsManagement';

import { ASK_QUESTION } from './constants';
import { askQuestionSuccess, askQuestionError } from './actions';

export function* askQuestionWorker(res) {
  try {
    const eosService = yield select(selectEos);
    yield call(() => postQuestion(res.user, res.questionData, eosService));
    yield put(askQuestionSuccess());
  } catch (err) {
    yield put(askQuestionError(err.message));
  }
}

export default function*() {
  yield takeLatest(ASK_QUESTION, askQuestionWorker);
}
