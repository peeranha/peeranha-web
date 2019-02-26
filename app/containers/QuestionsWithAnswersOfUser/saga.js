import { call, put, takeLatest, select, all } from 'redux-saga/effects';

import {
  getAnswersPostedByUser,
  getQuestionData,
} from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import { POST_TYPE_ANSWER } from 'containers/Profile/constants';
import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from 'containers/Questions/constants';

import { getQuestionsSuccess, getQuestionsErr } from './actions';

import { selectQuestionsWithUserAnswers, selectNumber } from './selectors';
import { GET_QUESTIONS } from './constants';

export function* getQuestionsWorker({ userId }) {
  try {
    const questionsFromStore = yield select(selectQuestionsWithUserAnswers());
    const limit = yield select(selectNumber());

    const offset =
      (questionsFromStore[questionsFromStore.length - 1] &&
        +questionsFromStore[questionsFromStore.length - 1].id + 1) ||
      0;

    const eosService = yield select(selectEos);
    const answersId = yield call(() =>
      getAnswersPostedByUser(eosService, userId, offset, limit),
    );

    // async questionData getting
    const promise1 = answersId.map(x =>
      getQuestionData(eosService, x.question_id, userId),
    );

    const questions = yield all(promise1);

    /*
     *
     * @postType - type of user's post
     * @myPostTime - time of user's post
     * @acceptedAnswer - somebody gave answer which has become accepted
     * @isMyAnswerAccepted - check if my answer is Accepted
     * @myPostRating - rating of post
     *
     */

    /* eslint no-param-reassign: 0 */
    yield questions.forEach((x, index) => /* istanbul ignore next */ {
      x.postType = POST_TYPE_ANSWER;
      x.acceptedAnswer = x.correct_answer_id > 0;

      const mostRatingAnswer = window._.maxBy(x.answers, 'rating');

      x.answers.forEach(y => {
        if (y.id === answersId[index].answer_id) {
          x.myPostTime = y.post_time;
          x.isMyAnswerAccepted = y.id === x.correct_answer_id;
          x.isTheLargestRating =
            y.rating === mostRatingAnswer.rating &&
            y.rating > TOP_COMMUNITY_DISPLAY_MIN_RATING;
          x.myPostRating = y.rating;
          x.answerId = y.id;
        }
      });
    });

    // id of answer === question.correct_answer_id => question is accepted ....... correct_answer_id > 0 - is accepted
    // need to know that MY ANSWER is accepted

    yield put(getQuestionsSuccess(questions));
  } catch (err) {
    yield put(getQuestionsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
}
