/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { take, takeLatest, call, put, select } from 'redux-saga/effects';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { GET_USER_PROFILE_SUCCESS } from 'containers/DataCacheProvider/constants';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { isGeneralQuestion } from 'containers/ViewQuestion/saga';
import { isSuiBlockchain } from 'utils/sui/sui';
import { getSuiPosts, getSuiPostsByCommunityId } from 'utils/sui/suiIndexer';

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

import { getPosts, getPostsByCommunityId } from 'utils/theGraph';

const feed = routes.feed();
const single = isSingleCommunityWebsite();

export function* getQuestionsWorker({
  limit,
  skip,
  postTypes,
  tags,
  communityIdFilter,
  parentPage,
  next,
  toUpdateQuestions,
}) {
  try {
    const followedCommunities = yield select(makeSelectFollowedCommunities());

    let questionsList = [];
    let counter = skip;

    if (single) {
      communityIdFilter = single;
    }

    if (isSuiBlockchain) {
      const сommunities = yield select(selectCommunities());
      if (communityIdFilter > 0) {
        const communitySuiIdFilter = сommunities.find(
          (community) => community.id === communityIdFilter,
        ).suiId;
        questionsList = yield call(getSuiPostsByCommunityId, limit, skip, postTypes, [
          communitySuiIdFilter,
        ]);
      }
      if (communityIdFilter === 0 && parentPage !== feed) {
        questionsList = yield call(getSuiPosts, limit, skip, postTypes);
      }
      if (
        communityIdFilter === 0 &&
        parentPage === feed &&
        followedCommunities &&
        followedCommunities.length > 0
      ) {
        const communitySuiIdsFilter = сommunities.filter((community) =>
          followedCommunities.includes(community.id),
        );
        questionsList = yield call(
          getSuiPostsByCommunityId,
          limit,
          skip,
          postTypes,
          communitySuiIdsFilter.map((community) => community.suiId),
        );
      }
      questionsList = questionsList.map((question) => ({
        ...question,
        communityId: сommunities.find((community) => community.suiId === question.communityId).id,
      }));

      const clearQuestionsList = questionsList.filter((item) => item.title);
      counter += clearQuestionsList.length;
      yield put(
        getQuestionsSuccess(clearQuestionsList, next, toUpdateQuestions, undefined, counter),
      );
    } else {
      if (communityIdFilter > 0) {
        questionsList = yield call(
          getPostsByCommunityId,
          limit,
          skip,
          postTypes,
          [communityIdFilter],
          tags,
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
          tags,
        );
      }

      questionsList.forEach((question) => {
        question.isGeneral = isGeneralQuestion(question);
      });

      const clearQuestionsList = questionsList.filter((item) => item.title);

      counter += clearQuestionsList.length;
      yield put(
        getQuestionsSuccess(clearQuestionsList, next, toUpdateQuestions, undefined, counter),
      );
    }
  } catch (err) {
    yield put(getQuestionsError(err));
  }
}

export function* redirectWorker({ communityIdFilter, isFollowed }) {
  yield take(GET_USER_PROFILE_SUCCESS);

  if (window.location.pathname.includes(routes.feed())) {
    yield call(createdHistory.push, routes.feed());
  }
}

export function* updateStoredQuestionsWorker() {}

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

export default function* () {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
  yield takeLatest(FOLLOW_HANDLER_SUCCESS, redirectWorker);
  yield takeLatest(CHANGE_QUESTION_FILTER, changeQuestionFilterWorker);
  yield takeLatest(LOAD_COMMUNITY_TOP_QUESTIONS, loadTopCommunityQuestionsWorker);
  yield takeLatest(REMOVE_OR_ADD_TOP_QUESTION, removeOrAddTopQuestionWorker);
  yield takeLatest(UP_QUESTION, upQuestionWorker);
  yield takeLatest(DOWN_QUESTION, downQuestionWorker);
  yield takeLatest(MOVE_QUESTION, moveQuestionWorker);
}
