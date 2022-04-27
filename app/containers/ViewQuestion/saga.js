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
  getHistoriesForPost,
  getQuestionById,
  getStatusHistory,
  markAsAccepted,
  postAnswer,
  postComment,
  upVote,
  voteToDelete,
  votingStatus,
} from 'utils/questionsManagement';
import { payBounty } from 'utils/walletManagement';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  CHANGED_POSTS_KEY,
  POST_TYPE,
} from 'utils/constants';
import { dateNowInSeconds } from 'utils/datetime';

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
import { isAuthorized } from 'containers/EthereumProvider/saga';
import { getUniqQuestions } from 'containers/Questions/actions';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';
import { QUESTION_TYPES } from 'components/QuestionForm/QuestionTypeField';

import {
  ANSWER_TYPE,
  CHANGE_QUESTION_TYPE,
  CHANGE_QUESTION_TYPE_SUCCESS,
  CHECK_ADD_COMMENT_AVAILABLE,
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
  PAY_BOUNTY,
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
  QUESTION_TYPE,
  SAVE_COMMENT,
  SAVE_COMMENT_SUCCESS,
  UP_VOTE,
  UP_VOTE_SUCCESS,
  VOTE_TO_DELETE,
  VOTE_TO_DELETE_SUCCESS,
  GET_HISTORIES,
  GET_HISTORIES_SUCCESS,
  GET_HISTORIES_ERROR,
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
  payBountyError,
  payBountySuccess,
  postAnswerErr,
  postAnswerSuccess,
  postCommentErr,
  postCommentSuccess,
  saveCommentErr,
  saveCommentSuccess,
  setVoteToDeleteLoading,
  showAddCommentForm,
  upVoteErr,
  upVoteSuccess,
  voteToDeleteErr,
  voteToDeleteSuccess,
  getHistoriesErr,
  getHistoriesSuccess,
} from './actions';

import { selectQuestionBounty, selectQuestionData } from './selectors';

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
import { selectEthereum } from '../EthereumProvider/selectors';
import { getQuestionFromGraph } from '../../utils/theGraph';
import orderBy from 'lodash/orderBy';
import {
  isItemChanged,
  saveChangedItemIdToSessionStorage,
} from 'utils/sessionStorage';
import { DOWNVOTE_STATUS, UPVOTE_STATUS } from 'utils/ethConstants';

export const isGeneralQuestion = question => Boolean(question.postType === 1);

export const getQuestionTypeValue = postType =>
  postType === POST_TYPE.generalPost
    ? POST_TYPE.expertPost
    : POST_TYPE.generalPost;

const isOwnItem = (questionData, profileInfo, answerId) =>
  questionData.author.user === profileInfo.user ||
  questionData.answers.find(x => x.id === answerId)?.user === profileInfo.user;

