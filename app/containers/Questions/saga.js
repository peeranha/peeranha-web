/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
import { take, takeLatest, call, put, select } from 'redux-saga/effects';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { GET_USER_PROFILE_SUCCESS } from 'containers/DataCacheProvider/constants';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';
import { isGeneralQuestion } from 'containers/ViewQuestion/saga';

import { GET_QUESTIONS } from './constants';

import { getQuestionsSuccess, getQuestionsError } from './actions';

import { getPosts, getPostsByCommunityId } from '../../utils/theGraph';

const feed = routes.feed();
const single = isSingleCommunityWebsite();

export function* getQuestionsWorker({
  limit,
  skip,
  postTypes,
  communityIdFilter,
  parentPage,
  next,
  toUpdateQuestions,
}) {
  try {
    const followedCommunities = yield select(makeSelectFollowedCommunities());

    let questionsList = [];

    if (single) {
      communityIdFilter = single;
    }
    if (communityIdFilter > 0) {
      questionsList = yield call(
        getPostsByCommunityId,
        limit,
        skip,
        postTypes,
        [communityIdFilter],
      );
    }

    if (communityIdFilter === 0 && parentPage !== feed) {
      questionsList = yield call(getPosts, limit, skip, postTypes);
    }

    // Load questions for communities where I am
    if (
      communityIdFilter === 0 &&
      parentPage === feed &&
      followedCommunities &&
      followedCommunities.length > 0
    ) {
      questionsList = yield call(
        getPostsByCommunityId,
        limit,
        skip,
        postTypes,
        followedCommunities,
      );
    }

    questionsList.forEach((question) => {
      question.isGeneral = isGeneralQuestion(question);
    });

    yield put(
      getQuestionsSuccess(questionsList, next, toUpdateQuestions, undefined),
    );
  } catch (err) {
    yield put(getQuestionsError(err));
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

export function* updateStoredQuestionsWorker() {
  // TODO for updating promoted questions
  // const eosService = yield select(selectEos);
  // const initLoadedItems = yield select(selectInitLoadedItems());
  // const offset = 0;
  // const communityIdFilter = yield select(selectTypeFilter());
  // const followedCommunities = yield select(makeSelectFollowedCommunities());
  // const parentPage = window.location.pathname;
  // const fetcher = new FetcherOfQuestionsForFollowedCommunities(
  //   Math.floor(1.2 * initLoadedItems),
  //   followedCommunities || [],
  //   eosService,
  // );
  //
  // const next = false;
  // const toUpdateQuestions = true;
  //
  // setCookie({
  //   name: UPDATE_PROMO_QUESTIONS,
  //   value: true,
  // });
  // yield put(
  //   getQuestionsAction(
  //     initLoadedItems,
  //     offset,
  //     communityIdFilter,
  //     parentPage,
  //     fetcher,
  //     next,
  //     toUpdateQuestions,
  //   ),
  // );
}

export default function* () {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
  yield takeLatest(FOLLOW_HANDLER_SUCCESS, redirectWorker);
}
