/* eslint no-param-reassign: 0, array-callback-return: 0, func-names: 0 */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import {
  getQuestionById,
  getQuestionsPostedByUser,
} from 'utils/questionsManagement';

import { POST_TYPE_QUESTION } from 'containers/Profile/constants';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { isGeneralQuestion } from 'containers/ViewQuestion/saga';

import { getQuestionsErr, getQuestionsSuccess } from './actions';

import { selectNumber, selectQuestions } from './selectors';

import { GET_QUESTIONS } from './constants';
import { makeSelectAccount } from '../AccountProvider/selectors';

export function* getQuestionsWorker({ userId }) {
  try {
    const questionsFromStore = yield select(selectQuestions());
    const limit = yield select(selectNumber());
    const offset =
      (questionsFromStore[questionsFromStore.length - 1] &&
        +questionsFromStore[questionsFromStore.length - 1].id + 1) ||
      0;

    const questions = yield call(() =>
      getQuestionsPostedByUser(userId, offset, limit),
    );

    questions.map(x => {
      x.postType = POST_TYPE_QUESTION;
      x.myPostTime = x.postTime;
      x.acceptedAnswer = x.bestReply > 0;
      x.myPostRating = x.rating;
      x.isGeneral = isGeneralQuestion(x);
    });

    // To avoid of fetching same user profiles - remember it and to write author here

    yield put(getQuestionsSuccess(questions));
  } catch (err) {
    yield put(getQuestionsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
}
