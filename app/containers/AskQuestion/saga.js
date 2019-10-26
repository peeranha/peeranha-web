/* eslint consistent-return: 0 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  postQuestion,
  getQuestionsPostedByUser,
} from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
} from 'components/QuestionForm/constants';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import { askQuestionSuccess, askQuestionError } from './actions';

import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
  POST_QUESTION_BUTTON,
  MIN_RATING_TO_POST_QUESTION,
  MIN_ENERGY_TO_POST_QUESTION,
} from './constants';

export function* postQuestionWorker({ val }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield select(makeSelectAccount());

    const questionData = {
      title: val[FORM_TITLE],
      content: val[FORM_CONTENT],
      community: val[FORM_COMMUNITY],
      chosenTags: val[FORM_TAGS],
    };

    yield call(checkReadinessWorker);

    yield call(() => postQuestion(selectedAccount, questionData, eosService));

    yield put(askQuestionSuccess());

    const questionsPostedByUser = yield call(() =>
      getQuestionsPostedByUser(eosService, selectedAccount),
    );

    yield call(() => createdHistory.push(questionsPostedByUser[0].question_id));
  } catch (err) {
    yield put(askQuestionError(err.message));
  }
}

// TODO: test
export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || POST_QUESTION_BUTTON,
    minRating: MIN_RATING_TO_POST_QUESTION,
    minEnergy: MIN_ENERGY_TO_POST_QUESTION,
  });
}

// TODO: test
/* eslint no-empty: 0 */
export function* redirectToAskQuestionPageWorker({ buttonId }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, routes.questionAsk());
  } catch (err) {}
}

export default function*() {
  yield takeLatest(ASK_QUESTION, postQuestionWorker);
  yield takeLatest(ASK_QUESTION_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(ASK_QUESTION_ERROR, errorToastHandlingWithDefaultText);
}
