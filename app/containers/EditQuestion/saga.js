import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';

import { getAskedQuestion, editQuestion } from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { GET_ASKED_QUESTION, EDIT_QUESTION } from './constants';

import {
  getAskedQuestionSuccess,
  getAskedQuestionErr,
  editQuestionSuccess,
  editQuestionErr,
} from './actions';

export function* getAskedQuestionWorker({ user, link }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    if (user !== selectedAccount) {
      yield put(getAskedQuestionErr());
      yield call(() => createdHistory.push(routes.no_access()));
    }

    const question = yield call(() => getAskedQuestion(link, eosService));

    yield put(getAskedQuestionSuccess(question));
  } catch (err) {
    yield put(getAskedQuestionErr(err));
  }
}

export function* editQuestionWorker({ user, question, questionid }) {
  try {
    const eosService = yield select(selectEos);

    yield call(() => editQuestion(user, questionid, question, eosService));
    yield put(editQuestionSuccess());
    yield call(() => createdHistory.push(routes.question_view(questionid)));
  } catch (err) {
    yield put(editQuestionErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_ASKED_QUESTION, getAskedQuestionWorker);
  yield takeLatest(EDIT_QUESTION, editQuestionWorker);
}
