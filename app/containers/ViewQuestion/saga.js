import { takeEvery, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import {
  getQuestionData,
  postComment,
  postAnswer,
} from 'utils/questionsManagement';

import { GET_QUESTION_DATA, POST_COMMENT, POST_ANSWER } from './constants';
import {
  getQuestionData as getQuestionDataAction,
  getQuestionDataSuccess,
  getQuestionDataErr,
  postCommentSuccess,
  postCommentErr,
  postAnswerSuccess,
  postAnswerErr,
} from './actions';

export function* getQuestionDataWorker(res) {
  try {
    const eosService = yield select(selectEos);
    const questionData = yield call(() =>
      getQuestionData(eosService, res.questionId),
    );
    yield put(getQuestionDataSuccess(questionData));
  } catch (err) {
    yield put(getQuestionDataErr(err));
  }
}

export function* postCommentWorker(res) {
  try {
    const eosService = yield select(selectEos);
    yield call(() =>
      postComment(
        res.user,
        res.questionId,
        res.answerId,
        res.comment,
        eosService,
      ),
    );
    yield put(getQuestionDataAction(res.questionId));
    yield put(postCommentSuccess());
  } catch (err) {
    yield put(postCommentErr(err));
  }
}

export function* postAnswerWorker(res) {
  try {
    const eosService = yield select(selectEos);
    yield call(() =>
      postAnswer(res.user, res.questionId, res.answer, eosService),
    );
    yield put(getQuestionDataAction(res.questionId));
    yield put(postAnswerSuccess());
  } catch (err) {
    yield put(postAnswerErr(err));
  }
}

export default function*() {
  yield takeEvery(GET_QUESTION_DATA, getQuestionDataWorker);
  yield takeEvery(POST_COMMENT, postCommentWorker);
  yield takeEvery(POST_ANSWER, postAnswerWorker);
}
