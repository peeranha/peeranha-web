import { call, put, takeEvery, select, all } from 'redux-saga/effects';

import {
  getQuestionsPostedByUser,
  getQuestionData,
} from 'utils/questionsManagement';
import { selectEos } from 'containers/EosioProvider/selectors';

import { getQuestionsSuccess, getQuestionsErr } from './actions';

import { selectQuestions, selectNumber } from './selectors';

import { GET_QUESTIONS } from './constants';

export function* getQuestionsWorker({ userId }) {
  try {
    const questionsFromStore = yield select(selectQuestions());
    const limit = yield select(selectNumber());

    const offset =
      (questionsFromStore[questionsFromStore.length - 1] &&
        +questionsFromStore[questionsFromStore.length - 1].question_id + 1) ||
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
     *
     */

    /* eslint no-param-reassign: 0 */
    questions.forEach(x => {
      x.postType = 'question';
      x.myPostTime = x.post_time;
      x.acceptedAnswer = x.correct_answer_id > 0;
    });

    yield put(getQuestionsSuccess(questions));
  } catch (err) {
    yield put(getQuestionsErr(err));
  }
}

export default function*() {
  yield takeEvery(GET_QUESTIONS, getQuestionsWorker);
}
