/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
import { call, put, select, all, takeEvery, takeLatest } from 'redux-saga/effects';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { selectTopQuestionIds } from 'containers/Questions/selectors';

import { getQuestionById } from 'utils/questionsManagement';
import { getCommunityById, isSingleCommunityWebsite } from 'utils/communityManagement';
import { getQuestionBounty } from 'utils/walletManagement';

import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { isGeneralQuestion } from 'containers/ViewQuestion/saga';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { isSuiBlockchain } from 'utils/sui/sui';
import { getSuiPostsByCommunityId, getSuiPost } from 'utils/sui/suiIndexer';

import {
  GET_QUESTIONS,
  GET_COMMUNITY,
  GET_LOGO,
  REDIRECT_TO_EDIT_COMMUNITY_PAGE,
  FOLLOW_HANDLER,
} from './constants';
import {
  getQuestionsSuccess,
  getQuestionsError,
  getCommunitySuccess,
  getCommunityError,
  getLogoSuccess,
  getLogoError,
} from './actions';
import createdHistory from '../../createdHistory';
import * as routes from '../../routes-config';
import { followHandlerWorker } from '../FollowCommunityButton/saga';

export function* getQuestionsWorker() {
  try {
    const topQuestionsIds = yield select(selectTopQuestionIds);

    const questionsList = [];

    if (isSuiBlockchain) {
      const сommunities = yield select(selectCommunities());
      if (topQuestionsIds && topQuestionsIds.length) {
        yield all(
          topQuestionsIds.map(function* (id) {
            if (id) {
              const question = yield call(getSuiPost, id, сommunities);
              questionsList.push(question);
            }
          }),
        );
      } else {
        const limit = 5;
        const offset = 0;
        const communitySuiIdFilter = сommunities.find(
          (community) => community.id === communityId,
        ).suiId;
        questionsList = yield call(
          getSuiPostsByCommunityId,
          limit,
          offset,
          [0, 1, 2],
          [communitySuiIdFilter],
          сommunities,
        );
      }
      questionsList = questionsList.map((question) => ({
        ...question,
        communityId: сommunities.find((community) => community.suiId === question.communityId).id,
      }));
    } else {
      const ethereumService = yield select(selectEthereum);
      if (topQuestionsIds && topQuestionsIds.length) {
        yield all(
          topQuestionsIds.map(function* (id) {
            if (id) {
              const question = yield call(getQuestionById, ethereumService, id);

              questionsList.push(question);
            }
          }),
        );
      }
    }

    const users = new Map();

    questionsList.forEach((question) => {
      question.isGeneral = isGeneralQuestion(question.properties);

      users.set(
        question.user,
        users.get(question.user) ? [...users.get(question.user), question] : [question],
      );
    });

    yield all(
      questionsList.map(function* (question) {
        const bounty = yield call(getQuestionBounty, question.id, ethereumService);
        question.questionBounty = bounty;
      }),
    );

    yield all(
      Array.from(users.keys()).map(function* (user) {
        const author = yield call(getUserProfileWorker, { user });

        users.get(user).map((cachedItem) => {
          cachedItem.author = author;
        });
      }),
    );

    yield put(getQuestionsSuccess(questionsList));
  } catch (err) {
    yield put(getQuestionsError(err));
  }
}

export function* getCommunityWorker({ id }) {
  try {
    const cachedCommunities = yield select(selectCommunities());

    let community = cachedCommunities.find((c) => c.id === id);

    if (!community) {
      const ethereumService = yield select(selectEthereum);

      community = yield call(getCommunityById, ethereumService, id);
    }

    yield put(getCommunitySuccess(community));
  } catch (err) {
    yield put(getCommunityError(err));
  }
}

export function* getLogoWorker() {
  try {
    const logo = '';

    const single = isSingleCommunityWebsite();
    if (single) {
      yield call(getCommunityWorker, { id: single });
    }

    yield put(getLogoSuccess(logo));
  } catch (err) {
    yield put(getLogoError(err));
  }
}
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
export function* redirectToEditCommunityPageWorker({ id }) {
  try {
    yield call(createdHistory.push, routes.communitiesEdit(id));
  } catch (err) {}
}

export default function* () {
  yield takeEvery(GET_QUESTIONS, getQuestionsWorker);
  yield takeEvery(GET_COMMUNITY, getCommunityWorker);
  yield takeEvery(GET_LOGO, getLogoWorker);
  yield takeLatest(REDIRECT_TO_EDIT_COMMUNITY_PAGE, redirectToEditCommunityPageWorker);
  yield takeEvery(FOLLOW_HANDLER, followHandlerWorker);
}
