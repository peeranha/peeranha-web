/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
import { take, takeLatest, call, put, select } from 'redux-saga/effects';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { GET_USER_PROFILE_SUCCESS } from 'containers/DataCacheProvider/constants';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { isGeneralQuestion } from 'containers/ViewQuestion/saga';

import { GET_QUESTIONS } from './constants';

import { getQuestionsSuccess, getQuestionsError } from './actions';

import { getPosts, getPostsByCommunityId } from 'utils/theGraph';
import { HIDDEN_COMMUNITIES_ID } from '../Communities/constants';
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
    let followedCommunities = yield select(makeSelectFollowedCommunities());
    const communities = yield select(selectCommunities());
    const notHiddenCommunities = communities.reduce((communityList, community) => {
      if (!HIDDEN_COMMUNITIES_ID.includes(community.id)) {
        communityList.push(community.id);
      }
      return communityList;
    }, []);

    const hasHiddenCommunities = HIDDEN_COMMUNITIES_ID.length > 0;
    if (hasHiddenCommunities) {
      followedCommunities = followedCommunities?.filter(
        (community) => !HIDDEN_COMMUNITIES_ID?.includes(community),
      );
    }
    let questionsList = [];
    let counter = skip;

    if (single) {
      communityIdFilter = single;
    }
    if (communityIdFilter) {
      questionsList = yield call(
        getPostsByCommunityId,
        limit,
        skip,
        postTypes,
        [communityIdFilter],
        tags,
      );
    }

    if (!communityIdFilter && parentPage !== feed) {
      questionsList = !hasHiddenCommunities
        ? yield call(getPosts, limit, skip, postTypes)
        : yield call(getPostsByCommunityId, limit, skip, postTypes, notHiddenCommunities, tags);
    }

    // Load questions for communities where I am
    if (
      !communityIdFilter &&
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
    console.log(questionsList);
    questionsList.forEach((question) => {
      question.isGeneral = isGeneralQuestion(question);
    });

    const clearQuestionsList = questionsList.filter((item) => item.title);

    counter += clearQuestionsList.length;
    yield put(getQuestionsSuccess(clearQuestionsList, next, toUpdateQuestions, undefined, counter));
  } catch (err) {
    yield put(getQuestionsError(err));
  }
}

export function* redirectWorker() {
  yield take(GET_USER_PROFILE_SUCCESS);

  if (window.location.pathname.includes(routes.feed())) {
    yield call(createdHistory.push, routes.feed());
  }
}

export default function* () {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
  yield takeLatest(FOLLOW_HANDLER_SUCCESS, redirectWorker);
}
