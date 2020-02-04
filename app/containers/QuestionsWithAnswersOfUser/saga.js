/* eslint no-param-reassign: 0, array-callback-return: 0 */
import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import maxBy from 'lodash/maxBy';

import {
  getAnswersPostedByUser,
  getQuestionById,
} from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import { POST_TYPE_ANSWER } from 'containers/Profile/constants';
import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from 'containers/Questions/constants';

import { getQuestionsSuccess, getQuestionsErr } from './actions';

import { selectQuestionsWithUserAnswers, selectNumber } from './selectors';
import { GET_QUESTIONS as GET_QUESTIONS_WITH_ANSWERS } from './constants';
import { GET_QUESTIONS } from '../QuestionsOfUser/constants';
import { getQuestionsWorker as getQuestions } from '../QuestionsOfUser/saga';

export function* getQuestionsWithAnswersWorker({ userId }) {
  try {
    const questionsFromStore = yield select(selectQuestionsWithUserAnswers());
    const limit = yield select(selectNumber());
    const eosService = yield select(selectEos);

    const offset =
      (questionsFromStore[questionsFromStore.length - 1] &&
        +questionsFromStore[questionsFromStore.length - 1].id + 1) ||
      0;

    const answersId = yield call(() =>
      getAnswersPostedByUser(eosService, userId, offset, limit),
    );

    const questions = yield all(
      answersId.map(x => getQuestionById(eosService, x.question_id, userId)),
    );

    /*
     *
     * @postType - type of user's post
     * @myPostTime - time of user's post
     * @acceptedAnswer - somebody gave answer which has become accepted
     * @isMyAnswerAccepted - check if my answer is Accepted
     * @myPostRating - rating of post
     *
     */

    questions.map((x, index) => {
      x.postType = POST_TYPE_ANSWER;
      x.acceptedAnswer = x.correct_answer_id > 0;

      const mostRatingAnswer = maxBy(x.answers, 'rating');

      x.answers.map(y => {
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

    yield put(getQuestionsSuccess(questions));
  } catch (err) {
    yield put(getQuestionsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS_WITH_ANSWERS, getQuestionsWithAnswersWorker);
  yield takeLatest(GET_QUESTIONS, getQuestions);
}
