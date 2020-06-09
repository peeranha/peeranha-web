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

import { getCookie, setCookie } from 'utils/cookie';
import {
  getQuestions,
  getQuestionsFilteredByCommunities,
  getQuestionsForFollowedCommunities,
  FetcherOfQuestionsForFollowedCommunities,
} from 'utils/questionsManagement';

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
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import {
  getQuestionData,
  isGeneralQuestion,
} from 'containers/ViewQuestion/saga';

import {
  ADD_TO_TOP_QUESTIONS,
  CHANGE_QUESTION_FILTER,
  DOWN_QUESTION,
  GET_QUESTIONS,
  LOAD_COMMUNITY_TOP_QUESTIONS,
  MOVE_QUESTION,
  QUESTION_FILTER,
  REMOVE_FROM_TOP_QUESTIONS,
  UP_QUESTION,
} from './constants';

import {
  getQuestions as getQuestionsAction,
  getQuestionsSuccess,
  getQuestionsError,
  loadTopCommunityQuestionsSuccess,
  loadTopCommunityQuestionsErr,
  addToTopQuestionsSuccess,
  addToTopQuestionsErr,
  removeFromTopQuestionsSuccess,
  removeFromTopQuestionsErr,
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
  selectTopQuestionsLoaded,
  selectTopQuestions,
  selectQuestions,
  selectQuestionFilter,
} from './selectors';

const feed = routes.feed();
const single = isSingleCommunityWebsite();

