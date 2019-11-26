/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
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
      questionsList = yield call(
        getQuestionsFilteredByCommunities,
        eosService,
        limit,
        offset,
        communityIdFilter,
      );
    }

    // Load all questions
    if (communityIdFilter === 0 && parentPage !== feed) {
      questionsList = yield call(getQuestions, eosService, limit, offset);
    }

    // Load questions for communities where I am
    if (
      communityIdFilter === 0 &&
      parentPage === feed &&
      followedCommunities &&
      followedCommunities.length > 0
    ) {
      questionsList = yield call(
        getQuestionsForFollowedCommunities,
        limit,
        fetcher,
      );
    }

    const users = new Map();

    questionsList.forEach(question => {
      users.set(
        question.user,
        users.get(question.user)
          ? [...users.get(question.user), question]
          : [question],
      );
    });

    // To avoid of fetching same user profiles - remember it and to write userInfo here

    yield all(
      Array.from(users.keys()).map(function*(user) {
        const userInfo = yield call(getUserProfileWorker, { user });

        users.get(user).map(cachedItem => {
          cachedItem.userInfo = userInfo;
        });
      }),
    );

    yield put(getQuestionsSuccess(questionsList, next));
  } catch ({ message }) {
    yield put(getQuestionsError(message));
  }
}

export function* redirectWorker({ communityIdFilter, isFollowed }) {
  yield take(GET_USER_PROFILE_SUCCESS);

  if (window.location.pathname.includes(routes.feed())) {
    yield call(
      createdHistory.push,
      routes.feed(!isFollowed ? communityIdFilter : ''),
    );
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
  yield takeLatest(FOLLOW_HANDLER_SUCCESS, redirectWorker);
}
