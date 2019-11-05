/* eslint consistent-return: 0, array-callback-return: 0, eqeqeq: 0, no-param-reassign: 0, no-bitwise: 0, no-shadow: 0, func-names: 0 */

import {
  takeEvery,
  takeLatest,
  call,
  put,
  select,
  all,
} from 'redux-saga/effects';

import { translationMessages } from 'i18n';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { getText } from 'utils/ipfs';

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

import { selectEos } from 'containers/EosioProvider/selectors';
import { removeUserProfile } from 'containers/DataCacheProvider/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  makeSelectProfileInfo,
  makeSelectAccount,
} from 'containers/AccountProvider/selectors';

import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from 'containers/Questions/constants';
import { getCurrentAccountWorker } from 'containers/AccountProvider/saga';
import { isAuthorized } from 'containers/EosioProvider/saga';
import { selectQuestions } from 'containers/Questions/selectors';
import { getQuestionsSuccess } from 'containers/Questions/actions';

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
  ITEM_UPV_FLAG,
  ITEM_DNV_FLAG,
  ITEM_VOTED_TO_DEL_FLAG,
  UP_VOTE_SUCCESS,
  DOWN_VOTE_SUCCESS,
  MARK_AS_ACCEPTED_SUCCESS,
  VOTE_TO_DELETE_SUCCESS,
  POST_ANSWER_BUTTON,
  POST_COMMENT_BUTTON,
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
  deleteCommentValidator,
} from './validate';

export function* getQuestionData({
  eosService,
  questionId,
  user,
}) /* istanbul ignore next */ {
  let question = yield select(selectQuestions(null, null, questionId));

  if (!question) {
    question = yield call(() => getQuestionById(eosService, questionId));
  }

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
      isUpVoted: Boolean(getItemStatus(flag, ITEM_UPV_FLAG)),
      isDownVoted: Boolean(getItemStatus(flag, ITEM_DNV_FLAG)),
      isVotedToDelete: Boolean(getItemStatus(flag, ITEM_VOTED_TO_DEL_FLAG)),
    };
  };

  const getlastEditedDate = properties => {
    const LAST_EDITED_KEY = 3;
    const lastEditedDate = properties.filter(x => x.key === LAST_EDITED_KEY)[0];

    return (lastEditedDate && lastEditedDate.value) || null;
  };

  const users = new Map();

  function* addOptions(cachedItem, currentItem) {
    // Item's @content: IF cache is empty - take from IPFS
    if (cachedItem && cachedItem.content) {
      currentItem.content = cachedItem.content;
    } else {
      const content = yield call(() => getText(currentItem.ipfs_link));

      try {
        currentItem.content = JSON.parse(content);
      } catch (err) {
        currentItem.content = content;
      }
    }

    currentItem.isItWrittenByMe = user === currentItem.user;
    currentItem.lastEditedDate = getlastEditedDate(currentItem.properties);

    if (!currentItem.votingStatus) {
      currentItem.votingStatus = votingStatus(currentItem.history);
    }

    users.set(
      currentItem.user,
      users.get(currentItem.user)
        ? [...users.get(currentItem.user), currentItem]
        : [currentItem],
    );
  }

  function* processQuestion() {
    const cachedQuestion = yield select(selectQuestionData());
    yield call(() => addOptions(cachedQuestion, question));
  }

  function* processAnswers() {
    const mostRatingAnswer = window._.maxBy(question.answers, 'rating');

    yield all(
      question.answers.map(function*(x) {
        const cachedAnswer = yield select(selectAnswer(x.id));
        yield call(() => addOptions(cachedAnswer, x));

        x.isTheLargestRating =
          x.rating === mostRatingAnswer.rating &&
          x.rating > TOP_COMMUNITY_DISPLAY_MIN_RATING;

        yield all(
          x.comments.map(function*(y) {
            const cachedComment = yield select(selectComment(x.id, y.id));
            yield call(() => addOptions(cachedComment, y));
          }),
        );
      }),
    );
  }

  function* processCommentsOfQuestion() {
    yield all(
      question.comments.map(function*(x) {
        const answerId = 0; // it is unique ID for question to get comments
        const cachedComment = yield select(selectComment(answerId, x.id));

        yield call(() => addOptions(cachedComment, x));
      }),
    );
  }

  yield all([processQuestion(), processAnswers(), processCommentsOfQuestion()]);

  // To avoid of fetching same user profiles - remember it and to write userInfo here

  yield all(
    Array.from(users.keys()).map(function*(user) {
      const userInfo = yield call(() => getUserProfileWorker({ user }));

      users.get(user).map(cachedItem => {
        cachedItem.userInfo = userInfo;
      });
    }),
  );

  return question;
}

export function* getParams() {
  const questionData = yield select(selectQuestionData());
  const eosService = yield select(selectEos);
  const locale = yield select(makeSelectLocale());
  const profileInfo = yield select(makeSelectProfileInfo());
  const account = yield select(makeSelectAccount());

  return {
    questionData,
    eosService,
    locale,
    account,
    profileInfo,
  };
}

