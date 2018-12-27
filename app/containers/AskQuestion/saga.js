/* eslint consistent-return: 0 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import createdHistory from 'createdHistory';

import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import { addToast } from 'containers/Toast/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  postQuestion,
  getQuestionsPostedByUser,
} from 'utils/questionsManagement';
import { getProfileInfo } from 'utils/profileManagement';

import { ASK_QUESTION } from './constants';
import { askQuestionSuccess, askQuestionError } from './actions';
import { postQuestionValidator } from './validate';

export function* postQuestionWorker(res) {
  const locale = yield select(makeSelectLocale());

  try {
    const eosService = yield select(selectEos);
    const profileInfo = yield call(() => getProfileInfo(res.user, eosService));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      postQuestionValidator(profileInfo, res.postButtonId, res.translations),
    );

    if (!isValid) {
      return yield put(askQuestionError());
    }

    yield call(() => postQuestion(res.user, res.questionData, eosService));

    yield put(
      addToast({
        type: 'success',
        text:
          translationMessages[locale]['app.containers.Other.successMessage'],
      }),
    );

    yield put(askQuestionSuccess());

    const questionsPostedByUser = yield call(() =>
      getQuestionsPostedByUser(eosService, res.user),
    );

    yield call(() => createdHistory.push(questionsPostedByUser[0].question_id));
  } catch (err) {
    yield put(
      addToast({
        type: 'error',
        text: translationMessages[locale]['app.containers.Other.errorMessage'],
      }),
    );

    yield put(askQuestionError(err.message));
  }
}

export default function*() {
  yield takeLatest(ASK_QUESTION, postQuestionWorker);
}
