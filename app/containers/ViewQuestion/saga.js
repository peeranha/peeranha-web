/* eslint consistent-return: 0 */

import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { getText } from 'utils/ipfs';

import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import { removeUserProfile } from 'containers/DataCacheProvider/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  getQuestionById,
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

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from 'containers/Questions/constants';

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
  contentOptionsClass,
  commentsOpened,
  ITEM_UPV_FLAG,
  ITEM_DNV_FLAG,
  ITEM_VOTED_TO_DEL_FLAG,
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

import { selectQuestionData, selectAnswer, selectComment } from './selectors';

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

/* eslint no-param-reassign: 0 */
export function* getQuestionData({
  eosService,
  questionId,
  user,
}) /* istanbul ignore next */ {
  const question = yield call(() => getQuestionById(eosService, questionId));

  /* eslint no-bitwise: 0 */
  const getItemStatus = (historyFlag, constantFlag) =>
    historyFlag && historyFlag.flag & (1 << constantFlag);

  /*
   * @ITEM_UPV_FLAG - number of bit from historyFlag value - zero bit
   * got status with help of @getItemStatus function
   * if value of this bit NOT 0 => status (isUpVoted) is true
   * and so on
   */

  const votingStatus = history => {
    const flag = history.filter(x => x.user === user)[0];

    return {
      isUpVoted: !!getItemStatus(flag, ITEM_UPV_FLAG),
      isDownVoted: !!getItemStatus(flag, ITEM_DNV_FLAG),
      isVotedToDelete: !!getItemStatus(flag, ITEM_VOTED_TO_DEL_FLAG),
    };
  };

  // key: 3 - key to last edited date value
  const getlastEditedDate = properties => {
    const lastEditedDate = properties.filter(x => x.key === 3)[0];
    return (lastEditedDate && lastEditedDate.value) || null;
  };

  const p1 = function*() {
    const cachedQuestion = yield select(selectQuestionData());

    // Question's @content: IF cache is empty - take from IPFS
    if (cachedQuestion && cachedQuestion.content) {
      question.content = cachedQuestion.content;
    } else {
      const content = yield call(() => getText(question.ipfs_link));
      question.content = JSON.parse(content);
    }

    // Question's @userInfo: IF cache is empty - take from IPFS
    const userInfo = yield call(() =>
      getUserProfileWorker({ user: question.user }),
    );
    question.userInfo = userInfo;

    question.isItWrittenByMe = user === question.user;
    question.votingStatus = votingStatus(question.history);
    question.lastEditedDate = getlastEditedDate(question.properties);
  };

  /* eslint no-shadow: 0 */
  const p2 = function*() {
    const mostRatingAnswer = window._.maxBy(question.answers, 'rating');

    yield all(
      question.answers.map(function*(x) {
        const cachedAnswer = yield select(selectAnswer(x.id));

        // Answers's @content: IF cache is empty (ViewQuestion) - take from IPFS
        if (cachedAnswer && cachedAnswer.content) {
          x.content = cachedAnswer.content;
        } else {
          const content = yield call(() => getText(x.ipfs_link));
          x.content = content;
        }

        // Question's @userInfo: IF cache is empty (DataCacheProvider) - take from IPFS
        const userInfo = yield call(() =>
          getUserProfileWorker({ user: x.user }),
        );
        x.userInfo = userInfo;

        x.isItWrittenByMe = user === x.user;
        x.votingStatus = votingStatus(x.history);
        x.lastEditedDate = getlastEditedDate(x.properties);

        x.isTheLargestRating =
          x.rating === mostRatingAnswer.rating &&
          x.rating > TOP_COMMUNITY_DISPLAY_MIN_RATING;

        yield all(
          x.comments.map(function*(y) {
            const cachedComment = yield select(selectComment(x.id, y.id));

            // Answers's @content: IF cache is empty - take from IPFS
            if (cachedComment && cachedComment.content) {
              y.content = cachedComment.content;
            } else {
              const content = yield call(() => getText(y.ipfs_link));
              y.content = content;
            }

            // Question's @userInfo: IF cache is empty - take from IPFS
            const userInfo = yield call(() =>
              getUserProfileWorker({ user: y.user }),
            );
            y.userInfo = userInfo;

            y.isItWrittenByMe = user === y.user;
            y.votingStatus = votingStatus(y.history);
            y.lastEditedDate = getlastEditedDate(y.properties);
          }),
        );
      }),
    );
  };

  const p3 = function*() {
    yield all(
      question.comments.map(function*(x) {
        const answerId = 0; // it is unique ID for question to get comments
        const cachedComment = yield select(selectComment(answerId, x.id));

        // Answers's @content: IF cache is empty - take from IPFS
        if (cachedComment && cachedComment.content) {
          x.content = cachedComment.content;
        } else {
          const content = yield call(() => getText(x.ipfs_link));
          x.content = content;
        }

        // Question's @userInfo: IF cache is empty - take from IPFS
        const userInfo = yield call(() =>
          getUserProfileWorker({ user: x.user }),
        );
        x.userInfo = userInfo;

        x.isItWrittenByMe = user === x.user;
        x.votingStatus = votingStatus(x.history);
        x.lastEditedDate = getlastEditedDate(x.properties);
      }),
    );
  };

  yield all([p1(), p2(), p3()]);

  return question;
}

