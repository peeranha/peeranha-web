import { call, put, takeLatest, select, all } from 'redux-saga/effects';

import {
  getQuestionsPostedByUser,
  getQuestionData,
} from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import { POST_TYPE_QUESTION } from 'containers/Profile/constants';

// import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

import { getQuestionsSuccess, getQuestionsErr } from './actions';

import { selectQuestions, selectNumber } from './selectors';

import { GET_QUESTIONS } from './constants';

export function* getQuestionsWorker({ userId }) {
  try {
    const questionsFromStore = yield select(selectQuestions());
    const limit = yield select(selectNumber());

    const offset =
      (questionsFromStore[questionsFromStore.length - 1] &&
        +questionsFromStore[questionsFromStore.length - 1].id + 1) ||
      0;

    const eosService = yield select(selectEos);
    const idOfQuestions = yield call(() =>
      getQuestionsPostedByUser(eosService, userId, offset, limit),
    );

    // async questionData getting
    const promise1 = idOfQuestions.map(x =>
      getQuestionData(eosService, x.question_id, userId),
    );

    const questions = yield all(promise1);

    /*
     *
     * @postType - type of user's post
     * @myPostTime - time of user's post
     * @acceptedAnswer - somebody gave answer which has become accepted
     * @myPostRating - rating of post
     *
     */

    /* eslint no-param-reassign: 0 */
    /* istanbul ignore next */
    yield questions.map(function*(x) {
      x.postType = POST_TYPE_QUESTION;
      x.myPostTime = x.post_time;
      x.acceptedAnswer = x.correct_answer_id > 0;
      x.myPostRating = x.rating;

      // Now we get userInfo from @getQuestionData method
      // TODO: remove it there and use @getUserProfileWorker of DataCacheProvider

      //      if (x.answers[0]) {
      //        const userInfo = yield call(() => getUserProfileWorker({ user: x.answers[0].user }));
      //        x.answers[0].userInfo = userInfo;
      //      }
    });

    yield put(getQuestionsSuccess(questions));
  } catch (err) {
    yield put(getQuestionsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
}