export function* saveCommentWorker({
  questionId,
  answerId,
  commentId,
  comment,
  toggleView,
}) {
  try {
    const { questionData, eosService, profileInfo } = yield call(getParams);

    yield call(() =>
      editComment(
        profileInfo.user,
        questionId,
        answerId,
        commentId,
        comment,
        eosService,
      ),
    );

    let item;

    if (+answerId === 0) {
      item = questionData.comments.find(x => x.id == commentId);
    } else if (+answerId > 0) {
      item = questionData.answers
        .find(x => x.id == answerId)
        .comments.find(x => x.id == commentId);
    }

    item.content = comment;

    yield call(toggleView, true);

    yield put(saveCommentSuccess({ ...questionData }));
  } catch (err) {
    yield put(saveCommentErr(err));
  }
}

export function* deleteCommentWorker({
  questionId,
  answerId,
  commentId,
  buttonId,
}) {
  try {
    const { questionData, eosService, locale, profileInfo } = yield call(
      getParams,
    );

    yield call(() =>
      deleteCommentValidator(
        profileInfo,
        buttonId,
        translationMessages[locale],
      ),
    );

    yield call(() =>
      deleteComment(
        profileInfo.user,
        questionId,
        answerId,
        commentId,
        eosService,
      ),
    );

    if (+answerId === 0) {
      questionData.comments = questionData.comments.filter(
        x => x.id != commentId,
      );
    } else if (+answerId > 0) {
      const answer = questionData.answers.find(x => x.id == answerId);
      answer.comments = answer.comments.filter(x => x.id != commentId);
    }

    yield put(deleteCommentSuccess({ ...questionData }));
  } catch (err) {
    yield put(deleteCommentErr(err));
  }
}

export function* deleteAnswerWorker({ questionId, answerId, postButtonId }) {
  try {
    const { questionData, eosService, locale, profileInfo } = yield call(
      getParams,
    );

    yield call(() =>
      deleteAnswerValidator(
        postButtonId,
        answerId,
        questionData.correct_answer_id,
        translationMessages[locale],
        profileInfo,
      ),
    );

    yield call(() =>
      deleteAnswer(profileInfo.user, questionId, answerId, eosService),
    );

    questionData.answers = questionData.answers.filter(x => x.id != answerId);

    yield put(deleteAnswerSuccess({ ...questionData }));
  } catch (err) {
    yield put(deleteAnswerErr(err));
  }
}

export function* deleteQuestionWorker({ questionId, postButtonId }) {
  try {
    const { questionData, eosService, locale, profileInfo } = yield call(
      getParams,
    );

    yield call(() =>
      deleteQuestionValidator(
        postButtonId,
        questionData.answers.length,
        translationMessages[locale],
        profileInfo,
      ),
    );

    yield call(() => deleteQuestion(profileInfo.user, questionId, eosService));

    yield put(deleteQuestionSuccess());

    yield call(() => createdHistory.push(routes.questions()));
  } catch (err) {
    yield put(deleteQuestionErr(err));
  }
}

export function* getQuestionDataWorker({ questionId }) {
  try {
    const { eosService, account } = yield call(getParams);

    const questionData = yield call(() =>
      getQuestionData({
        eosService,
        questionId,
        user: account,
      }),
    );

    yield put(getQuestionDataSuccess(questionData));
  } catch (err) {
    yield put(getQuestionDataErr(err));
  }
}

export function* postCommentWorker({
  answerId,
  questionId,
  comment,
  reset,
  toggleView,
}) {
  try {
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    yield call(isAuthorized);

    yield call(() =>
      postCommentValidator(
        profileInfo,
        questionData,
        `${POST_COMMENT_BUTTON}${answerId}`,
        answerId,
        translationMessages[locale],
      ),
    );

    yield call(() =>
      postComment(profileInfo.user, questionId, answerId, comment, eosService),
    );

    yield call(updateQuestionDataAfterTransactionWorker, {
      questionData,
    });

    yield call(toggleView, true);

    yield call(reset);

    yield put(postCommentSuccess());
  } catch (err) {
    yield put(postCommentErr(err));
  }
}

export function* postAnswerWorker({ questionId, answer, reset }) {
  try {
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    yield call(isAuthorized);

    yield call(() =>
      postAnswerValidator(
        profileInfo,
        questionData,
        POST_ANSWER_BUTTON,
        translationMessages[locale],
      ),
    );

    yield call(postAnswer, profileInfo.user, questionId, answer, eosService);

    yield call(updateQuestionDataAfterTransactionWorker, {
      questionData,
    });

    yield call(reset);

    yield put(postAnswerSuccess());
  } catch (err) {
    yield put(postAnswerErr(err));
  }
}

