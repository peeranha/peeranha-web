import { takeEvery, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';

import {
  getQuestionData,
  postComment,
  postAnswer,
  upVote,
  downVote,
  markAsAccepted,
} from 'utils/questionsManagement';

import {
  GET_QUESTION_DATA,
  POST_COMMENT,
  POST_ANSWER,
  UP_VOTE,
  DOWN_VOTE,
  MARK_AS_ACCEPTED,
} from './constants';

import {
  getQuestionDataSuccess,
  getQuestionDataErr,
  postCommentSuccess,
  postCommentErr,
  postAnswerSuccess,
  postAnswerErr,
  upVoteSuccess,
  upVoteErr,
  downVoteSuccess,
  downVoteErr,
  markAsAcceptedSuccess,
  markAsAcceptedErr,
} from './actions';

export function* getQuestionDataWorker(res) {
  try {
    const eosService = yield select(selectEos);
    const account = yield call(() => eosService.getSelectedAccount());

    const questionData = yield call(() =>
      getQuestionData(eosService, res.questionId, account),
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

    const questionData = yield call(() =>
      getQuestionData(eosService, res.questionId, res.user),
    );

    yield call(() => res.reset());
    yield put(postCommentSuccess(questionData));
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

    const questionData = yield call(() =>
      getQuestionData(eosService, res.questionId, res.user),
    );

    yield call(() => res.reset());
    yield put(postAnswerSuccess(questionData));
  } catch (err) {
    yield put(postAnswerErr(err));
  }
}

export function* upVoteWorker(res) {
  try {
    const eosService = yield select(selectEos);

    yield call(() =>
      upVote(res.user, res.questionId, res.answerId, eosService),
    );

    const questionData = yield call(() =>
      getQuestionData(eosService, res.questionId, res.user),
    );

    yield put(upVoteSuccess(questionData));
  } catch (err) {
    yield put(upVoteErr(err));
  }
}

export function* downVoteWorker(res) {
  try {
    const eosService = yield select(selectEos);

    yield call(() =>
      downVote(res.user, res.questionId, res.answerId, eosService),
    );

    const questionData = yield call(() =>
      getQuestionData(eosService, res.questionId, res.user),
    );

    yield put(downVoteSuccess(questionData));
  } catch (err) {
    yield put(downVoteErr(err));
  }
}

export function* markAsAcceptedWorker(res) {
  try {
    const eosService = yield select(selectEos);

    yield call(() =>
      markAsAccepted(res.user, res.questionId, res.correctAnswerId, eosService),
    );

    const questionData = yield call(() =>
      getQuestionData(eosService, res.questionId, res.user),
    );

    yield put(markAsAcceptedSuccess(questionData));
  } catch (err) {
    yield put(markAsAcceptedErr(err));
  }
}

export default function*() {
  yield takeEvery(GET_QUESTION_DATA, getQuestionDataWorker);
  yield takeEvery(POST_COMMENT, postCommentWorker);
  yield takeEvery(POST_ANSWER, postAnswerWorker);
  yield takeEvery(UP_VOTE, upVoteWorker);
  yield takeEvery(DOWN_VOTE, downVoteWorker);
  yield takeEvery(MARK_AS_ACCEPTED, markAsAcceptedWorker);
}
