/* eslint consistent-return: 0, array-callback-return: 0, eqeqeq: 0, no-param-reassign: 0, no-bitwise: 0, no-shadow: 0, func-names: 0 */

import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import { translationMessages } from 'i18n';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { getText } from 'utils/ipfs';

import {
  changeQuestionType,
  deleteAnswer,
  deleteComment,
  deleteQuestion,
  downVote,
  editComment,
  getQuestionById,
  markAsAccepted,
  postAnswer,
  postComment,
  upVote,
  voteToDelete,
} from 'utils/questionsManagement';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { ACCOUNT_TABLE, ALL_ACCOUNTS_SCOPE } from 'utils/constants';

import { selectEos } from 'containers/EosioProvider/selectors';
import {
  getUserProfileSuccess,
  removeUserProfile,
} from 'containers/DataCacheProvider/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  makeSelectAccount,
  makeSelectProfileInfo,
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
  CHANGE_QUESTION_TYPE,
  CHANGE_QUESTION_TYPE_SUCCESS,
  DELETE_ANSWER,
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  DOWN_VOTE,
  DOWN_VOTE_SUCCESS,
  GET_QUESTION_DATA,
  GET_QUESTION_DATA_SUCCESS,
  ITEM_DNV_FLAG,
  ITEM_UPV_FLAG,
  ITEM_VOTED_TO_DEL_FLAG,
  MARK_AS_ACCEPTED,
  MARK_AS_ACCEPTED_SUCCESS,
  POST_ANSWER,
  POST_ANSWER_BUTTON,
  POST_ANSWER_SUCCESS,
  POST_COMMENT,
  POST_COMMENT_SUCCESS,
  QUESTION_PROPERTIES,
  SAVE_COMMENT,
  SAVE_COMMENT_SUCCESS,
  UP_VOTE,
  UP_VOTE_SUCCESS,
  VOTE_TO_DELETE,
  VOTE_TO_DELETE_SUCCESS,
} from './constants';

import {
  changeQuestionTypeErr,
  changeQuestionTypeSuccess,
  deleteAnswerErr,
  deleteAnswerSuccess,
  deleteCommentErr,
  deleteCommentSuccess,
  deleteQuestionErr,
  deleteQuestionSuccess,
  downVoteErr,
  downVoteSuccess,
  getQuestionDataErr,
  getQuestionDataSuccess,
  markAsAcceptedErr,
  markAsAcceptedSuccess,
  postAnswerErr,
  postAnswerSuccess,
  postCommentErr,
  postCommentSuccess,
  saveCommentErr,
  saveCommentSuccess,
  upVoteErr,
  upVoteSuccess,
  voteToDeleteErr,
  voteToDeleteSuccess,
} from './actions';

import { selectQuestionData } from './selectors';

import {
  deleteAnswerValidator,
  deleteCommentValidator,
  deleteQuestionValidator,
  downVoteValidator,
  editCommentValidator,
  markAsAcceptedValidator,
  postAnswerValidator,
  postCommentValidator,
  upVoteValidator,
  voteToDeleteValidator,
} from './validate';
import { selectUsers } from '../DataCacheProvider/selectors';

export const isGeneralQuestion = properties =>
  Boolean(
    properties.find(({ key }) => key === QUESTION_PROPERTIES.GENERAL_KEY),
  );

export const getQuestionTypeValue = isGeneral =>
  isGeneral ? QUESTION_TYPES.GENERAL.value : QUESTION_TYPES.EXPERT.value;

