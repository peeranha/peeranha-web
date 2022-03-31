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
  offset,
  communityIdFilter,
  parentPage,
  next,
  toUpdateQuestions,
  postTypes,
}) {
  try {
    const followedCommunities = yield select(makeSelectFollowedCommunities());
    // const cachedPromotedQuestions = yield select(selectPromotedQuestions());
    // const isNotUpdatePromotedQuestions = getCookie(UPDATE_PROMO_QUESTIONS);
    // deleteCookie(UPDATE_PROMO_QUESTIONS);

    let questionsList = [];

    if (single) {
      communityIdFilter = single;
    }
    if (communityIdFilter > 0) {
      questionsList = yield call(
        getPostsByCommunityId,
        limit,
        offset,
        postTypes,
        [communityIdFilter],
      );
    }

    if (communityIdFilter === 0 && parentPage !== feed) {
      questionsList = yield call(getPosts, limit, offset, postTypes);
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
        offset,
        postTypes,
        followedCommunities,
      );
    }
    const usersSet = new Set();
    questionsList.forEach(question => {
      question.isGeneral = isGeneralQuestion(question);
      usersSet.add(question.author.id);
    });

    //TODO delete after graph ready
    yield all(
      [...usersSet].map(function*(user) {
        yield call(getUserProfileWorker, { user, getFullProfile: true });
      }),
    );
    
    yield all(
      questionsList.map(function*(question) {
        const profileObject = yield select(selectUsers(question.author.id));
        if (profileObject) {
          question.author = {
            ...question.author,
            ratings: profileObject.ratings,
            highestRating: profileObject.highestRating,
          }
        }
      }),
    );
    //TODO promoted questions
    // yield all(
    //   questionsList.map(function*(question) {
    //     const bounty = yield call(getQuestionBounty, question.id, eosService);
    //     question.questionBounty = bounty;
    //   }),
    // );
    // get promoted questions
    // const promotedQuestions = isNotUpdatePromotedQuestions
    //   ? { ...cachedPromotedQuestions }
    //   : { all: [], top: [] };
    // if (
    //   (communityIdFilter && !isNotUpdatePromotedQuestions) ||
    //   cachedPromotedQuestions.communityId !== communityIdFilter
    // ) {
    //   yield call(loadTopCommunityQuestionsWorker, { init: true });
    //   const topQuestionsIds = yield select(selectTopQuestionIds);
    //
    //   let allPromotedQuestions = yield call(
    //     getPromotedQuestions,
    //     eosService,
    //     communityIdFilter,
    //   );
    //   allPromotedQuestions = allPromotedQuestions.filter(
    //     item => item.ends_time >= now,
    //   );
    //
    //   allPromotedQuestions = yield all(
    //     // eslint-disable-next-line camelcase
    //     allPromotedQuestions.map(function*({ question_id }) {
    //       return yield call(getQuestionData, {
    //         questionId: question_id,
    //       });
    //     }),
    //   );
    //   allPromotedQuestions = allPromotedQuestions.filter(item => !!item);
    //   yield all(
    //     allPromotedQuestions.map(function*(question) {
    //       const bounty = yield call(getQuestionBounty, question.id, eosService);
    //       question.questionBounty = bounty;
    //     }),
    //   );
    //
    //   const topPromotedQuestions = allPromotedQuestions.filter(item =>
    //     topQuestionsIds.includes(item.id),
    //   );
    //
    //   promotedQuestions.all = getRandomQuestions(
    //     allPromotedQuestions,
    //     PROMO_QUESTIONS_AMOUNT,
    //   );
    //   promotedQuestions.top = getRandomQuestions(
    //     topPromotedQuestions,
    //     PROMO_QUESTIONS_AMOUNT,
    //   );
    //   promotedQuestions.communityId = communityIdFilter;
    // }
    yield put(
      getQuestionsSuccess(
        questionsList,
        next,
        toUpdateQuestions,
        undefined,
        // promotedQuestions,
      ),
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

// TODO: test
export function* updateStoredQuestionsWorker() {
  const eosService = yield select(selectEos);
  const initLoadedItems = yield select(selectInitLoadedItems());
  const offset = 0;
  const communityIdFilter = yield select(selectTypeFilter());
  const followedCommunities = yield select(makeSelectFollowedCommunities());
  const parentPage = window.location.pathname;
  const fetcher = new FetcherOfQuestionsForFollowedCommunities(
    Math.floor(1.2 * initLoadedItems),
    followedCommunities || [],
    eosService,
  );

  const next = false;
  const toUpdateQuestions = true;

  setCookie({
    name: UPDATE_PROMO_QUESTIONS,
    value: true,
  });

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

export function* loadTopCommunityQuestionsWorker({ init }) {
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

      const rawTopQuestionsIds = yield select(selectTopQuestionIds);
      const topQuestionsIds = rawTopQuestionsIds.filter(question => !!question);
      const topQuestionsInfoLoaded = yield select(
        selectTopQuestionsInfoLoaded(),
      );
      const questionFilter = yield select(selectQuestionFilter());

      if (topQuestionsIds.length) {
        const topQuestionIdsForLoad = topQuestionsIds.slice(
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

        yield put(
          loadTopCommunityQuestionsSuccess(
            loadedQuestionData,
            questionFilter,
            topQuestionsIds,
            TOP_QUESTIONS_LOAD_NUMBER,
          ),
        );
      }

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
          //         communityId: single,
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

export function* removeOrAddTopQuestionWorker({ id }) {
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
          communityId: single,
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
      yield call(getTopQuestions, { single });
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
        communityId: single,
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
        communityId: single,
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
        communityId: single,
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
