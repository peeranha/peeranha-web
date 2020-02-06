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
  changeQuestionType,
} from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { removeUserProfile } from 'containers/DataCacheProvider/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  makeSelectProfileInfo,
  makeSelectAccount,
} from 'containers/AccountProvider/selectors';

import {
  getCurrentAccountWorker,
  isAvailableAction,
} from 'containers/AccountProvider/saga';
import { isAuthorized } from 'containers/EosioProvider/saga';
import { selectQuestions } from 'containers/Questions/selectors';
import { getUniqQuestions } from 'containers/Questions/actions';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';
import { QUESTION_TYPES } from 'components/QuestionForm/QuestionTypeField';

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
  POST_COMMENT_SUCCESS,
  POST_ANSWER_SUCCESS,
  GET_QUESTION_DATA_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  SAVE_COMMENT_SUCCESS,
  QUESTION_PROPERTIES,
  CHANGE_QUESTION_TYPE,
  CHANGE_QUESTION_TYPE_SUCCESS,
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
  changeQuestionTypeErr,
  changeQuestionTypeSuccess,
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
  deleteCommentValidator,
  editCommentValidator,
} from './validate';

export const isGeneralQuestion = properties =>
  Boolean(
    properties.find(({ key }) => key === QUESTION_PROPERTIES.GENERAL_KEY),
  );

export const getQuestionTypeValue = isGeneral =>
  isGeneral ? QUESTION_TYPES.GENERAL.value : QUESTION_TYPES.EXPERT.value;

