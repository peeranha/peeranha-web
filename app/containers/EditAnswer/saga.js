import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';

import { getAnswer, editAnswer } from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { GET_ANSWER, EDIT_ANSWER } from './constants';

import {
  getAnswerSuccess,
  getAnswerErr,
  editAnswerSuccess,
  editAnswerErr,
} from './actions';

export function* getAnswerWorker({ user, link }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    if (user !== selectedAccount) {
      yield put(getAnswerErr());
      yield call(() => createdHistory.push(routes.no_access()));
    }

    const answer = yield call(() => getAnswer(link));

    yield put(getAnswerSuccess(answer));
  } catch (err) {
    yield put(getAnswerErr(err));
  }
}

export function* editAnswerWorker({ user, answer, questionid, answerid }) {
  try {
    const eosService = yield select(selectEos);

    yield call(() =>
      editAnswer(user, questionid, answerid, answer, eosService),
    );
    yield put(editAnswerSuccess());
    yield call(() => createdHistory.push(routes.question_view(questionid)));
  } catch (err) {
    yield put(editAnswerErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_ANSWER, getAnswerWorker);
  yield takeLatest(EDIT_ANSWER, editAnswerWorker);
}
