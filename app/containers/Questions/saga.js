import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as routes from 'routes-config';
import { selectEos } from 'containers/EosioProvider/selectors';
import {
  getQuestions,
  getQuestionsFilteredByCommunities,
  getQuestionsForFollowedCommunities,
} from 'utils/questionsManagement';

import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';

import { GET_QUESTIONS } from './constants';

import { getQuestionsSuccess, getQuestionsError } from './actions';

const feed = routes.feed();

export function* getQuestionsWorker({
  limit,
  offset,
  communityIdFilter,
  parentPage,
  fetcher,
  next,
}) {
  try {
    const eosService = yield select(selectEos);
    const followedCommunities = yield select(makeSelectFollowedCommunities());

    let questionsList = [];

    // Load questions filtered for some community
    if (communityIdFilter > 0) {
      questionsList = yield call(() =>
        getQuestionsFilteredByCommunities(
          eosService,
          limit,
          offset,
          communityIdFilter,
        ),
      );
    }

    // Load all questions
    if (communityIdFilter === 0 && parentPage !== feed) {
      questionsList = yield call(() => getQuestions(eosService, limit, offset));
    }

    // Load questions for communities where I am
    if (communityIdFilter === 0 && parentPage === feed && followedCommunities) {
      questionsList = yield call(() =>
        getQuestionsForFollowedCommunities(limit, fetcher),
      );
    }

    yield put(getQuestionsSuccess(questionsList, next));
  } catch (err) {
    console.log(err);
    yield put(getQuestionsError(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
}
