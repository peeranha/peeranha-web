/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
import {
  call,
  put,
  select,
  all,
  takeEvery,
} from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';

import {
  getQuestions,
} from 'utils/questionsManagement';

import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import {
  isGeneralQuestion,
} from 'containers/ViewQuestion/saga';

import {
  GET_QUESTIONS,
} from './constants';

import {
  getQuestionsSuccess,
  getQuestionsError,
} from './actions';

import { getQuestionBounty } from '../../utils/walletManagement';

export function* getQuestionsWorker() {
  try {
    const eosService = yield select(selectEos);

    let questionsList = yield call(getQuestions, eosService, 5, 0);

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

    // To avoid of fetching same user profiles - remember it and to write userInfo here

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

export default function*() {
  yield takeEvery(GET_QUESTIONS, getQuestionsWorker);
}
