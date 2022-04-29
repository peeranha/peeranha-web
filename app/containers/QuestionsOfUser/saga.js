/* eslint no-param-reassign: 0, array-callback-return: 0, func-names: 0 */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  getQuestionById,
  getQuestionsPostedByUser,
} from 'utils/questionsManagement';

import { POST_TYPE_QUESTION } from 'containers/Profile/constants';
import { isGeneralQuestion } from 'containers/ViewQuestion/saga';

import { getQuestionsErr, getQuestionsSuccess } from './actions';

import { GET_QUESTIONS } from './constants';

export function* getQuestionsWorker({ userId }) {
  try {
    const questions = yield call(() => getQuestionsPostedByUser(userId));

    const updateQuestions = questions.map(question => ({
      ...question,
      elementType: POST_TYPE_QUESTION,
      myPostTime: question.postTime,
      acceptedAnswer: question.bestReply > 0,
      myPostRating: question.rating,
      isGeneral: isGeneralQuestion(question),
    }));

    yield put(getQuestionsSuccess(updateQuestions));
  } catch (err) {
    yield put(getQuestionsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
}
