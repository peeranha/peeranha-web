import { take, takeLatest, call, put, select, all } from 'redux-saga/effects';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { selectEos } from 'containers/EosioProvider/selectors';

import {
  getQuestions,
  getQuestionsFilteredByCommunities,
  getQuestionsForFollowedCommunities,
} from 'utils/questionsManagement';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { GET_USER_PROFILE_SUCCESS } from 'containers/DataCacheProvider/constants';

import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

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
    if (
      communityIdFilter === 0 &&
      parentPage === feed &&
      followedCommunities &&
      followedCommunities.length > 0
    ) {
      questionsList = yield call(() =>
        getQuestionsForFollowedCommunities(limit, fetcher),
      );
    }

    // Got questions
    // Do mapping - to get userProfiles (question's authors)

    /* eslint no-param-reassign: 0 */
    yield all(
      questionsList.map(function*(question) {
        const userInfo = yield call(() =>
          getUserProfileWorker({ user: question.user }),
        );
        question.userInfo = userInfo;
      }),
    );

    yield put(getQuestionsSuccess(questionsList, next));
  } catch (err) {
    yield put(getQuestionsError(err.message));
  }
}

// TODO: test
export function* redirectWorker({ communityIdFilter, isFollowed }) {
  yield take(GET_USER_PROFILE_SUCCESS);

  if (window.location.pathname.includes(routes.feed())) {
    yield call(() =>
      createdHistory.push(routes.feed(!isFollowed ? communityIdFilter : '')),
    );
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
  yield takeLatest(FOLLOW_HANDLER_SUCCESS, redirectWorker);
}
