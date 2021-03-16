/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
import {
  call,
  put,
  select,
  all,
  takeEvery,
} from 'redux-saga/effects';

import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';

import { selectEos } from 'containers/EosioProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { selectTopQuestionIds } from 'containers/Questions/selectors';

import { getQuestionsFilteredByCommunities, getQuestionById } from 'utils/questionsManagement';
import {
  getCommunityById,
  isSingleCommunityWebsite,
  getSingleCommunityDetails,
} from 'utils/communityManagement';
import { getQuestionBounty } from 'utils/walletManagement';
import { getUserAvatar } from 'utils/profileManagement';

import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { isGeneralQuestion } from 'containers/ViewQuestion/saga';
import { loadTopCommunityQuestionsWorker } from 'containers/Questions/saga';

import {
  GET_QUESTIONS,
  GET_COMMUNITY,
  GET_LOGO,
} from './constants';
import {
  getQuestionsSuccess,
  getQuestionsError,
  getCommunitySuccess,
  getCommunityError,
  getLogoSuccess,
  getLogoError,
} from './actions';
import { selectCommunity } from './selectors';

export function* getQuestionsWorker({ communityId }) {
  try {
    const eosService = yield select(selectEos);
    
    yield call(loadTopCommunityQuestionsWorker, { init: true });

    const topQuestionsIds = yield select(selectTopQuestionIds);

    let questionsList = [];

    if (topQuestionsIds && topQuestionsIds.length) {
      yield all(
        topQuestionsIds.map(function*(id) {
          const question = yield call(getQuestionById, eosService, id);
          
          questionsList.push(question);
        }),
      );
    } else {
      const limit = 5;
      const offset = 0;

      questionsList = yield call(
        getQuestionsFilteredByCommunities,
        eosService,
        limit,
        offset,
        communityId
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

    yield all(
      questionsList.map(function*(question) {
        const bounty = yield call(getQuestionBounty, question.id, eosService);
        question.questionBounty = bounty;
      }),
    );

    yield all(
      Array.from(users.keys()).map(function*(user) {
        const userInfo = yield call(getUserProfileWorker, { user });

        users.get(user).map(cachedItem => {
          cachedItem.userInfo = userInfo;
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

    let community = cachedCommunities.find(c => c.id === id);

    if (!community) {
      const eosService = yield select(selectEos);

      community = yield call(getCommunityById, eosService, id);
    }

    yield put(getCommunitySuccess(community));
  } catch (err) {
    yield put(getCommunityError(err));
  }
}

export function* getLogoWorker() {
  try {
    let logo = "";

    const single = isSingleCommunityWebsite();
    if (single) {
      yield call(getCommunityWorker, { id: single });

      const community = yield select(selectCommunity());
      
      const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;

      if (isBloggerMode) {
        const { avatar } = community;

        logo = avatar && avatar.length > HASH_CHARS_LIMIT
          ? avatar
          : getUserAvatar(avatar, true, true);
      }
    }

    yield put(getLogoSuccess(logo));
  } catch (err) {
    yield put(getLogoError(err));
  }
}

export default function*() {
  yield takeEvery(GET_QUESTIONS, getQuestionsWorker);
  yield takeEvery(GET_COMMUNITY, getCommunityWorker);
  yield takeEvery(GET_LOGO, getLogoWorker);
}