export function* downVoteWorker({
  whoWasDownvoted,
  postButtonId,
  answerId,
  questionId,
}) {
  try {
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    const usersForUpdate = [whoWasDownvoted];

    yield call(isAuthorized);

    yield call(() =>
      downVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translationMessages[locale],
      ),
    );

    yield call(() =>
      downVote(profileInfo.user, questionId, answerId, eosService),
    );

    const item =
      Number(answerId) === 0
        ? questionData
        : questionData.answers.find(x => x.id == answerId);

    if (item.votingStatus.isDownVoted) {
      item.rating += 1;
      item.votingStatus.isDownVoted = false;
    } else if (item.votingStatus.isUpVoted) {
      item.rating -= 2;
      item.votingStatus.isDownVoted = true;
      item.votingStatus.isUpVoted = false;
    } else if (!item.votingStatus.isDownVoted) {
      item.rating -= 1;
      item.votingStatus.isDownVoted = true;
    }

    yield put(downVoteSuccess({ ...questionData }, usersForUpdate));
  } catch ({ message }) {
    yield put(downVoteErr(message));
  }
}

export function* upVoteWorker({
  postButtonId,
  answerId,
  questionId,
  whoWasUpvoted,
}) {
  try {
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    const usersForUpdate = [whoWasUpvoted];

    yield call(isAuthorized);

    yield call(() =>
      upVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translationMessages[locale],
      ),
    );

    yield call(() =>
      upVote(profileInfo.user, questionId, answerId, eosService),
    );

    const item =
      Number(answerId) === 0
        ? questionData
        : questionData.answers.find(x => x.id == answerId);

    if (item.votingStatus.isUpVoted) {
      item.rating -= 1;
      item.votingStatus.isUpVoted = false;
    } else if (item.votingStatus.isDownVoted) {
      item.rating += 2;
      item.votingStatus.isUpVoted = true;
      item.votingStatus.isDownVoted = false;
    } else if (!item.votingStatus.isUpVoted) {
      item.rating += 1;
      item.votingStatus.isUpVoted = true;
    }

    yield put(upVoteSuccess({ ...questionData }, usersForUpdate));
  } catch ({ message }) {
    yield put(upVoteErr(message));
  }
}

export function* markAsAcceptedWorker({
  postButtonId,
  questionId,
  correctAnswerId,
  whoWasAccepted,
}) {
  try {
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    const usersForUpdate = [whoWasAccepted];

    yield call(isAuthorized);

    yield call(() =>
      markAsAcceptedValidator(
        profileInfo,
        questionData,
        postButtonId,
        translationMessages[locale],
      ),
    );

    yield call(() =>
      markAsAccepted(profileInfo.user, questionId, correctAnswerId, eosService),
    );

    questionData.correct_answer_id =
      questionData.correct_answer_id == correctAnswerId
        ? 0
        : Number(correctAnswerId);

    yield put(markAsAcceptedSuccess({ ...questionData }, usersForUpdate));
  } catch ({ message }) {
    yield put(markAsAcceptedErr(message));
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
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    const usersForUpdate = [whoWasVoted];

    yield call(isAuthorized);

    yield call(() =>
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

    yield call(() =>
      voteToDelete(
        profileInfo.user,
        questionId,
        answerId,
        commentId,
        eosService,
      ),
    );

    let item;

    if (!+answerId && !commentId) {
      item = questionData;
    } else if (!+answerId && commentId) {
      item = questionData.comments.find(x => x.id == commentId);
    } else if (+answerId && !commentId) {
      item = questionData.answers.find(x => x.id == answerId);
    } else if (+answerId && commentId) {
      item = questionData.answers
        .find(x => x.id == answerId)
        .comments.find(x => x.id == commentId);
    }

    item.votingStatus.isVotedToDelete = true;

    yield put(voteToDeleteSuccess({ ...questionData }, usersForUpdate));
  } catch ({ message }) {
    yield put(voteToDeleteErr(message));
  }
}

// Do not spent time for main action - update userInfo as async action after main action
export function* updateQuestionDataAfterTransactionWorker({
  usersForUpdate,
  questionData,
}) {
  try {
    const user = yield select(makeSelectAccount());

    yield call(getCurrentAccountWorker);

    if (usersForUpdate && user !== usersForUpdate[0]) {
      yield put(removeUserProfile(usersForUpdate[0]));
    }

    yield call(getQuestionDataWorker, { questionId: questionData.id });
  } catch ({ message }) {
    yield put(getQuestionDataErr(message));
  }
}

export function* updateQuestionList({ questionData }) {
  if (questionData) {
    yield put(getQuestionsSuccess([questionData]));
  }
}

export default function*() {
  yield takeEvery(GET_QUESTION_DATA, getQuestionDataWorker);
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
  yield takeEvery(
    [
      UP_VOTE_SUCCESS,
      DOWN_VOTE_SUCCESS,
      MARK_AS_ACCEPTED_SUCCESS,
      VOTE_TO_DELETE_SUCCESS,
    ],
    updateQuestionDataAfterTransactionWorker,
  );
  yield takeEvery(
    [
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
    ],
    updateQuestionList,
  );
}