export function* getQuestionData({
  eosService,
  questionId,
  user,
}) /* istanbul ignore next */ {
  let question = yield select(selectQuestions(null, null, questionId));

  if (!question) {
    question = yield call(getQuestionById, eosService, questionId);
  }

  question.isGeneral = isGeneralQuestion(question.properties);

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
    const lastEditedDate = properties.find(
      ({ key }) => key === QUESTION_PROPERTIES.LAST_EDITED_KEY,
    );

    return lastEditedDate ? lastEditedDate.value : null;
  };

  const users = new Map();

  function* addOptions(currentItem) {
    if (currentItem.content) return;

    const content = yield call(getText, currentItem.ipfs_link);

    try {
      currentItem.content = JSON.parse(content);
    } catch (err) {
      currentItem.content = content;
    }

    currentItem.isItWrittenByMe = user === currentItem.user;
    currentItem.lastEditedDate = getlastEditedDate(currentItem.properties);
    currentItem.votingStatus = votingStatus(currentItem.history);

    users.set(
      currentItem.user,
      users.get(currentItem.user)
        ? [...users.get(currentItem.user), currentItem]
        : [currentItem],
    );
  }

  function* processQuestion() {
    yield call(addOptions, question);
  }

  function* processAnswers() {
    yield all(
      question.answers.map(function*(x) {
        yield call(addOptions, x);

        yield all(
          x.comments.map(function*(y) {
            yield call(addOptions, y);
          }),
        );
      }),
    );
  }

  function* processCommentsOfQuestion() {
    yield all(
      question.comments.map(function*(y) {
        yield call(addOptions, y);
      }),
    );
  }

  yield all([processQuestion(), processAnswers(), processCommentsOfQuestion()]);

  // To avoid of fetching same user profiles - remember it and to write userInfo here

  yield all(
    Array.from(users.keys()).map(function*(user) {
      const userInfo = yield call(getUserProfileWorker, { user });

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

// TODO: test (with validation)
export function* saveCommentWorker({
  questionId,
  answerId,
  commentId,
  comment,
  toggleView,
  buttonId,
}) {
  try {
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    yield call(isAvailableAction, () =>
      editCommentValidator(profileInfo, buttonId, translationMessages[locale]),
    );

    yield call(
      editComment,
      profileInfo.user,
      questionId,
      answerId,
      commentId,
      comment,
      eosService,
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

    yield put(saveCommentSuccess({ ...questionData }, buttonId));
  } catch (err) {
    yield put(saveCommentErr(err, buttonId));
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

    yield call(isAvailableAction, () =>
      deleteCommentValidator(
        profileInfo,
        buttonId,
        translationMessages[locale],
      ),
    );

    yield call(
      deleteComment,
      profileInfo.user,
      questionId,
      answerId,
      commentId,
      eosService,
    );

    if (+answerId === 0) {
      questionData.comments = questionData.comments.filter(
        x => x.id != commentId,
      );
    } else if (+answerId > 0) {
      const answer = questionData.answers.find(x => x.id == answerId);
      answer.comments = answer.comments.filter(x => x.id != commentId);
    }

    yield put(deleteCommentSuccess({ ...questionData }, buttonId));
  } catch (err) {
    yield put(deleteCommentErr(err, buttonId));
  }
}

export function* deleteAnswerWorker({ questionId, answerId, buttonId }) {
  try {
    const { questionData, eosService, locale, profileInfo } = yield call(
      getParams,
    );

    yield call(isAvailableAction, () =>
      deleteAnswerValidator(
        buttonId,
        answerId,
        questionData.correct_answer_id,
        translationMessages[locale],
        profileInfo,
      ),
    );

    yield call(
      deleteAnswer,
      profileInfo.user,
      questionId,
      answerId,
      eosService,
    );

    questionData.answers = questionData.answers.filter(x => x.id != answerId);

    yield put(deleteAnswerSuccess({ ...questionData }, buttonId));
  } catch (err) {
    yield put(deleteAnswerErr(err, buttonId));
  }
}

export function* deleteQuestionWorker({ questionId, buttonId }) {
  try {
    const { questionData, eosService, locale, profileInfo } = yield call(
      getParams,
    );

    yield call(isAvailableAction, () =>
      deleteQuestionValidator(
        buttonId,
        questionData.answers.length,
        translationMessages[locale],
        profileInfo,
      ),
    );

    yield call(deleteQuestion, profileInfo.user, questionId, eosService);

    yield put(
      deleteQuestionSuccess({ ...questionData, isDeleted: true }, buttonId),
    );

    yield call(createdHistory.push, routes.questions());
  } catch (err) {
    yield put(deleteQuestionErr(err, buttonId));
  }
}

export function* getQuestionDataWorker({ questionId }) {
  try {
    const { eosService, account } = yield call(getParams);

    const questionData = yield call(getQuestionData, {
      eosService,
      questionId,
      user: account,
    });

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
  buttonId,
}) {
  try {
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    yield call(isAuthorized);

    yield call(isAvailableAction, () =>
      postCommentValidator(
        profileInfo,
        questionData,
        buttonId,
        answerId,
        translationMessages[locale],
      ),
    );

    yield call(
      postComment,
      profileInfo.user,
      questionId,
      answerId,
      comment,
      eosService,
    );

    const newComment = {
      post_time: String(Date.now()).slice(0, -3),
      user: profileInfo.user,
      properties: [],
      history: [],
      content: comment,
      isItWrittenByMe: true,
      votingStatus: {},
      userInfo: profileInfo,
    };

    if (answerId == 0) {
      questionData.comments.push({
        ...newComment,
        id: questionData.comments.length + 1,
      });
    } else {
      const { comments } = questionData.answers.find(x => x.id == answerId);

      comments.push({
        ...newComment,
        id: comments.length + 1,
      });
    }

    yield call(toggleView, true);

    yield call(reset);

    yield put(postCommentSuccess({ ...questionData }, buttonId));
  } catch (err) {
    yield put(postCommentErr(err, buttonId));
  }
}

export function* postAnswerWorker({ questionId, answer, reset }) {
  try {
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    yield call(isAuthorized);

    yield call(isAvailableAction, () =>
      postAnswerValidator(
        profileInfo,
        questionData,
        POST_ANSWER_BUTTON,
        translationMessages[locale],
      ),
    );

    yield call(postAnswer, profileInfo.user, questionId, answer, eosService);

    const newAnswer = {
      id: questionData.answers.length + 1,
      post_time: String(Date.now()).slice(0, -3),
      user: profileInfo.user,
      properties: [],
      history: [],
      isItWrittenByMe: true,
      votingStatus: {},
      userInfo: profileInfo,
      comments: [],
      rating: 0,
      content: answer,
    };

    questionData.answers.push(newAnswer);

    yield call(reset);

    yield put(postAnswerSuccess({ ...questionData }));
  } catch (err) {
    yield put(postAnswerErr(err));
  }
}

export function* downVoteWorker({
  whoWasDownvoted,
  buttonId,
  answerId,
  questionId,
}) {
  try {
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    const usersForUpdate = [whoWasDownvoted];

    yield call(isAuthorized);

    yield call(isAvailableAction, () =>
      downVoteValidator(
        profileInfo,
        questionData,
        buttonId,
        answerId,
        translationMessages[locale],
      ),
    );

    yield call(downVote, profileInfo.user, questionId, answerId, eosService);

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

    yield put(downVoteSuccess({ ...questionData }, usersForUpdate, buttonId));
  } catch (err) {
    yield put(downVoteErr(err, buttonId));
  }
}

export function* upVoteWorker({
  buttonId,
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

    yield call(isAvailableAction, () =>
      upVoteValidator(
        profileInfo,
        questionData,
        buttonId,
        answerId,
        translationMessages[locale],
      ),
    );

    yield call(upVote, profileInfo.user, questionId, answerId, eosService);

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

    yield put(upVoteSuccess({ ...questionData }, usersForUpdate, buttonId));
  } catch (err) {
    yield put(upVoteErr(err, buttonId));
  }
}

export function* markAsAcceptedWorker({
  buttonId,
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

    yield call(isAvailableAction, () =>
      markAsAcceptedValidator(
        profileInfo,
        questionData,
        buttonId,
        translationMessages[locale],
      ),
    );

    yield call(
      markAsAccepted,
      profileInfo.user,
      questionId,
      correctAnswerId,
      eosService,
    );

    questionData.correct_answer_id =
      questionData.correct_answer_id == correctAnswerId
        ? 0
        : Number(correctAnswerId);

    yield put(
      markAsAcceptedSuccess({ ...questionData }, usersForUpdate, buttonId),
    );
  } catch (err) {
    yield put(markAsAcceptedErr(err, buttonId));
  }
}

export function* voteToDeleteWorker({
  questionId,
  answerId,
  commentId,
  buttonId,
  whoWasVoted,
}) {
  try {
    const { questionData, eosService, profileInfo, locale } = yield call(
      getParams,
    );

    const usersForUpdate = [whoWasVoted];

    yield call(isAuthorized);

    yield call(isAvailableAction, () =>
      voteToDeleteValidator(
        profileInfo,
        questionData,
        translationMessages[locale],
        buttonId,
        {
          questionId,
          answerId,
          commentId,
        },
      ),
    );

    yield call(
      voteToDelete,
      profileInfo.user,
      questionId,
      answerId,
      commentId,
      eosService,
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

    yield put(
      voteToDeleteSuccess({ ...questionData }, usersForUpdate, buttonId),
    );
  } catch (err) {
    yield put(voteToDeleteErr(err, buttonId));
  }
}

// Do not spent time for main action - update userInfo as async action after main action
export function* updateQuestionDataAfterTransactionWorker({
  usersForUpdate = [],
  questionData,
}) {
  try {
    let userInfoOpponent;
    const user = yield select(makeSelectAccount());

    yield call(getCurrentAccountWorker);

    if (user !== usersForUpdate[0]) {
      yield put(removeUserProfile(usersForUpdate[0]));
      userInfoOpponent = yield call(getUserProfileWorker, {
        user: usersForUpdate[0],
      });
    }

    const userInfoMe = yield call(getUserProfileWorker, { user });

    const changeUserInfo = item => {
      if (item.user === user) {
        item.userInfo = userInfoMe;
      } else if (item.user === usersForUpdate[0]) {
        item.userInfo = userInfoOpponent;
      }
    };

    changeUserInfo(questionData);
    questionData.comments.forEach(x => changeUserInfo(x));

    questionData.answers.forEach(x => {
      changeUserInfo(x);
      x.comments.forEach(y => changeUserInfo(y));
    });

    yield put(getQuestionDataSuccess({ ...questionData }));
  } catch (err) {
    yield put(getQuestionDataErr(err));
  }
}

function* changeQuestionTypeWorker({ ratingRestore, buttonId }) {
  const { questionData, eosService, profileInfo } = yield call(getParams);

  try {
    yield call(
      changeQuestionType,
      profileInfo.user,
      questionData.id,
      getQuestionTypeValue(!questionData.isGeneral),
      ratingRestore,
      eosService,
    );
    yield put(changeQuestionTypeSuccess(buttonId));
  } catch (err) {
    yield put(changeQuestionTypeErr(err, buttonId));
  }
}
export function* updateQuestionList({ questionData }) {
  if (questionData && questionData.id) {
    yield put(getUniqQuestions([questionData]));
  }
}

export default function*() {
  yield takeEvery(GET_QUESTION_DATA, getQuestionDataWorker);
  yield takeLatest(POST_ANSWER, postAnswerWorker);
  yield takeEvery(POST_COMMENT, postCommentWorker);
  yield takeEvery(UP_VOTE, upVoteWorker);
  yield takeEvery(DOWN_VOTE, downVoteWorker);
  yield takeEvery(MARK_AS_ACCEPTED, markAsAcceptedWorker);
  yield takeEvery(DELETE_QUESTION, deleteQuestionWorker);
  yield takeEvery(DELETE_ANSWER, deleteAnswerWorker);
  yield takeEvery(DELETE_COMMENT, deleteCommentWorker);
  yield takeEvery(SAVE_COMMENT, saveCommentWorker);
  yield takeEvery(VOTE_TO_DELETE, voteToDeleteWorker);
  yield takeEvery(CHANGE_QUESTION_TYPE, changeQuestionTypeWorker);
  yield takeEvery(
    [
      POST_COMMENT_SUCCESS,
      UP_VOTE_SUCCESS,
      DOWN_VOTE_SUCCESS,
      MARK_AS_ACCEPTED_SUCCESS,
      DELETE_ANSWER_SUCCESS,
    ],
    updateQuestionDataAfterTransactionWorker,
  );
  yield takeEvery(
    [
      GET_QUESTION_DATA_SUCCESS,
      POST_COMMENT_SUCCESS,
      POST_ANSWER_SUCCESS,
      UP_VOTE_SUCCESS,
      DOWN_VOTE_SUCCESS,
      MARK_AS_ACCEPTED_SUCCESS,
      DELETE_QUESTION_SUCCESS,
      DELETE_ANSWER_SUCCESS,
      DELETE_COMMENT_SUCCESS,
      SAVE_COMMENT_SUCCESS,
      VOTE_TO_DELETE_SUCCESS,
      CHANGE_QUESTION_TYPE_SUCCESS,
    ],
    updateStoredQuestionsWorker,
  );
}
