/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
import {
  take,
  takeLatest,
  call,
  put,
  select,
  all,
  takeEvery,
} from 'redux-saga/effects';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { selectEos } from 'containers/EosioProvider/selectors';

import { getCookie, setCookie, deleteCookie } from 'utils/cookie';
import {
  getQuestions,
  getQuestionsFilteredByCommunities,
  getQuestionsForFollowedCommunities,
  FetcherOfQuestionsForFollowedCommunities,
  getPromotedQuestions,
  getRandomQuestions,
} from 'utils/questionsManagement';
import { getQuestionBounty } from 'utils/walletManagement';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import {
  ADD_TO_TOP_COMMUNITY_METHOD,
  ALL_TOP_QUESTIONS_SCOPE,
  ALL_TOP_QUESTIONS_TABLE,
  DOWN_QUESTION_METHOD,
  MOVE_QUESTION_METHOD,
  REMOVE_FROM_TOP_COMMUNITY_METHOD,
  UP_QUESTION_METHOD,
} from 'utils/constants';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { GET_USER_PROFILE_SUCCESS } from 'containers/DataCacheProvider/constants';
import {
  makeSelectFollowedCommunities,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';
import {
  getQuestionData,
  isGeneralQuestion,
} from 'containers/ViewQuestion/saga';

import { getQuestionsWorker as getTopQuestions } from '../Home/saga';

import {
  CHANGE_QUESTION_FILTER,
  DOWN_QUESTION,
  GET_QUESTIONS,
  LOAD_COMMUNITY_TOP_QUESTIONS,
  MOVE_QUESTION,
  QUESTION_FILTER,
  REMOVE_OR_ADD_TOP_QUESTION,
  TOP_QUESTIONS_LOAD_NUMBER,
  UP_QUESTION,
  PROMO_QUESTIONS_AMOUNT,
  UPDATE_PROMO_QUESTIONS,
} from './constants';

import {
  getQuestions as getQuestionsAction,
  getQuestionsSuccess,
  getQuestionsError,
  loadTopCommunityQuestionsSuccess,
  loadTopCommunityQuestionsErr,
  removeOrAddTopQuestionSuccess,
  removeOrAddTopQuestionErr,
  upQuestionSuccess,
  upQuestionErr,
  downQuestionSuccess,
  downQuestionErr,
  moveQuestionErr,
  moveQuestionSuccess,
  changeQuestionFilter,
} from './actions';

import {
  selectInitLoadedItems,
  selectTopQuestionsInfoLoaded,
  selectQuestionFilter,
  selectLastLoadedTopQuestionIndex,
  selectTopQuestionIds,
  isQuestionTop,
  selectPromotedQuestions,
  selectTypeFilter,
} from './selectors';
import { getPosts, getPostsByCommunityId } from '../../utils/theGraph';
import { getUserProfileWorker } from '../DataCacheProvider/saga';
import { selectUsers } from '../DataCacheProvider/selectors';

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
  yield take(GET_USER_PROFILE_SUCCESS);

  if (window.location.pathname.includes(routes.feed())) {
    yield call(createdHistory.push, routes.feed());
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