export function* getQuestionsWorker({
  limit,
  offset,
  communityIdFilter,
  parentPage,
  fetcher,
  next,
  toUpdateQuestions,
}) {
  try {
    const eosService = yield select(selectEos);
    const followedCommunities = yield select(makeSelectFollowedCommunities());

    let questionsList = [];

    if (single) {
      communityIdFilter = single;
    }

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
      question.isGeneral = isGeneralQuestion(question.properties);

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

    yield put(getQuestionsSuccess(questionsList, next, toUpdateQuestions));
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

// TODO: test
export function* updateStoredQuestionsWorker() {
  const eosService = yield select(selectEos);
  const initLoadedItems = yield select(selectInitLoadedItems());
  const offset = 0;
  const communityIdFilter = 0;
  const parentPage = null;
  const fetcher = new FetcherOfQuestionsForFollowedCommunities(
    Math.floor(1.2 * initLoadedItems),
    [],
    eosService,
  );

  const next = false;
  const toUpdateQuestions = true;

  yield put(
    getQuestionsAction(
      initLoadedItems,
      offset,
      communityIdFilter,
      parentPage,
      fetcher,
      next,
      toUpdateQuestions,
    ),
  );
}

function* changeQuestionFilterWorker({ questionFilter }) {
  if (questionFilter) {
    yield call(loadTopCommunityQuestionsWorker);
  }
}

function* loadTopCommunityQuestionsWorker() {
  try {
    const eosService = yield select(selectEos);

    if (single) {
      if (!getCookie(QUESTION_FILTER)) {
        yield put(changeQuestionFilter(1));
        setCookie({
          name: QUESTION_FILTER,
          value: 1,
          options: {
            defaultPath: true,
            neverExpires: true,
          },
        });
      }

      const topQuestions = yield select(selectTopQuestions());
      const topQuestionsLoaded = yield select(selectTopQuestionsLoaded());
      if (!topQuestions.length && !topQuestionsLoaded) {
        const data = yield call(
          eosService.getTableRow,
          ALL_TOP_QUESTIONS_TABLE,
          ALL_TOP_QUESTIONS_SCOPE,
          single,
        );

        const questionFilter = +getCookie(QUESTION_FILTER) || 0;

        if (data?.['top_questions'].length) {
          yield put(
            loadTopCommunityQuestionsSuccess(
              (yield all(
                data.top_questions.map(function*(questionId) {
                  return yield call(getQuestionData, {
                    questionId,
                  });
                }),
              )).filter(x => !!x),
              questionFilter,
            ),
          );
        } else {
          yield put(loadTopCommunityQuestionsSuccess([]));
          yield put(changeQuestionFilter(0));
          setCookie({
            name: QUESTION_FILTER,
            value: 0,
            options: {
              defaultPath: true,
              neverExpires: true,
            },
          });
        }
      } else {
        const questionFilter = yield select(selectQuestionFilter());
        yield put(
          loadTopCommunityQuestionsSuccess(topQuestions, questionFilter),
        );
      }
    }
  } catch (e) {
    yield put(loadTopCommunityQuestionsErr(e));
  }
}

function* addToTopCommunityWorker({ id }) {
  try {
    if (single) {
      const eosService = yield select(selectEos);
      const { user } = yield select(makeSelectProfileInfo());

      yield call(
        eosService.sendTransaction,
        user,
        ADD_TO_TOP_COMMUNITY_METHOD,
        {
          user,
          community_id: single,
          question_id: id,
        },
      );

      const topQuestions = yield select(
        selectQuestions(null, null, null, true),
      );

      if (!topQuestions.length) {
        yield put(changeQuestionFilter(0));
        setCookie({
          name: QUESTION_FILTER,
          value: 0,
          options: {
            defaultPath: true,
            neverExpires: true,
          },
        });
      }
      yield put(addToTopQuestionsSuccess(id));
    }
  } catch (e) {
    yield put(addToTopQuestionsErr(e));
  }
}

function* removeFromTopCommunityWorker({ id }) {
  try {
    if (single) {
      const eosService = yield select(selectEos);
      const { user } = yield select(makeSelectProfileInfo());

      yield call(
        eosService.sendTransaction,
        user,
        REMOVE_FROM_TOP_COMMUNITY_METHOD,
        {
          user,
          community_id: single,
          question_id: id,
        },
      );
      const topQuestions = yield select(
        selectQuestions(null, null, null, true),
      );
      if (topQuestions.length === 1) {
        yield put(changeQuestionFilter(0));
        setCookie({
          name: QUESTION_FILTER,
          value: 0,
          options: {
            defaultPath: true,
            neverExpires: true,
          },
        });
      }
      yield put(removeFromTopQuestionsSuccess(id));
    }
  } catch (e) {
    yield put(removeFromTopQuestionsErr(e));
  }
}

function* upQuestionWorker({ id }) {
  try {
    if (single) {
      const eosService = yield select(selectEos);
      const { user } = yield select(makeSelectProfileInfo());

      yield call(eosService.sendTransaction, user, UP_QUESTION_METHOD, {
        user,
        community_id: single,
        question_id: id,
      });
      yield put(upQuestionSuccess(id));
    }
  } catch (e) {
    yield put(upQuestionErr(id));
  }
}

function* downQuestionWorker({ id }) {
  try {
    if (single) {
      const eosService = yield select(selectEos);
      const { user } = yield select(makeSelectProfileInfo());

      yield call(eosService.sendTransaction, user, DOWN_QUESTION_METHOD, {
        user,
        community_id: single,
        question_id: id,
      });
      yield put(downQuestionSuccess(id));
    }
  } catch (e) {
    yield put(downQuestionErr(id));
  }
}

function* moveQuestionWorker({ id, position }) {
  try {
    if (single) {
      const eosService = yield select(selectEos);
      const { user } = yield select(makeSelectProfileInfo());

      yield call(eosService.sendTransaction, user, MOVE_QUESTION_METHOD, {
        user,
        community_id: single,
        question_id: id,
        new_position: position,
      });
      yield put(moveQuestionSuccess(id, position));
    }
  } catch (e) {
    yield put(moveQuestionErr(e));
  }
}

export default function*() {
  yield takeEvery(GET_QUESTIONS, getQuestionsWorker);
  yield takeLatest(FOLLOW_HANDLER_SUCCESS, redirectWorker);
  yield takeLatest(CHANGE_QUESTION_FILTER, changeQuestionFilterWorker);
  yield takeLatest(
    LOAD_COMMUNITY_TOP_QUESTIONS,
    loadTopCommunityQuestionsWorker,
  );
  yield takeLatest(ADD_TO_TOP_QUESTIONS, addToTopCommunityWorker);
  yield takeLatest(REMOVE_FROM_TOP_QUESTIONS, removeFromTopCommunityWorker);
  yield takeLatest(UP_QUESTION, upQuestionWorker);
  yield takeLatest(DOWN_QUESTION, downQuestionWorker);
  yield takeLatest(MOVE_QUESTION, moveQuestionWorker);
}
