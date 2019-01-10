import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as routes from 'routes-config';
import { selectEos } from 'containers/EosioProvider/selectors';
import {
  getQuestions,
  getQuestionsFilteredByCommunities,
  getQuestionsForCommunitiesWhereIAm,
  followCommunity,
  unfollowCommunity,
} from 'utils/questionsManagement';

import { getProfileInfo } from 'utils/profileManagement';

import { GET_QUESTIONS, FOLLOW_HANDLER } from './constants';

import {
  getQuestionsSuccess,
  getQuestionsError,
  followHandlerSuccess,
  followHandlerErr,
} from './actions';

const feed = routes.feed();

export function* getQuestionsWorker({
  limit,
  offset,
  communityIdFilter,
  parentPage,
  next,
}) {
  try {
    const eosService = yield select(selectEos);

    const selectedAccount = yield call(() => eosService.getSelectedAccount());
    const profile = yield call(() =>
      getProfileInfo(selectedAccount, eosService),
    );

    const followedCommunities = profile ? profile.followed_communities : null;

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
        getQuestionsForCommunitiesWhereIAm(
          eosService,
          limit,
          offset,
          followedCommunities,
        ),
      );
    }

    yield put(getQuestionsSuccess(questionsList, followedCommunities, next));
  } catch (err) {
    yield put(getQuestionsError(err.message));
  }
}

export function* followHandlerWorker({ communityIdFilter, isFollowed }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    if (isFollowed) {
      yield call(() =>
        unfollowCommunity(eosService, communityIdFilter, selectedAccount),
      );
    } else {
      yield call(() =>
        followCommunity(eosService, communityIdFilter, selectedAccount),
      );
    }

    const profile = yield call(() =>
      getProfileInfo(selectedAccount, eosService),
    );

    const followedCommunities = profile.followed_communities;

    yield put(followHandlerSuccess(followedCommunities));
  } catch (err) {
    yield put(followHandlerErr(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
  yield takeLatest(FOLLOW_HANDLER, followHandlerWorker);
}