export function* saveCommentWorker({
  user,
  questionId,
  answerId,
  commentId,
  comment,
  toggleView,
}) {
  try {
    const eosService = yield select(selectEos);

    yield call(() =>
      editComment(user, questionId, answerId, commentId, comment, eosService),
    );

    const questionData = yield getQuestionData({
      eosService,
      questionId,
      user,
    });

    yield call(() => toggleView(true));

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
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(deleteCommentSuccess(questionData));
  } catch (err) {
    yield put(deleteCommentErr(err));
  }
}

export function* deleteAnswerWorker({
  user,
  questionId,
  answerId,
  postButtonId,
}) {
  try {
    let questionData = yield select(selectQuestionData());
    const locale = yield select(makeSelectLocale());
    const eosService = yield select(selectEos);

    const isValid = yield call(() =>
      deleteAnswerValidator(
        postButtonId,
        answerId,
        questionData.correct_answer_id,
        translationMessages[locale],
      ),
    );

    if (!isValid) {
      return yield put(deleteAnswerErr());
    }

    yield call(() => deleteAnswer(user, questionId, answerId, eosService));

    // Delete user profile from DataCacheProvider - to update them after deleting action
    yield put(removeUserProfile(user));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
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

export function* getQuestionDataWorker({ questionId }) {
  try {
    const eosService = yield select(selectEos);
    const user = yield call(() => eosService.getSelectedAccount());

    const questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(getQuestionDataSuccess(questionData));
  } catch (err) {
    yield put(getQuestionDataErr(err));
  }
}

export function* postCommentWorker({
  user,
  postButtonId,
  answerId,
  translations,
  questionId,
  comment,
  reset,
  toggleView,
}) {
  try {
    let questionData = yield select(selectQuestionData());
    const eosService = yield select(selectEos);

    const profileInfo = yield call(() => getUserProfileWorker({ user }));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      postCommentValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      ),
    );

    if (!isValid) {
      return yield put(postCommentErr());
    }

    yield call(() =>
      postComment(user, questionId, answerId, comment, eosService),
    );

    yield call(() => toggleView(true));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield call(() => reset());

    yield call(() =>
      window.$(`.${contentOptionsClass}`).attr(`data-${commentsOpened}`, false),
    );

    yield put(postCommentSuccess(questionData));
  } catch (err) {
    yield put(postCommentErr(err));
  }
}

export function* postAnswerWorker({
  user,
  questionId,
  answer,
  translations,
  postButtonId,
  reset,
}) {
  try {
    let questionData = yield select(selectQuestionData());
    const eosService = yield select(selectEos);

    const profileInfo = yield call(() => getUserProfileWorker({ user }));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      postAnswerValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      ),
    );

    if (!isValid) {
      return yield put(postAnswerErr());
    }

    yield call(() => postAnswer(user, questionId, answer, eosService));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield call(() => reset());
    yield put(postAnswerSuccess(questionData));
  } catch (err) {
    yield put(postAnswerErr(err));
  }
}

export function* downVoteWorker({
  whoWasDownvoted,
  user,
  postButtonId,
  answerId,
  translations,
  questionId,
}) {
  try {
    let questionData = yield select(selectQuestionData());
    const eosService = yield select(selectEos);

    const profileInfo = yield call(() => getUserProfileWorker({ user }));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      downVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      ),
    );

    if (!isValid) {
      return yield put(downVoteErr());
    }

    yield call(() => downVote(user, questionId, answerId, eosService));

    // Delete 2 user profiles from DataCacheProvider - to update them after downvoting action
    yield put(removeUserProfile(user));
    yield put(removeUserProfile(whoWasDownvoted));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(downVoteSuccess(questionData));
  } catch (err) {
    yield put(downVoteErr(err));
  }
}

export function* upVoteWorker({
  user,
  postButtonId,
  answerId,
  translations,
  questionId,
  whoWasUpvoted,
}) {
  try {
    let questionData = yield select(selectQuestionData());
    const eosService = yield select(selectEos);

    const profileInfo = yield call(() => getUserProfileWorker({ user }));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      upVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      ),
    );

    if (!isValid) {
      return yield put(upVoteErr());
    }

    yield call(() => upVote(user, questionId, answerId, eosService));

    // Delete 2 user profiles from DataCacheProvider - to update them after upvoting action
    yield put(removeUserProfile(user));
    yield put(removeUserProfile(whoWasUpvoted));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(upVoteSuccess(questionData));
  } catch (err) {
    yield put(upVoteErr(err));
  }
}

export function* markAsAcceptedWorker({
  user,
  postButtonId,
  translations,
  questionId,
  correctAnswerId,
  whoWasAccepted,
}) {
  try {
    let questionData = yield select(selectQuestionData());
    const eosService = yield select(selectEos);

    const profileInfo = yield call(() => getUserProfileWorker({ user }));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    const isValid = yield call(() =>
      markAsAcceptedValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      ),
    );

    if (!isValid) {
      return yield put(markAsAcceptedErr());
    }

    yield call(() =>
      markAsAccepted(user, questionId, correctAnswerId, eosService),
    );

    // Delete 2 user profiles from DataCacheProvider - to update them after accepting action
    yield put(removeUserProfile(user));
    yield put(removeUserProfile(whoWasAccepted));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
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
  whoWasVoted,
}) {
  try {
    let questionData = yield select(selectQuestionData());

    const eosService = yield select(selectEos);
    const locale = yield select(makeSelectLocale());
    const user = yield call(() => eosService.getSelectedAccount());

    const profileInfo = yield call(() => getUserProfileWorker({ user }));

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
      voteToDelete(user, questionId, answerId, commentId, eosService),
    );

    // Delete user profile from DataCacheProvider - to update them after accepting action
    yield put(removeUserProfile(whoWasVoted));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
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
