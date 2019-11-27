/* eslint camelcase: 0 */
import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  getAskedQuestion,
  editQuestion,
  getQuestionById,
} from 'utils/questionsManagement';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import { isValid } from 'containers/EosioProvider/saga';

import { selectEos } from 'containers/EosioProvider/selectors';
import { selectQuestionData } from 'containers/ViewQuestion/selectors';
import { updateQuestionList } from 'containers/ViewQuestion/saga';

import {
  GET_ASKED_QUESTION,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  EDIT_QUESTION_BUTTON,
  MIN_RATING_TO_EDIT_QUESTION,
  MIN_ENERGY_TO_EDIT_QUESTION,
} from './constants';

import {
  getAskedQuestionSuccess,
  getAskedQuestionErr,
  editQuestionSuccess,
  editQuestionErr,
} from './actions';

export function* getAskedQuestionWorker({ questionId }) {
  try {
    const eosService = yield select(selectEos);
    const cachedQuestion = yield select(selectQuestionData());

    let freshQuestion;

    if (!cachedQuestion) {
      const { ipfs_link } = yield call(getQuestionById, eosService, questionId);
      freshQuestion = yield call(getAskedQuestion, ipfs_link, eosService);
    }

    yield put(
      getAskedQuestionSuccess(
        cachedQuestion ? cachedQuestion.content : freshQuestion,
      ),
    );
  } catch (err) {
    yield put(getAskedQuestionErr(err));
  }
}

export function* editQuestionWorker({ question, questionId }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(eosService.getSelectedAccount);
    const cachedQuestion = yield select(selectQuestionData());

    yield call(isValid, {
      buttonId: EDIT_QUESTION_BUTTON,
      minRating: MIN_RATING_TO_EDIT_QUESTION,
      minEnergy: MIN_ENERGY_TO_EDIT_QUESTION,
    });

    yield call(editQuestion, selectedAccount, questionId, question, eosService);

    if (cachedQuestion) {
      cachedQuestion.title = question.title;
      cachedQuestion.content = question;
    }

    yield put(editQuestionSuccess({ ...cachedQuestion }));
    yield call(createdHistory.push, routes.questionView(questionId));
  } catch ({ message }) {
    yield put(editQuestionErr(message));
  }
}

export default function*() {
  yield takeLatest(GET_ASKED_QUESTION, getAskedQuestionWorker);
  yield takeLatest(EDIT_QUESTION, editQuestionWorker);
  yield takeLatest(EDIT_QUESTION_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(EDIT_QUESTION_ERROR, errorToastHandlingWithDefaultText);
  yield takeLatest(EDIT_QUESTION_SUCCESS, updateQuestionList);
}