export function* getQuestionData({
  questionId,
  user,
}) /* istanbul ignore next */ {
  const eosService = yield select(selectEos);
  let question = yield select(selectQuestions(null, null, questionId));

  if (!question) {
    question = yield call(getQuestionById, eosService, questionId);

    if (!question) {
      return null;
    }
  }

  question.isGeneral = isGeneralQuestion(question.properties);

  const getItemStatus = (historyFlag, constantFlag) =>
    historyFlag?.flag & (1 << constantFlag);

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
      if (
        typeof JSON.parse(content) == 'string' ||
        typeof JSON.parse(content) == 'number'
      ) {
        currentItem.content = content;
      } else {
        currentItem.content = JSON.parse(content);
      }
    } catch (err) {
      currentItem.content = content;
    }

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

    if (answerId === 0) {
      item = questionData.comments.find(x => x.id === commentId);
    } else if (answerId > 0) {
      item = questionData.answers
        .find(x => x.id === answerId)
        .comments.find(x => x.id === commentId);
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
      questionData.community_id,
    );

    yield call(
      deleteComment,
      profileInfo.user,
      questionId,
      answerId,
      commentId,
      eosService,
    );

    if (answerId === 0) {
      questionData.comments = questionData.comments.filter(
        x => x.id !== commentId,
      );
    } else if (answerId > 0) {
      const answer = questionData.answers.find(x => x.id === answerId);
      answer.comments = answer.comments.filter(x => x.id !== commentId);
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
      questionData.community_id,
    );

    yield call(
      deleteAnswer,
      profileInfo.user,
      questionId,
      answerId,
      eosService,
    );

    questionData.answers = questionData.answers.filter(x => x.id !== answerId);

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
      questionData.community_id,
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
    const { account } = yield call(getParams);

    const questionData = yield call(getQuestionData, {
      questionId,
      user: account,
    });

    const single = isSingleCommunityWebsite();
    const isAnotherCommunityQuestion =
      single && questionData.community_id !== single;

    if (!questionData) {
      throw new Error(`No question data, id: ${questionId}`);
    }

    const { userInfo, answers } = questionData;
    const profileInfo = yield select(selectUsers(userInfo.user));

    if (!profileInfo.profile) {
      const ipfsProfile = userInfo.ipfs_profile;
      const profile = JSON.parse(yield call(getText, ipfsProfile));
      yield put(getUserProfileSuccess({ ...userInfo, profile }));
    }

    yield all(
      answers.map(function*({ userInfo: answerUserInfo }) {
        const answerProfileInfo = yield select(selectUsers(userInfo.user));
        if (!answerProfileInfo.profile) {
          const profile = JSON.parse(
            yield call(getText, answerUserInfo.ipfs_profile),
          );
          yield put(
            getUserProfileSuccess({
              ...answerUserInfo,
              profile,
            }),
          );
        }
      }),
    );

    if (isAnotherCommunityQuestion) {
      yield put(getQuestionDataSuccess(null));
    } else {
      yield put(getQuestionDataSuccess(questionData));
    }
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
      questionData.community_id,
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

    if (answerId === 0) {
      questionData.comments.push({
        ...newComment,
        id: questionData.comments.length + 1,
      });
    } else {
      const { comments } = questionData.answers.find(x => x.id === answerId);

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

export function* postAnswerWorker({ questionId, answer, official, reset }) {
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
      questionData.community_id,
    );

    yield call(
      postAnswer,
      profileInfo.user,
      questionId,
      answer,
      official,
      eosService,
    );

    const newAnswer = {
      id: questionData.answers.length + 1,
      post_time: String(Date.now()).slice(0, -3),
      user: profileInfo.user,
      properties: official ? [{ key: 10, value: 1 }] : [],
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

    yield put(postAnswerSuccess(questionData));
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
      questionData.community_id,
    );

    yield call(downVote, profileInfo.user, questionId, answerId, eosService);

    const item =
      answerId === 0
        ? questionData
        : questionData.answers.find(x => x.id === answerId);

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
      questionData.community_id,
    );

    yield call(upVote, profileInfo.user, questionId, answerId, eosService);

    const item =
      answerId === 0
        ? questionData
        : questionData.answers.find(x => x.id === answerId);

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
      questionData.community_id,
    );

    yield call(
      markAsAccepted,
      profileInfo.user,
      questionId,
      correctAnswerId,
      eosService,
    );

    questionData.correct_answer_id =
      questionData.correct_answer_id === correctAnswerId ? 0 : correctAnswerId;

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
      questionData.community_id,
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

    if (!answerId && !commentId) {
      item = questionData;
    } else if (!answerId && commentId) {
      item = questionData.comments.find(x => x.id === commentId);
    } else if (answerId && !commentId) {
      item = questionData.answers.find(x => x.id === answerId);
    } else if (answerId && commentId) {
      item = questionData.answers
        .find(x => x.id === answerId)
        .comments.find(x => x.id === commentId);
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

function* changeQuestionTypeWorker({ buttonId }) {
  try {
    const { questionData, eosService, profileInfo, account } = yield call(
      getParams,
    );

    yield call(
      changeQuestionType,
      profileInfo.user,
      questionData.id,
      getQuestionTypeValue(!questionData.isGeneral),
      eosService.scatterInstalled ? 1 : true,
      eosService,
    );

    const profile = yield call(
      eosService.getTableRow,
      ACCOUNT_TABLE,
      ALL_ACCOUNTS_SCOPE,
      account,
    );

    yield put(getUserProfileSuccess(profile));
    yield put(
      getQuestionDataSuccess({
        ...questionData,
        isGeneral: !questionData.isGeneral,
      }),
    );
    yield put(changeQuestionTypeSuccess(buttonId));
  } catch (err) {
    yield put(changeQuestionTypeErr(err, buttonId));
  }
}

export function* updateQuestionList({ questionData }) {
  if (questionData?.id) {
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
