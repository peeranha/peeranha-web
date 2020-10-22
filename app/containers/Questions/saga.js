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
  CHANGE_QUESTION_FILTER,
  DOWN_QUESTION,
  GET_QUESTIONS,
  LOAD_COMMUNITY_TOP_QUESTIONS,
  MOVE_QUESTION,
  QUESTION_FILTER,
  REMOVE_OR_ADD_TOP_QUESTION,
  TOP_QUESTIONS_LOAD_NUMBER,
  UP_QUESTION,
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
        const userInfo = yield call(getUserProfileWorker, {
          user,
          getFullProfile: true,
        });

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
    yield call(loadTopCommunityQuestionsWorker, { init: true });
  }
}

function* loadTopCommunityQuestionsWorker({ init }) {
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

      const topQuestionsIds = yield select(selectTopQuestionIds);
      const topQuestionsInfoLoaded = yield select(
        selectTopQuestionsInfoLoaded(),
      );
      const questionFilter = yield select(selectQuestionFilter());

      if (!topQuestionsIds.length && !topQuestionsInfoLoaded) {
        const data = yield call(
          eosService.getTableRow,
          ALL_TOP_QUESTIONS_TABLE,
          ALL_TOP_QUESTIONS_SCOPE,
          single,
        );

        if (process.env.ENV === 'test') {
          console.log(
            `Top questions data of community (id: ${single}): `,
            data,
          );
        }

        if (data?.['top_questions'].length) {
          const topQuestionIdsForLoad = data.top_questions.slice(
            0,
            TOP_QUESTIONS_LOAD_NUMBER,
          );

          const loadedQuestionData = yield all(
            topQuestionIdsForLoad.map(function*(questionId) {
              return yield call(getQuestionData, {
                questionId,
              });
            }),
          );

          // // It's needed if deleted questions left at the table
          // const indexes = loadedQuestionData
          //   .map((x, i) => {
          //     if (!x) return i;
          //     return null;
          //   })
          //   .filter(x => x || x === 0);
          // const filtered = topQuestionIdsForLoad.filter((x, i) =>
          //   indexes.includes(i),
          // );
          // const { user } = yield select(makeSelectProfileInfo());
          // yield all(
          //   filtered.map(function*(x) {
          //     return yield call(
          //       eosService.sendTransaction,
          //       user,
          //       REMOVE_FROM_TOP_COMMUNITY_METHOD,
          //       {
          //         user,
          //         community_id: single,
          //         question_id: x,
          //       },
          //     );
          //   }),
          // );

          yield put(
            loadTopCommunityQuestionsSuccess(
              loadedQuestionData,
              questionFilter,
              data.top_questions,
              TOP_QUESTIONS_LOAD_NUMBER,
            ),
          );
        } else {
          yield put(
            loadTopCommunityQuestionsSuccess([], questionFilter, [], 0),
          );
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
      } else if (!init) {
        const lastIndex = yield select(selectLastLoadedTopQuestionIndex);
        const next = Math.min(
          lastIndex + TOP_QUESTIONS_LOAD_NUMBER,
          topQuestionsIds.length,
        );
        const topQuestionIdsForLoad = topQuestionsIds.slice(lastIndex, next);

        const loadedQuestionData = yield all(
          topQuestionIdsForLoad.map(function*(questionId) {
            return yield call(getQuestionData, {
              questionId,
            });
          }),
        );

        yield put(
          loadTopCommunityQuestionsSuccess(
            loadedQuestionData,
            questionFilter,
            topQuestionsIds,
            next,
          ),
        );
      }
    }
  } catch (e) {
    yield put(loadTopCommunityQuestionsErr(e));
  }
}

function* removeOrAddTopQuestionWorker({ id }) {
  try {
    if (single) {
      const eosService = yield select(selectEos);
      const { user } = yield select(makeSelectProfileInfo());
      const isTopQuestion = yield select(isQuestionTop(id));
      const topQuestionsIds = yield select(selectTopQuestionIds);

      yield call(
        eosService.sendTransaction,
        user,
        isTopQuestion
          ? REMOVE_FROM_TOP_COMMUNITY_METHOD
          : ADD_TO_TOP_COMMUNITY_METHOD,
        {
          user,
          community_id: single,
          question_id: id,
        },
      );

      if (
        (topQuestionsIds.length === 1 && isTopQuestion) ||
        (!isTopQuestion && !topQuestionsIds.length)
      ) {
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

      yield put(removeOrAddTopQuestionSuccess(id, isTopQuestion));
    }
  } catch (e) {
    yield put(removeOrAddTopQuestionErr(e));
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
  yield takeLatest(REMOVE_OR_ADD_TOP_QUESTION, removeOrAddTopQuestionWorker);
  yield takeLatest(UP_QUESTION, upQuestionWorker);
  yield takeLatest(DOWN_QUESTION, downQuestionWorker);
  yield takeLatest(MOVE_QUESTION, moveQuestionWorker);
}
