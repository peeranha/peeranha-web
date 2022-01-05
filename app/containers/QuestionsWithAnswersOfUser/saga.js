/* eslint no-param-reassign: 0, array-callback-return: 0 */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import maxBy from 'lodash/maxBy';

import { getAnsweredUsersPosts } from 'utils/questionsManagement';

import { getQuestionsSuccess, getQuestionsErr } from './actions';

import { selectQuestionsWithUserAnswers, selectNumber } from './selectors';
import { GET_QUESTIONS } from '../QuestionsOfUser/constants';
import { GET_QUESTIONS as GET_ANSWERED_QUESTIONS } from './constants';
import { getQuestionsWorker } from '../QuestionsOfUser/saga';
import { POST_TYPE_ANSWER } from '../Profile/constants';
import { isGeneralQuestion } from '../ViewQuestion/saga';
import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from '../Questions/constants';

export function* getQuestionsWithAnswersWorker({ userId }) {
  try {
    const questionsFromStore = yield select(selectQuestionsWithUserAnswers());
    const limit = yield select(selectNumber());
    const offset =
      (questionsFromStore[questionsFromStore.length - 1] &&
        +questionsFromStore[questionsFromStore.length - 1].id + 1) ||
      0;

    const questions = yield call(() => getAnsweredUsersPosts(userId));
    questions?.map(x => {
      x.elementType = POST_TYPE_ANSWER;
      x.acceptedAnswer = x.correct_answer_id > 0;
      x.isGeneral = isGeneralQuestion(x);

      const mostRatingAnswer = maxBy(x.replies, 'rating');

      x.replies.map(y => {
        x.myPostTime = y.postTime;
        x.isMyAnswerAccepted = x.isBestReply;

        x.isTheLargestRating =
          y.rating === mostRatingAnswer.rating &&
          y.rating > TOP_COMMUNITY_DISPLAY_MIN_RATING;

        x.myPostRating = y.rating;
        x.answerId = y.id;
      });
    });

    yield put(getQuestionsSuccess(questions));
  } catch (err) {
    yield put(getQuestionsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_ANSWERED_QUESTIONS, getQuestionsWithAnswersWorker);
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
}
