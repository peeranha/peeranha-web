/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
import { take, takeLatest, call, put, select } from 'redux-saga/effects';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { getPosts, getPostsByCommunityId } from 'utils/theGraph';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { GET_USER_PROFILE_SUCCESS } from 'containers/DataCacheProvider/constants';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { isGeneralQuestion } from 'containers/ViewQuestion/saga';
import { HIDDEN_COMMUNITIES_ID } from 'containers/Communities/constants';

import { GET_QUESTIONS } from './constants';

import { getQuestionsSuccess, getQuestionsError } from './actions';

const feed = routes.feed();
const single = isSingleCommunityWebsite();

export function* getQuestionsWorker({
  limit,
  skip,
  postTypes,
  tags,
  communityIdFilter,
  parentPage,
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
      questionsList = notHiddenCommunities
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
    // questionsList.forEach((question) => {
    //   question.isGeneral = isGeneralQuestion(question);
    // });

    const { postCount, updatedPosts } = questionsList;
    const clearQuestionsList = updatedPosts.filter((item) => item.title);

    yield put(getQuestionsSuccess(clearQuestionsList, undefined, postCount));
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
