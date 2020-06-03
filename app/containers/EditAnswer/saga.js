import { call, put, select, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  editAnswer,
  getAnswer,
  getQuestionById,
} from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
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

export function* getAnswerWorker({ questionId, answerId }) {
  try {
    const eosService = yield select(selectEos);
    const questionData = yield select(selectQuestionData());
    let answer = yield select(selectAnswer(answerId));

    if (!answer) {
      const question = yield call(getQuestionById, eosService, questionId);
      const answerData = question.answers.filter(x => x.id === answerId)[0];
      answer = answerData;
      answer.content = yield call(getAnswer, answer.ipfs_link);
      answer.communityId = question.community_id;
    } else {
      answer.communityId = questionData.community_id;
    }

    yield put(getAnswerSuccess(answer));
  } catch (err) {
    yield put(getAnswerErr(err));
  }
}

export function* editAnswerWorker({ answer, questionId, answerId, official }) {
  try {
    const eosService = yield select(selectEos);
    const user = yield call(eosService.getSelectedAccount);
    const cachedQuestion = yield select(selectQuestionData());

    yield call(
      editAnswer,
      user,
      questionId,
      answerId,
      answer,
      official,
      eosService,
    );

    if (cachedQuestion) {
      const item = cachedQuestion.answers.find(x => x.id === answerId);
      item.content = answer;
      if (official) {
        item.properties = item.properties.concat([{ key: 10, value: 1 }]);
      } else {
        item.properties = item.properties.filter(({ key }) => key !== 10);
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
