import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  getAnswer,
  editAnswer,
  getQuestionById,
} from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import { selectAnswer } from 'containers/ViewQuestion/selectors';

import { isValid } from 'containers/EosioProvider/saga';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import {
  GET_ANSWER,
  EDIT_ANSWER,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_ERROR,
  EDIT_ANSWER_BUTTON,
  MIN_RATING_TO_EDIT_ANSWER,
  MIN_ENERGY_TO_EDIT_ANSWER,
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
    const cachedAnswer = yield select(selectAnswer(answerId));

    let freshAnswer;

    if (!cachedAnswer) {
      const question = yield call(getQuestionById, eosService, questionId);
      const answer = yield question.answers.filter(x => x.id == answerId)[0];

      freshAnswer = yield call(getAnswer, answer.ipfs_link);
    }

    yield put(
      getAnswerSuccess(cachedAnswer ? cachedAnswer.content : freshAnswer),
    );
  } catch (err) {
    yield put(getAnswerErr(err));
  }
}

export function* editAnswerWorker({ answer, questionId, answerId }) {
  try {
    const eosService = yield select(selectEos);
    const user = yield call(eosService.getSelectedAccount);

    yield call(isValid, {
      buttonId: EDIT_ANSWER_BUTTON,
      minRating: MIN_RATING_TO_EDIT_ANSWER,
      minEnergy: MIN_ENERGY_TO_EDIT_ANSWER,
    });

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
