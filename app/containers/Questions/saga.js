import { take, takeLatest, call, put, select } from 'redux-saga/effects';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { GET_USER_PROFILE_SUCCESS } from 'containers/DataCacheProvider/constants';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
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

    yield put(
      getQuestionsSuccess(
        clearQuestionsList,
        next,
        toUpdateQuestions,
        undefined,
      ),
    );
  } catch (err) {
    yield put(getQuestionsError(err));
  }
}

export function* redirectWorker({ communityIdFilter, isFollowed }) {
  const locale = yield select(makeSelectLocale());

  const baseUrl = locale === 'en' ? '' : `/${locale}`;

  yield take(GET_USER_PROFILE_SUCCESS);

  if (window.location.pathname.includes(routes.feed())) {
    yield call(createdHistory.push, baseUrl + routes.feed());
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
  yield takeLatest(
    LOAD_COMMUNITY_TOP_QUESTIONS,
    loadTopCommunityQuestionsWorker,
  );
  yield takeLatest(REMOVE_OR_ADD_TOP_QUESTION, removeOrAddTopQuestionWorker);
  yield takeLatest(UP_QUESTION, upQuestionWorker);
  yield takeLatest(DOWN_QUESTION, downQuestionWorker);
  yield takeLatest(MOVE_QUESTION, moveQuestionWorker);
}
