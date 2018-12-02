/* eslint consistent-return: 0 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  getQuestionData,
  postComment,
  postAnswer,
  upVote,
  downVote,
  markAsAccepted,
  deleteQuestion,
  deleteAnswer,
  deleteComment,
  editComment,
  voteToDelete,
} from 'utils/questionsManagement';

import { getProfileInfo } from 'utils/profileManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  GET_QUESTION_DATA,
  POST_COMMENT,
  POST_ANSWER,
  UP_VOTE,
  DOWN_VOTE,
  MARK_AS_ACCEPTED,
  DELETE_QUESTION,
  DELETE_ANSWER,
  DELETE_COMMENT,
  SAVE_COMMENT,
  VOTE_TO_DELETE,
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
  deleteQuestionSuccess,
  deleteQuestionErr,
  deleteAnswerSuccess,
  deleteAnswerErr,
  deleteCommentSuccess,
  deleteCommentErr,
  saveCommentSuccess,
  saveCommentErr,
  voteToDeleteSuccess,
  voteToDeleteErr,
} from './actions';

import { selectQuestionData } from './selectors';

import {
  deleteAnswerValidator,
  deleteQuestionValidator,
  postAnswerValidator,
  postCommentValidator,
  markAsAcceptedValidator,
  upVoteValidator,
  downVoteValidator,
  voteToDeleteValidator,
} from './validate';

export function* saveCommentWorker({
  user,
  questionId,
  answerId,
  commentId,
  comment,
}) {
  try {
    const eosService = yield select(selectEos);

    yield call(() =>
      editComment(user, questionId, answerId, commentId, comment, eosService),
    );

    const questionData = yield call(() =>
      getQuestionData(eosService, questionId, user),
    );

    yield put(saveCommentSuccess(questionData));
  } catch (err) {
    yield put(saveCommentErr(err));
  }
}

export function* deleteCommentWorker({
  user,
  questionId,
  answerId,
  commentId,
}) {
  try {
    const eosService = yield select(selectEos);

    yield call(() =>
      deleteComment(user, questionId, answerId, commentId, eosService),
    );

    const questionData = yield call(() =>
      getQuestionData(eosService, questionId, user),
    );

    yield put(deleteCommentSuccess(questionData));
  } catch (err) {
    yield put(deleteCommentErr(err));
  }
}

export function* deleteAnswerWorker({
  user,
  questionid,
  answerid,
  postButtonId,
}) {
  try {
    let questionData = yield select(selectQuestionData());
    const locale = yield select(makeSelectLocale());
    const eosService = yield select(selectEos);

    const isValid = yield call(() =>
      deleteAnswerValidator(
        postButtonId,
        answerid,
        questionData.correct_answer_id,
        translationMessages[locale],
      ),
    );

    if (!isValid) {
      return yield put(deleteAnswerErr());
    }

    yield call(() => deleteAnswer(user, questionid, answerid, eosService));

    questionData = yield call(() =>
      getQuestionData(eosService, questionid, user),
    );

    yield put(deleteAnswerSuccess(questionData));
  } catch (err) {
    yield put(deleteAnswerErr(err));
  }
}

export function* deleteQuestionWorker({ user, questionid, postButtonId }) {
  try {
    const questionData = yield select(selectQuestionData());
    const locale = yield select(makeSelectLocale());
    const eosService = yield select(selectEos);

    const isValid = yield call(() =>
      deleteQuestionValidator(
        postButtonId,
        questionData.answers.length,
        translationMessages[locale],
      ),
    );

    if (!isValid) {
      return yield put(deleteQuestionErr());
    }

    yield call(() => deleteQuestion(user, questionid, eosService));
    yield put(deleteQuestionSuccess());
    yield call(() => createdHistory.push(routes.questions()));
  } catch (err) {
    yield put(deleteQuestionErr(err));
  }
}

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

    if (!isValid) {
      return yield put(postCommentErr());
    }

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

    if (!isValid) {
      return yield put(postAnswerErr());
    }

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

    if (!isValid) {
      return yield put(upVoteErr());
    }

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

    if (!isValid) {
      return yield put(downVoteErr());
    }

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

    if (!isValid) {
      return yield put(markAsAcceptedErr());
    }

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

export function* voteToDeleteWorker({
  questionId,
  answerId,
  commentId,
  postButtonId,
}) {
  try {
    let questionData = yield select(selectQuestionData());

    const eosService = yield select(selectEos);
    const locale = yield select(makeSelectLocale());
    const account = yield call(() => eosService.getSelectedAccount());

    const profileInfo = yield call(() => getProfileInfo(account, eosService));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      voteToDeleteValidator(
        profileInfo,
        questionData,
        translationMessages[locale],
        postButtonId,
        {
          questionId,
          answerId,
          commentId,
        },
      ),
    );

    if (!isValid) {
      return yield put(voteToDeleteErr());
    }

    yield call(() =>
      voteToDelete(account, questionId, answerId, commentId, eosService),
    );

    questionData = yield call(() =>
      getQuestionData(eosService, questionId, account),
    );

    yield put(voteToDeleteSuccess(questionData));
  } catch (err) {
    yield put(voteToDeleteErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTION_DATA, getQuestionDataWorker);
  yield takeLatest(POST_COMMENT, postCommentWorker);
  yield takeLatest(POST_ANSWER, postAnswerWorker);
  yield takeLatest(UP_VOTE, upVoteWorker);
  yield takeLatest(DOWN_VOTE, downVoteWorker);
  yield takeLatest(MARK_AS_ACCEPTED, markAsAcceptedWorker);
  yield takeLatest(DELETE_QUESTION, deleteQuestionWorker);
  yield takeLatest(DELETE_ANSWER, deleteAnswerWorker);
  yield takeLatest(DELETE_COMMENT, deleteCommentWorker);
  yield takeLatest(SAVE_COMMENT, saveCommentWorker);
  yield takeLatest(VOTE_TO_DELETE, voteToDeleteWorker);
}
