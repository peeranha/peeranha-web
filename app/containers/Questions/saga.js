/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
import { take, takeLatest, call, put, select } from 'redux-saga/effects';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { GET_USER_PROFILE_SUCCESS } from 'containers/DataCacheProvider/constants';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';
import { isGeneralQuestion } from 'containers/ViewQuestion/saga';

import {
  CHANGE_QUESTION_FILTER,
  DOWN_QUESTION,
  GET_QUESTIONS,
  LOAD_COMMUNITY_TOP_QUESTIONS,
  MOVE_QUESTION,
  REMOVE_OR_ADD_TOP_QUESTION,
  UP_QUESTION,
} from './constants';

import { getQuestionsSuccess, getQuestionsError } from './actions';

import { getPosts, getPostsByCommunityId } from '../../utils/theGraph';
import { selectEthereum } from '../EthereumProvider/selectors';

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

    questionsList.forEach(question => {
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
  // const ethereumService = yield select(selectEthereum);
  // const initLoadedItems = yield select(selectInitLoadedItems());
  // const offset = 0;
  // const communityIdFilter = yield select(selectTypeFilter());
  // const followedCommunities = yield select(makeSelectFollowedCommunities());
  // const parentPage = window.location.pathname;
  // const fetcher = new FetcherOfQuestionsForFollowedCommunities(
  //   Math.floor(1.2 * initLoadedItems),
  //   followedCommunities || [],
  //   ethereumService,
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

function* changeQuestionFilterWorker({ questionFilter }) {
  if (questionFilter) {
    yield call(loadTopCommunityQuestionsWorker, { init: true });
  }
}

export function* loadTopCommunityQuestionsWorker({ init }) {}

export function* removeOrAddTopQuestionWorker({ id }) {}

function* upQuestionWorker({ id }) {}

function* downQuestionWorker({ id }) {}

function* moveQuestionWorker({ id, position }) {}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
  yield takeLatest(FOLLOW_HANDLER_SUCCESS, redirectWorker);
  yield takeLatest(CHANGE_QUESTION_FILTER, changeQuestionFilterWorker);
  yield takeLatest(
    LOAD_COMMUNITY_TOP_QUESTIONS,
    loadTopCommunityQuestionsWorker,
  );
  yield takeLatest(REMOVE_OR_ADD_TOP_QUESTION, removeOrAddTopQuestionWorker);
  yield takeLatest(UP_QUESTION, upQuestionWorker);
  yield takeLatest(DOWN_QUESTION, downQuestionWorker);
  yield takeLatest(MOVE_QUESTION, moveQuestionWorker);
}
