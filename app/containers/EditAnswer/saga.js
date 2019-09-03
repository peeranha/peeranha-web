import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { getAnswer, editAnswer } from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { getQuestionData } from 'containers/ViewQuestion/saga';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import {
  GET_ANSWER,
  EDIT_ANSWER,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_ERROR,
} from './constants';

import {
  getAnswerSuccess,
  getAnswerErr,
  editAnswerSuccess,
  editAnswerErr,
} from './actions';

/* eslint eqeqeq: 0 */
export function* getAnswerWorker({ questionId, answerId }) {
  try {
    const eosService = yield select(selectEos);
    const user = yield call(() => eosService.getSelectedAccount());

    const questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    const answer = yield questionData.answers.filter(x => x.id == answerId)[0];

    if (answer.user !== user) {
      yield put(getAnswerErr());
      yield call(() => createdHistory.push(routes.noAccess()));
    }

    const answerBody = yield call(() => getAnswer(answer.ipfs_link));

    yield put(getAnswerSuccess(answerBody));
  } catch (err) {
    yield put(getAnswerErr(err));
  }
}

export function* editAnswerWorker({ answer, questionId, answerId }) {
  try {
    const eosService = yield select(selectEos);
    const user = yield call(() => eosService.getSelectedAccount());

    yield call(() =>
      editAnswer(user, questionId, answerId, answer, eosService),
    );

    yield put(editAnswerSuccess());
    yield call(() =>
      createdHistory.push(routes.questionView(questionId, answerId)),
    );
  } catch (err) {
    yield put(editAnswerErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_ANSWER, getAnswerWorker);
  yield takeLatest(EDIT_ANSWER, editAnswerWorker);
  yield takeLatest(EDIT_ANSWER_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(EDIT_ANSWER_ERROR, errorToastHandlingWithDefaultText);
}
