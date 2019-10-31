/* eslint no-param-reassign: 0, array-callback-return: 0, func-names: 0 */
import { call, put, takeLatest, select, all } from 'redux-saga/effects';

import {
  getQuestionsPostedByUser,
  getQuestionById,
} from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import { POST_TYPE_QUESTION } from 'containers/Profile/constants';

import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

import { getQuestionsSuccess, getQuestionsErr } from './actions';

import { selectQuestions, selectNumber } from './selectors';

import { GET_QUESTIONS } from './constants';

export function* getQuestionsWorker({ userId }) {
  try {
    const questionsFromStore = yield select(selectQuestions());
    const limit = yield select(selectNumber());
    const eosService = yield select(selectEos);

    const offset =
      (questionsFromStore[questionsFromStore.length - 1] &&
        +questionsFromStore[questionsFromStore.length - 1].id + 1) ||
      0;

    const idOfQuestions = yield call(() =>
      getQuestionsPostedByUser(eosService, userId, offset, limit),
    );

    const questions = yield all(
      idOfQuestions.map(x =>
        getQuestionById(eosService, x.question_id, userId),
      ),
    );

    /*
     *
     * @postType - type of user's post
     * @myPostTime - time of user's post
     * @acceptedAnswer - somebody gave answer which has become accepted
     * @myPostRating - rating of post
     *
     */

    const users = new Map();

    questions.map(x => {
      x.postType = POST_TYPE_QUESTION;
      x.myPostTime = x.post_time;
      x.acceptedAnswer = x.correct_answer_id > 0;
      x.myPostRating = x.rating;

      if (x.answers[0]) {
        const lastAnswer = x.answers[x.answers.length - 1];
        users.set(
          lastAnswer.user,
          users.get(lastAnswer.user)
            ? [...users.get(lastAnswer.user), lastAnswer]
            : [lastAnswer],
        );
      }
    });

    // To avoid of fetching same user profiles - remember it and to write userInfo here

    yield all(
      Array.from(users.keys()).map(function*(user) {
        const userInfo = yield call(() => getUserProfileWorker({ user }));

        users.get(user).map(cachedItem => {
          cachedItem.userInfo = userInfo;
        });
      }),
    );

    yield put(getQuestionsSuccess(questions));
  } catch (err) {
    yield put(getQuestionsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
}
