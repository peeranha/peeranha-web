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

    questions.map(x => {
      x.elementType = POST_TYPE_QUESTION;
      x.myPostTime = x.postTime;
      x.acceptedAnswer = x.bestReply > 0;
      x.myPostRating = x.rating;
      x.isGeneral = isGeneralQuestion(x);
    });

    yield put(getQuestionsSuccess(questions));
  } catch (err) {
    yield put(getQuestionsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
}
