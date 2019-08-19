/* eslint consistent-return: 0 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';

import {
  postQuestion,
  getQuestionsPostedByUser,
} from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import { askQuestionSuccess, askQuestionError } from './actions';
import { postQuestionValidator } from './validate';

import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
} from './constants';

export function* postQuestionWorker({
  user,
  postButtonId,
  translations,
  questionData,
}) {
  try {
    const eosService = yield select(selectEos);
    const profileInfo = yield call(() => getUserProfileWorker({ user }));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      postQuestionValidator(profileInfo, postButtonId, translations),
    );

    if (!isValid) {
      return yield put(askQuestionError());
    }

    yield call(() => postQuestion(user, questionData, eosService));

    yield put(askQuestionSuccess());

    const questionsPostedByUser = yield call(() =>
      getQuestionsPostedByUser(eosService, user),
    );

    yield call(() => createdHistory.push(questionsPostedByUser[0].question_id));
  } catch (err) {
    yield put(askQuestionError(err.message));
  }
}

export default function*() {
  yield takeLatest(ASK_QUESTION, postQuestionWorker);
  yield takeLatest(ASK_QUESTION_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(ASK_QUESTION_ERROR, errorToastHandlingWithDefaultText);
}
