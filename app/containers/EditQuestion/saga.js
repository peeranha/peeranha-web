/* eslint camelcase: 0 */
import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  getAskedQuestion,
  editQuestion,
  getQuestionById,
} from 'utils/questionsManagement';

import { isValid, isAuthorized } from 'containers/EosioProvider/saga';

import { selectEos } from 'containers/EosioProvider/selectors';
import { selectQuestionData } from 'containers/ViewQuestion/selectors';
import { updateQuestionList } from 'containers/ViewQuestion/saga';

import {
  GET_ASKED_QUESTION,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
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

    yield call(editQuestion, selectedAccount, questionId, question, eosService);

    if (cachedQuestion) {
      cachedQuestion.title = question.title;
      cachedQuestion.tags = question.chosenTags.map(x => x.id);
      cachedQuestion.community_id = question.community.id;
      cachedQuestion.content = { ...question };
    }

    yield put(editQuestionSuccess({ ...cachedQuestion }));
    yield call(createdHistory.push, routes.questionView(questionId));
  } catch (err) {
    yield put(editQuestionErr(err));
  }
}

// TODO: test
export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || EDIT_QUESTION_BUTTON,
    minRating: MIN_RATING_TO_EDIT_QUESTION,
    minEnergy: MIN_ENERGY_TO_EDIT_QUESTION,
  });
}

// TODO: test
/* eslint no-empty: 0 */
export function* redirectToEditQuestionPageWorker({ buttonId, link }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, link);
  } catch (err) {}
}

export default function*() {
  yield takeLatest(GET_ASKED_QUESTION, getAskedQuestionWorker);
  yield takeLatest(EDIT_QUESTION, editQuestionWorker);
  yield takeLatest(EDIT_QUESTION_SUCCESS, updateQuestionList);
}