export function* getQuestionData({
  questionId,
  user,
  promote,
}) /* istanbul ignore next */ {
  const ethereumService = yield select(selectEthereum);
  let question;

  const isQuestionChanged = isItemChanged(CHANGED_POSTS_KEY, questionId);

  if (user && isQuestionChanged) {
    question = yield call(getQuestionById, ethereumService, questionId, user);
  } else {
    question = yield call(getQuestionFromGraph, +questionId);
    question.commentCount = question.comments.length;
    question.communityId = Number(question.communityId);

    question.author = { ...question.author, user: question.author.id };

    if (user) {
      const statusHistory = yield getStatusHistory(
        user,
        questionId,
        0,
        0,
        ethereumService,
      );

      question.votingStatus = votingStatus(Number(statusHistory));
    }

    yield all(
      question.answers.map(function*(answer) {
        answer.commentCount = answer.comments.length;
        answer.id = Number(answer.id.split('-')[1]);

        answer.author = { ...answer.author, user: answer.author.id };

        answer.comments = answer.comments.map(comment => ({
          ...comment,
          author: { ...comment.author, user: comment.author.id },
          id: Number(comment.id.split('-')[2]),
        }));

        if (user) {
          const answerStatusHistory = yield call(
            getStatusHistory,
            user,
            questionId,
            answer.id,
            0,
            ethereumService,
          );

          answer.votingStatus = votingStatus(Number(answerStatusHistory));
        }
      }),
    );

    question.comments = question.comments.map(comment => ({
      ...comment,
      author: { ...comment.author, user: comment.author.id },
      id: Number(comment.id.split('-')[2]),
    }));
  }

  // const bounty = yield call(getQuestionBounty, questionId, eosService);
  // yield put(getQuestionBountySuccess(bounty));
  question.isGeneral = isGeneralQuestion(question);

  // if (promote && promote.ends_time > dateNowInSeconds()) {
  //   question.promote = { ...promote };
  // } else {
  //   const promotedQuestions = yield call(
  //     getPromotedQuestions,
  //     eosService,
  //     question.communityId,
  //   );
  //
  //   const promotedQuestion = promotedQuestions.find(
  //     item => item.question_id === questionId,
  //   );
  //
  //   if (promotedQuestion) {
  //     question.promote = {
  //       startTime: promotedQuestion.start_time,
  //       endsTime: promotedQuestion.ends_time,
  //     };
  //   }
  // }
  //
  const getItemStatus = (historyFlag, constantFlag) =>
    historyFlag?.flag & (1 << constantFlag);

  const users = new Map();

  function* addOptions(currentItem) {
    users.set(
      currentItem.author,
      users.get(currentItem.author)
        ? [...users.get(currentItem.author), currentItem]
        : [currentItem],
    );

    // currentItem.votingStatus = votingStatus(currentItem);
    if (currentItem.content) return;
    currentItem.content = 'content';

    // const content = yield call(getText, currentItem.ipfsLink);
    //
    // try {
    //   if (
    //     typeof JSON.parse(content) == 'string' ||
    //     typeof JSON.parse(content) == 'number'
    //   ) {
    //     currentItem.content = content;
    //   } else {
    //     currentItem.content = JSON.parse(content);
    //   }
    // } catch (err) {
    //   currentItem.content = content;
    // }
    //
    // currentItem.lastEditedDate = getlastEditedDate(currentItem.properties);

    //
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

  if (user && isQuestionChanged) {
    yield all([
      processQuestion(),
      processAnswers(),
      processCommentsOfQuestion(),
    ]);
  }

  // To avoid of fetching same user profiles - remember it and to write author here
  if (user && isQuestionChanged) {
    yield all(
      Array.from(users.keys()).map(function*(userFromItem) {
        const author = yield call(getUserProfileWorker, {
          user: userFromItem,
          getFullProfile: true,
          isLogin: user === userFromItem,
        });
        users.get(userFromItem).map(cachedItem => {
          cachedItem.author = author;
        });
      }),
    );
  }

  return question;
}

export function* getParams() {
  const questionData = yield select(selectQuestionData());
  const ethereumService = yield select(selectEthereum);
  const locale = yield select(makeSelectLocale());
  const profileInfo = yield select(makeSelectProfileInfo());
  const account = yield select(makeSelectAccount());
  const questionBounty = yield select(selectQuestionBounty());

  return {
    questionData,
    ethereumService,
    locale,
    account,
    profileInfo,
    questionBounty,
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
    const { questionData, ethereumService, profileInfo, locale } = yield call(
      getParams,
    );

    yield call(isAvailableAction, () =>
      editCommentValidator(profileInfo, buttonId, translationMessages[locale]),
    );
    const commentData = {
      content: comment,
    };
    yield call(
      editComment,
      profileInfo.user,
      questionId,
      answerId,
      commentId,
      commentData,
      ethereumService,
    );

    let item;

    if (answerId === 0) {
      item = questionData.comments?.find(x => x.id === commentId);
    } else if (answerId > 0) {
      item = questionData.answers
        .find(x => x.id === answerId)
        .comments.find(x => x.id === commentId);
    }

    item.content = comment;

    yield call(toggleView, true);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

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
    const { questionData, ethereumService, locale, profileInfo } = yield call(
      getParams,
    );

    yield call(
      isAvailableAction,
      () =>
        deleteCommentValidator(
          profileInfo,
          buttonId,
          translationMessages[locale],
          commentId,
          questionData,
        ),
      {
        communityID: questionData.communityId,
      },
    );

    yield call(
      deleteComment,
      profileInfo.user,
      questionId,
      answerId,
      commentId,
      ethereumService,
    );

    if (answerId === 0) {
      questionData.comments = questionData.comments.filter(
        x => x.id !== commentId,
      );
    } else if (answerId > 0) {
      const answer = questionData.answers.find(x => x.id === answerId);
      answer.comments = answer.comments.filter(x => x.id !== commentId);
    }

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(deleteCommentSuccess({ ...questionData }, buttonId));
  } catch (err) {
    yield put(deleteCommentErr(err, buttonId));
  }
}

export function* deleteAnswerWorker({ questionId, answerId, buttonId }) {
  try {
    const { questionData, ethereumService, locale, profileInfo } = yield call(
      getParams,
    );

    yield call(
      isAvailableAction,
      () =>
        deleteAnswerValidator(
          buttonId,
          answerId,
          questionData.bestReply,
          translationMessages[locale],
          profileInfo,
          questionData,
        ),
      {
        communityID: questionData.communityId,
      },
    );

    yield call(
      deleteAnswer,
      profileInfo.user,
      questionId,
      answerId,
      ethereumService,
    );

    questionData.answers = questionData.answers.filter(x => x.id !== answerId);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(deleteAnswerSuccess({ ...questionData }, buttonId));
  } catch (err) {
    yield put(deleteAnswerErr(err, buttonId));
  }
}

export function* deleteQuestionWorker({ questionId, buttonId }) {
  try {
    const {
      questionData,
      ethereumService,
      locale,
      profileInfo,
      questionBounty,
    } = yield call(getParams);

    yield call(
      isAvailableAction,
      () =>
        deleteQuestionValidator(
          buttonId,
          questionData.answers.length,
          translationMessages[locale],
          profileInfo,
          questionData,
        ),
      {
        communityID: questionData.communityId,
      },
    );
    // if (questionBounty) {
    //   yield call(payBounty, profileInfo?.user, questionId, true, eosService);
    //   yield put(payBountySuccess(buttonId));
    // }

    yield call(deleteQuestion, profileInfo.user, questionId, ethereumService);

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
    const isAnotherCommQuestion = single && questionData.communityId !== single;

    if (!questionData) {
      throw new Error(`No question data, id: ${questionId}`);
    }

    const { author, answers } = questionData;

    if (account === questionData.author.id) {
      yield all(
        answers.map(function*({ author: answerUserInfo }) {
          const answerProfileInfo = yield select(selectUsers(author.id));
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
    }

    // const promotedQuestions = yield call(
    //   getPromotedQuestions,
    //   eosService,
    //   questionData.communityId,
    // );
    //
    // const promotedQuestion = promotedQuestions.find(
    //   item => item.question_id === questionId,
    // );
    //
    // if (promotedQuestion) {
    //   questionData.promote = {
    //     startTime: promotedQuestion.start_time,
    //     endsTime: promotedQuestion.ends_time,
    //   };
    // }
    if (isAnotherCommQuestion) {
      yield put(getQuestionDataSuccess(null));
    } else {
      yield put(getQuestionDataSuccess(questionData));
    }
  } catch (err) {
    yield put(getQuestionDataErr(err));
  }
}

export function* checkPostCommentAvailableWorker(buttonId, answerId) {
  const { questionData, profileInfo, locale } = yield call(getParams);

  yield call(isAuthorized);

  yield call(
    isAvailableAction,
    () =>
      postCommentValidator(
        profileInfo,
        questionData,
        buttonId,
        answerId,
        translationMessages[locale],
      ),
    {
      communityID: questionData.communityId,
    },
  );
}

export function* showAddCommentFormWorker({ toggleFormButtonId, answerId }) {
  try {
    yield call(checkPostCommentAvailableWorker, toggleFormButtonId, answerId);
    yield put(showAddCommentForm(toggleFormButtonId));
  } catch (err) {
    yield put(postCommentErr(err, toggleFormButtonId));
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
    const { questionData, ethereumService, profileInfo } = yield call(
      getParams,
    );

    yield call(checkPostCommentAvailableWorker, buttonId, answerId);
    const commentData = {
      content: comment,
    };
    yield call(
      postComment,
      profileInfo.user,
      questionId,
      answerId,
      commentData,
      ethereumService,
    );

    const newComment = {
      postTime: String(dateNowInSeconds()),
      user: profileInfo.user,
      properties: [],
      history: [],
      content: comment,
      isItWrittenByMe: true,
      votingStatus: {},
      author: profileInfo,
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

    yield call(toggleView);

    yield call(reset);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(postCommentSuccess({ ...questionData }, buttonId));
  } catch (err) {
    yield put(postCommentErr(err, buttonId));
  }
}

export function* postAnswerWorker({ questionId, answer, official, reset }) {
  try {
    const { questionData, ethereumService, profileInfo, locale } = yield call(
      getParams,
    );

    yield call(isAuthorized);

    yield call(
      isAvailableAction,
      () =>
        postAnswerValidator(
          profileInfo,
          questionData,
          POST_ANSWER_BUTTON,
          translationMessages[locale],
        ),
      {
        communityID: questionData.communityId,
      },
    );

    const answerData = {
      content: answer,
    };
    yield call(
      postAnswer,
      profileInfo.user,
      questionId,
      answerData,
      official,
      ethereumService,
    );

    const newAnswer = {
      id: questionData.answers.length + 1,
      postTime: String(dateNowInSeconds()),
      user: profileInfo.user,
      properties: official ? [{ key: 10, value: 1 }] : [],
      history: [],
      isItWrittenByMe: true,
      votingStatus: {},
      author: profileInfo,
      comments: [],
      rating: 0,
      content: answer,
    };

    questionData.answers.push(newAnswer);

    yield call(reset);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

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
    const { questionData, ethereumService, profileInfo, locale } = yield call(
      getParams,
    );

    const usersForUpdate = [whoWasDownvoted];

    yield call(isAuthorized);

    yield call(
      isAvailableAction,
      () =>
        downVoteValidator(
          profileInfo,
          questionData,
          buttonId,
          answerId,
          translationMessages[locale],
        ),
      {
        communityID: questionData.communityId,
        skipPermissions: isOwnItem(questionData, profileInfo, answerId),
      },
    );

    yield call(
      downVote,
      profileInfo.user,
      questionId,
      answerId,
      ethereumService,
    );

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

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

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
    const { questionData, ethereumService, profileInfo, locale } = yield call(
      getParams,
    );

    const usersForUpdate = [whoWasUpvoted];

    yield call(isAuthorized);

    yield call(
      isAvailableAction,
      () =>
        upVoteValidator(
          profileInfo,
          questionData,
          buttonId,
          answerId,
          translationMessages[locale],
        ),
      {
        communityID: questionData.communityId,
        skipPermissions: isOwnItem(questionData, profileInfo, answerId),
      },
    );

    yield call(upVote, profileInfo.user, questionId, answerId, ethereumService);

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

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

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
    const { questionData, ethereumService, profileInfo, locale } = yield call(
      getParams,
    );

    const usersForUpdate = [whoWasAccepted];

    yield call(isAuthorized);

    yield call(
      isAvailableAction,
      () =>
        markAsAcceptedValidator(
          profileInfo,
          questionData,
          buttonId,
          translationMessages[locale],
        ),
      {
        communityID: questionData.communityId,
      },
    );

    yield call(
      markAsAccepted,
      profileInfo.user,
      questionId,
      correctAnswerId,
      ethereumService,
    );

    questionData.bestReply =
      questionData.bestReply === correctAnswerId ? 0 : correctAnswerId;

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

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

    const item = {
      questionId,
      answerId,
      commentId,
    };

    let itemData;
    if (!item.answerId && !item.commentId) {
      itemData = questionData;
    } else if (!item.answerId && item.commentId) {
      itemData = questionData.comments.filter(x => x.id === item.commentId)[0];
    } else if (item.answerId && !item.commentId) {
      itemData = questionData.answers.filter(x => x.id === item.answerId)[0];
    } else if (item.answerId && item.commentId) {
      itemData = questionData.answers
        .filter(x => x.id === item.answerId)[0]
        .comments.filter(y => y.id === item.commentId)[0];
    }

    yield call(
      isAvailableAction,
      () =>
        voteToDeleteValidator(
          profileInfo,
          questionData,
          translationMessages[locale],
          buttonId,
          item,
        ),
      {
        communityID: questionData.communityId,
        skipPermissions: itemData.votingStatus.isUpVoted,
      },
    );

    yield call(
      voteToDelete,
      profileInfo.user,
      questionId,
      answerId,
      commentId,
      eosService,
    );

    const isDeleteCommentButton = buttonId.includes('delete-comment-');
    const isDeleteAnswerButton = buttonId.includes(`${ANSWER_TYPE}_delete_`);
    const isDeleteQuestionButton = buttonId.includes(
      `${QUESTION_TYPE}_delete_`,
    );

    const isModeratorDelete =
      isDeleteCommentButton || isDeleteAnswerButton || isDeleteQuestionButton;

    // handle moderator delete action
    if (isModeratorDelete) {
      if (isDeleteCommentButton) {
        // delete comment
        if (answerId === 0) {
          questionData.comments = questionData.comments.filter(
            x => x.id !== commentId,
          );
        } else if (answerId > 0) {
          const answer = questionData.answers.find(x => x.id === answerId);
          answer.comments = answer.comments.filter(x => x.id !== commentId);
        }

        yield put(deleteCommentSuccess({ ...questionData }, buttonId));
      }

      if (isDeleteAnswerButton) {
        // delete answer
        questionData.answers = questionData.answers.filter(
          x => x.id !== answerId,
        );

        yield put(deleteAnswerSuccess({ ...questionData }, buttonId));
      }

      if (isDeleteQuestionButton) {
        // delete question
        yield put(
          deleteQuestionSuccess({ ...questionData, isDeleted: true }, buttonId),
        );

        yield call(createdHistory.push, routes.questions());
      }

      yield put(setVoteToDeleteLoading(false));
    }

    // handle common vote to delete action
    else {
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
    }

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);
  } catch (err) {
    yield put(voteToDeleteErr(err, buttonId));
  }
}

// Do not spent time for main action - update author as async action after main action
//TODO after Graph hooks
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
        item.author = userInfoMe;
      } else if (item.user === usersForUpdate[0]) {
        item.author = userInfoOpponent;
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
    const { questionData, ethereumService, profileInfo } = yield call(
      getParams,
    );
    yield call(
      changeQuestionType,
      ethereumService,
      profileInfo.user,
      questionData.id,
      getQuestionTypeValue(questionData.postType),
    );

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionData.id);

    yield put(
      getQuestionDataSuccess({
        ...questionData,
        postType: getQuestionTypeValue(questionData.postType),
      }),
    );
    yield put(changeQuestionTypeSuccess(buttonId));
  } catch (err) {
    yield put(changeQuestionTypeErr(err, buttonId));
  }
}

function* payBountyWorker({ buttonId }) {
  try {
    const { questionData, eosService, profileInfo } = yield call(getParams);
    yield call(
      payBounty,
      profileInfo?.user,
      questionData?.id,
      false,
      eosService,
    );
    yield put(payBountySuccess(buttonId));
  } catch (err) {
    yield put(payBountyError(err, buttonId));
  }
}

export function* getHistoriesWorker({ postId }) {
  try {
    const histories = yield call(getHistoriesForPost, postId);
    yield put(getHistoriesSuccess(histories));
  } catch (err) {
    yield put(getHistoriesErr(err));
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
  yield takeEvery(CHECK_ADD_COMMENT_AVAILABLE, showAddCommentFormWorker);
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
  yield takeEvery(PAY_BOUNTY, payBountyWorker);
  yield takeEvery(GET_HISTORIES, getHistoriesWorker);
  yield takeEvery(
    [UP_VOTE_SUCCESS, DOWN_VOTE_SUCCESS, MARK_AS_ACCEPTED_SUCCESS],
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
      GET_HISTORIES_SUCCESS,
    ],
    updateStoredQuestionsWorker,
  );
}
