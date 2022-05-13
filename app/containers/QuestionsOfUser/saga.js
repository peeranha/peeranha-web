/* eslint no-param-reassign: 0, array-callback-return: 0, func-names: 0 */
import { call, put, select } from 'redux-saga/effects';

import { getQuestionsPostedByUser } from 'utils/questionsManagement';

import { POST_TYPE_QUESTION } from 'containers/Profile/constants';
import { isGeneralQuestion } from 'containers/ViewQuestion/saga';

import { getQuestionsErr, getQuestionsSuccess } from './actions';
import { selectQuestions } from './selectors';
import { selectNumber } from '../QuestionsWithAnswersOfUser/selectors';

export function* getQuestionsWorker({ userId }) {
  try {
    const questionsFromStore = yield select(selectQuestions());

    const limit = yield select(selectNumber());
    const offset = questionsFromStore?.length || 0;

    const questions = yield call(
      getQuestionsPostedByUser,
      userId,
      limit,
      offset,
    );

    const updateQuestions = questions.map((question) => ({
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
