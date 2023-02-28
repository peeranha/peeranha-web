import { call, put, select, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { editAnswer, getAnswer, getQuestion } from 'utils/questionsManagement';

import { isAuthorized, isValid } from 'containers/EosioProvider/saga';
import { updateQuestionList } from 'containers/ViewQuestion/saga';

import {
  selectAnswer,
  selectQuestionData,
} from 'containers/ViewQuestion/selectors';

import {
  EDIT_ANSWER,
  EDIT_ANSWER_BUTTON,
  EDIT_ANSWER_SUCCESS,
  GET_ANSWER,
  MIN_ENERGY_TO_EDIT_ANSWER,
  MIN_RATING_TO_EDIT_ANSWER,
} from './constants';

import {
  editAnswerErr,
  editAnswerSuccess,
  getAnswerErr,
  getAnswerSuccess,
} from './actions';
import { selectEthereum } from '../EthereumProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { saveChangedItemIdToSessionStorage } from 'utils/sessionStorage';
import { CHANGED_POSTS_KEY } from 'utils/constants';

export function* getAnswerWorker({ questionId, answerId }) {
  try {
    const ethereumService = yield select(selectEthereum);
    let answer = yield select(selectAnswer(answerId));
    const question = yield call(getQuestion, ethereumService, questionId);

    if (!answer) {
      answer = yield call(getAnswer, ethereumService, questionId, answerId);
    }

    yield put(
      getAnswerSuccess({
        ...answer,
        communityId: question.communityId,
        isOfficialReply: question.officialReply === answerId,
      }),
    );
  } catch (err) {
    yield put(getAnswerErr(err));
  }
}

export function* editAnswerWorker({
  answer,
  questionId,
  answerId,
  official,
  title,
}) {
  try {
    const ethereumService = yield select(selectEthereum);
    const locale = yield select(makeSelectLocale());

    const baseUrl = locale === 'en' ? '' : `/${locale}`;
    const user = yield call(ethereumService.getSelectedAccount);
    const cachedQuestion = yield select(selectQuestionData());
    const answerData = {
      content: answer,
    };
    yield call(
      editAnswer,
      user,
      questionId,
      answerId,
      answerData,
      official,
      ethereumService,
    );

    if (cachedQuestion) {
      const item = cachedQuestion.answers.find((x) => x.id === answerId);
      item.content = answer;
      if (official) {
        item.isOfficialReply = official;
      }
    }

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(editAnswerSuccess({ ...cachedQuestion }));
    yield call(
      createdHistory.push,
      baseUrl + routes.questionView(questionId, title, answerId),
    );
  } catch (err) {
    yield put(editAnswerErr(err));
  }
}

// TODO: test
export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || EDIT_ANSWER_BUTTON,
    minRating: MIN_RATING_TO_EDIT_ANSWER,
    minEnergy: MIN_ENERGY_TO_EDIT_ANSWER,
  });
}

// TODO: test
/* eslint no-empty: 0 */
export function* redirectToEditAnswerPageWorker({ buttonId, link }) {
  try {
    const locale = yield select(makeSelectLocale());

    const baseUrl = locale === 'en' ? '' : `/${locale}`;
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, baseUrl + link);
  } catch (err) {}
}

export default function* () {
  yield takeLatest(GET_ANSWER, getAnswerWorker);
  yield takeLatest(EDIT_ANSWER, editAnswerWorker);
  yield takeLatest(EDIT_ANSWER_SUCCESS, updateQuestionList);
}
