import { call, put, select, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { editAnswer, getAnswer } from 'utils/questionsManagement';

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

export function* getAnswerWorker({ questionId, answerId }) {
  try {
    const ethereumService = yield select(selectEthereum);
    let answer = yield select(selectAnswer(answerId));

    if (!answer) {
      answer = yield call(getAnswer, ethereumService, questionId, answerId);
    }

    yield put(getAnswerSuccess(answer));
  } catch (err) {
    yield put(getAnswerErr(err));
  }
}

export function* editAnswerWorker({ answer, questionId, answerId, official }) {
  try {
    const ethereumService = yield select(selectEthereum);
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
      const item = cachedQuestion.answers.find(x => x.id === answerId);
      item.content = answer;
      if (official) {
        item.isOfficialReply = true;
      }
    }

    yield put(editAnswerSuccess({ ...cachedQuestion }));
    yield call(createdHistory.push, routes.questionView(questionId, answerId));
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
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, link);
  } catch (err) {}
}

export default function*() {
  yield takeLatest(GET_ANSWER, getAnswerWorker);
  yield takeLatest(EDIT_ANSWER, editAnswerWorker);
  yield takeLatest(EDIT_ANSWER_SUCCESS, updateQuestionList);
}
