import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';

import {
  getQuestionData,
  postComment,
  postAnswer,
  upVote,
  downVote,
  markAsAccepted,
} from 'utils/questionsManagement';

import { getProfileInfo } from 'utils/profileManagement';

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

import { selectQuestionData } from './selectors';

import {
  postAnswerValidator,
  postCommentValidator,
  markAsAcceptedValidator,
  upVoteValidator,
  downVoteValidator,
} from './validate';

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
    let questionData = yield select(selectQuestionData());
    const eosService = yield select(selectEos);

    const profileInfo = yield call(() => getProfileInfo(res.user, eosService));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      postCommentValidator(
        profileInfo,
        questionData,
        res.postButtonId,
        res.answerId,
        res.translations,
      ),
    );

    if (!isValid) return;

    yield call(() =>
      postComment(
        res.user,
        res.questionId,
        res.answerId,
        res.comment,
        eosService,
      ),
    );

    questionData = yield call(() =>
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
    let questionData = yield select(selectQuestionData());
    const eosService = yield select(selectEos);

    const profileInfo = yield call(() => getProfileInfo(res.user, eosService));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      postAnswerValidator(
        profileInfo,
        questionData,
        res.postButtonId,
        res.translations,
      ),
    );

    if (!isValid) return;

    yield call(() =>
      postAnswer(res.user, res.questionId, res.answer, eosService),
    );

    questionData = yield call(() =>
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
    let questionData = yield select(selectQuestionData());
    const eosService = yield select(selectEos);

    const profileInfo = yield call(() => getProfileInfo(res.user, eosService));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      upVoteValidator(
        profileInfo,
        questionData,
        res.postButtonId,
        res.answerId,
        res.translations,
      ),
    );

    if (!isValid) return;

    yield call(() =>
      upVote(res.user, res.questionId, res.answerId, eosService),
    );

    questionData = yield call(() =>
      getQuestionData(eosService, res.questionId, res.user),
    );

    yield put(upVoteSuccess(questionData));
  } catch (err) {
    yield put(upVoteErr(err));
  }
}

export function* downVoteWorker(res) {
  try {
    let questionData = yield select(selectQuestionData());
    const eosService = yield select(selectEos);

    const profileInfo = yield call(() => getProfileInfo(res.user, eosService));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      downVoteValidator(
        profileInfo,
        questionData,
        res.postButtonId,
        res.answerId,
        res.translations,
      ),
    );

    if (!isValid) return;

    yield call(() =>
      downVote(res.user, res.questionId, res.answerId, eosService),
    );

    questionData = yield call(() =>
      getQuestionData(eosService, res.questionId, res.user),
    );

    yield put(downVoteSuccess(questionData));
  } catch (err) {
    yield put(downVoteErr(err));
  }
}

export function* markAsAcceptedWorker(res) {
  try {
    let questionData = yield select(selectQuestionData());
    const eosService = yield select(selectEos);

    const profileInfo = yield call(() => getProfileInfo(res.user, eosService));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      markAsAcceptedValidator(
        profileInfo,
        questionData,
        res.postButtonId,
        res.translations,
      ),
    );

    if (!isValid) return;

    yield call(() =>
      markAsAccepted(res.user, res.questionId, res.correctAnswerId, eosService),
    );

    questionData = yield call(() =>
      getQuestionData(eosService, res.questionId, res.user),
    );

    yield put(markAsAcceptedSuccess(questionData));
  } catch (err) {
    yield put(markAsAcceptedErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTION_DATA, getQuestionDataWorker);
  yield takeLatest(POST_COMMENT, postCommentWorker);
  yield takeLatest(POST_ANSWER, postAnswerWorker);
  yield takeLatest(UP_VOTE, upVoteWorker);
  yield takeLatest(DOWN_VOTE, downVoteWorker);
  yield takeLatest(MARK_AS_ACCEPTED, markAsAcceptedWorker);
}
