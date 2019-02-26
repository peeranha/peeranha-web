import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';

import {
  getAskedQuestion,
  editQuestion,
  getQuestionData,
} from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { GET_ASKED_QUESTION, EDIT_QUESTION } from './constants';

import {
  getAskedQuestionSuccess,
  getAskedQuestionErr,
  editQuestionSuccess,
  editQuestionErr,
} from './actions';

export function* getAskedQuestionWorker({ questionid }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    const questionData = yield call(() =>
      getQuestionData(eosService, questionid, selectedAccount),
    );

    if (questionData.user !== selectedAccount) {
      yield put(getAskedQuestionErr());
      yield call(() => createdHistory.push(routes.noAccess()));
    }

    const question = yield call(() =>
      getAskedQuestion(questionData.ipfs_link, eosService),
    );

    yield put(getAskedQuestionSuccess(question));
  } catch (err) {
    yield put(getAskedQuestionErr(err));
  }
}

export function* editQuestionWorker({ question, questionid }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    yield call(() =>
      editQuestion(selectedAccount, questionid, question, eosService),
    );

    yield put(editQuestionSuccess());
    yield call(() => createdHistory.push(routes.questionView(questionid)));
  } catch (err) {
    yield put(editQuestionErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_ASKED_QUESTION, getAskedQuestionWorker);
  yield takeLatest(EDIT_QUESTION, editQuestionWorker);
}
