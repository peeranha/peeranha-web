import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import {
  getQuestions,
  getQuestionsFilteredByCommunities,
} from 'utils/questionsManagement';

import { GET_INIT_QUESTIONS, GET_NEXT_QUESTIONS } from './constants';

import {
  getInitQuestionsSuccess,
  getInitQuestionsError,
  getNextQuestionsSuccess,
  getNextQuestionsError,
} from './actions';

export function* getInitQuestionsWorker({ limit, offset, communityIdFilter }) {
  try {
    const eosService = yield select(selectEos);

    let questionsList = [];

    if (communityIdFilter) {
      questionsList = yield call(() =>
        getQuestionsFilteredByCommunities(
          eosService,
          limit,
          offset,
          communityIdFilter,
        ),
      );
    } else {
      questionsList = yield call(() => getQuestions(eosService, limit, offset));
    }

    yield put(getInitQuestionsSuccess(questionsList));
  } catch (err) {
    yield put(getInitQuestionsError(err.message));
  }
}

export function* getNextQuestionsWorker({ limit, offset, communityIdFilter }) {
  try {
    const eosService = yield select(selectEos);

    let questionsList = [];

    if (communityIdFilter) {
      questionsList = yield call(() =>
        getQuestionsFilteredByCommunities(
          eosService,
          limit,
          offset,
          communityIdFilter,
        ),
      );
    } else {
      questionsList = yield call(() => getQuestions(eosService, limit, offset));
    }

    yield put(getNextQuestionsSuccess(questionsList));
  } catch (err) {
    yield put(getNextQuestionsError(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_INIT_QUESTIONS, getInitQuestionsWorker);
  yield takeLatest(GET_NEXT_QUESTIONS, getNextQuestionsWorker);
}
