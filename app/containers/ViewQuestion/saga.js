import { FORM_SUB_ARTICLE } from 'components/QuestionForm/constants';
import { selectDocumentationMenu } from 'containers/AppWrapper/selectors';
import { getProfileInfo } from 'utils/profileManagement';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { languagesEnum } from 'app/i18n';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { getBytes32FromIpfsHash, getText, saveText } from 'utils/ipfs';

import {
  changeQuestionType,
  deleteAnswer,
  deleteComment,
  deleteDocumentationPost,
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
import { CHANGED_POSTS_KEY, POST_TYPE } from 'utils/constants';
import { dateNowInSeconds } from 'utils/datetime';

import { getUserProfileSuccess, removeUserProfile } from 'containers/DataCacheProvider/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { makeSelectAccount, makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import { getCurrentAccountWorker, isAvailableAction } from 'containers/AccountProvider/saga';
import { isAuthorized } from 'containers/EthereumProvider/saga';
import { getUniqQuestions } from 'containers/Questions/actions';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';

import { isItemChanged, saveChangedItemIdToSessionStorage } from 'utils/sessionStorage';
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

import { selectHistories, selectQuestionBounty, selectQuestionData } from './selectors';

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
import { getQuestionFromGraph } from 'utils/theGraph';

import { selectPostedAnswerIds } from '../AskQuestion/selectors';
export const isGeneralQuestion = (question) => Boolean(question.postType === 1);

const getPostsRoute = (postType) => {
  switch (postType) {
    case 0:
      return routes.expertPosts();
    case 1:
      return routes.questions();
    case 2:
      return routes.tutorials();
  }
};

export const getQuestionTypeValue = (postType) =>
  postType === POST_TYPE.generalPost ? POST_TYPE.expertPost : POST_TYPE.generalPost;

const isOwnItem = (questionData, profileInfo, answerId) =>
  questionData.author.user === profileInfo.user ||
  questionData.answers.find((x) => x.id === answerId)?.user === profileInfo.user;

export function* getQuestionData({ questionId, user }) /* istanbul ignore next */ {
  const ethereumService = yield select(selectEthereum);
  const postedAnswerIds = yield select(selectPostedAnswerIds());
  let question;

  const isQuestionChanged = isItemChanged(CHANGED_POSTS_KEY, questionId);
  const isQuestionJustCreated = postedAnswerIds.includes(Number(questionId));

  if (user && (isQuestionChanged || isQuestionJustCreated)) {
    question = yield call(getQuestionById, ethereumService, questionId, user);
    if (question.officialReply) {
      const officialReply = question.answers.find((answer) => answer.id === question.officialReply);
      if (officialReply) {
        officialReply.isOfficialReply = true;
      }
    }
  } else {
    question = yield call(getQuestionFromGraph, questionId);
    question.commentCount = question.comments.length;
    question.communityId = Number(question.communityId);

    question.author = { ...question.author, user: question.author.id };

    if (user) {
      const statusHistory = yield getStatusHistory(user, questionId, 0, 0, ethereumService);

      question.votingStatus = votingStatus(Number(statusHistory));
    }

    yield all(
      question.answers.map(function* (answer) {
        answer.commentCount = answer.comments.length;
        answer.id = Number(answer.id.split('-')[1]);

        answer.author = { ...answer.author, user: answer.author.id };

        answer.comments = answer.comments.map((comment) => ({
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

    question.comments = question.comments.map((comment) => ({
      ...comment,
      author: { ...comment.author, user: comment.author.id },
      id: Number(comment.id.split('-')[2]),
    }));
  }

  question.isGeneral = isGeneralQuestion(question);

  const users = new Map();

  function* addOptions(currentItem) {
    users.set(
      currentItem.author,
      users.get(currentItem.author)
        ? [...users.get(currentItem.author), currentItem]
        : [currentItem],
    );

    if (currentItem.content) return;
    currentItem.content = 'content';
  }

  function* processQuestion() {
    yield call(addOptions, question);
  }

  function* processAnswers() {
    yield all(
      question.answers.map(function* (x) {
        yield call(addOptions, x);

        yield all(
          x.comments.map(function* (y) {
            yield call(addOptions, y);
          }),
        );
      }),
    );
  }

  function* processCommentsOfQuestion() {
    yield all(
      question.comments.map(function* (y) {
        yield call(addOptions, y);
      }),
    );
  }

  if (user && (isQuestionChanged || isQuestionJustCreated)) {
    yield all([processQuestion(), processAnswers(), processCommentsOfQuestion()]);
  }

  // To avoid of fetching same user profiles - remember it and to write author here
  if ((user && isQuestionChanged) || isQuestionJustCreated) {
    yield all(
      Array.from(users.keys()).map(function* (userFromItem) {
        const author = yield call(getUserProfileWorker, {
          user: userFromItem,
          getFullProfile: true,
          communityIdForRating: question.communityId,
        });
        users.get(userFromItem).map((cachedItem) => {
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
  const histories = yield select(selectHistories());

  return {
    questionData,
    ethereumService,
    locale,
    account,
    profileInfo,
    questionBounty,
    histories,
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
    const { questionData, ethereumService, profileInfo, locale, histories } = yield call(getParams);

    yield call(isAvailableAction, () => editCommentValidator(profileInfo, buttonId));
    const commentData = {
      content: comment,
    };
    const ipfsLink = yield call(saveText, JSON.stringify(commentData));
    const ipfsHash = getBytes32FromIpfsHash(ipfsLink);

    const transaction = yield call(
      editComment,
      profileInfo.user,
      questionId,
      answerId,
      commentId,
      ipfsHash,
      languagesEnum[locale],
      ethereumService,
    );

    let item;

    if (answerId === 0) {
      item = questionData.comments?.find((x) => x.id === commentId);
    } else if (answerId > 0) {
      item = questionData.answers
        .find((x) => x.id === answerId)
        .comments.find((x) => x.id === commentId);
    }

    const newHistory = {
      transactionHash: transaction.transactionHash,
      post: { id: questionId },
      reply: { id: `${questionId}-${answerId}` },
      comment: { id: `${questionId}-${answerId}-${commentId}` },
      eventEntity: 'Comment',
      eventName: 'Edit',
      timeStamp: String(dateNowInSeconds()),
    };

    item.content = comment;

    histories.push(newHistory);

    yield call(toggleView, true);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(saveCommentSuccess({ ...questionData }, buttonId));
  } catch (err) {
    yield put(saveCommentErr(err, buttonId));
  }
}

export function* deleteCommentWorker({ questionId, answerId, commentId, buttonId }) {
  try {
    const { questionData, ethereumService, profileInfo, histories } = yield call(getParams);

    yield call(
      isAvailableAction,
      () => deleteCommentValidator(profileInfo, buttonId, commentId, questionData),
      {
        communityID: questionData.communityId,
      },
    );

    const transaction = yield call(
      deleteComment,
      profileInfo.user,
      questionId,
      answerId,
      commentId,
      ethereumService,
    );

    if (answerId === 0) {
      questionData.comments = questionData.comments.filter((x) => x.id !== commentId);
    } else if (answerId > 0) {
      const answer = questionData.answers.find((x) => x.id === answerId);
      answer.comments = answer.comments.filter((x) => x.id !== commentId);
    }

    const newHistory = {
      transactionHash: transaction.transactionHash,
      eventEntity: 'Comment',
      eventName: 'Delete',
      timeStamp: String(dateNowInSeconds()),
    };

    histories.push(newHistory);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(deleteCommentSuccess({ ...questionData }, buttonId));
  } catch (err) {
    yield put(deleteCommentErr(err, buttonId));
  }
}

export function* deleteAnswerWorker({ questionId, answerId, buttonId }) {
  try {
    const { questionData, ethereumService, profileInfo, histories } = yield call(getParams);

    yield call(
      isAvailableAction,
      () =>
        deleteAnswerValidator(
          buttonId,
          answerId,
          questionData.bestReply,
          profileInfo,
          questionData,
        ),
      {
        communityID: questionData.communityId,
      },
    );

    const transaction = yield call(
      deleteAnswer,
      profileInfo.user,
      questionId,
      answerId,
      ethereumService,
    );

    const newHistory = {
      transactionHash: transaction.transactionHash,
      eventEntity: 'Reply',
      eventName: 'Delete',
      timeStamp: String(dateNowInSeconds()),
    };

    histories.push(newHistory);

    questionData.answers = questionData.answers.filter((x) => x.id !== answerId);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(deleteAnswerSuccess({ ...questionData }, buttonId));
  } catch (err) {
    yield put(deleteAnswerErr(err, buttonId));
  }
}

export function* deleteQuestionWorker({ questionId, isDocumentation, buttonId }) {
  try {
    let { questionData, ethereumService, locale, profileInfo } = yield call(getParams);

    if (!questionData) {
      questionData = yield call(getQuestionById, ethereumService, questionId, profileInfo.user);
    }

    yield call(
      isAvailableAction,
      () =>
        deleteQuestionValidator(buttonId, questionData.answers.length, profileInfo, questionData),
      {
        communityID: questionData.communityId,
      },
    );
    if (isDocumentation) {
      const documentationMenu = yield select(selectDocumentationMenu());
      const documentationTraversal = (documentationArray) =>
        documentationArray.reduce((acc, documentationSection) => {
          if (String(documentationSection.id) !== String(questionId)) {
            if (documentationSection.children.length) {
              return acc.concat({
                id: documentationSection.id,
                children: documentationTraversal(documentationSection.children),
              });
            }
            return acc.concat({
              id: documentationSection.id,
              children: documentationSection.children,
            });
          }
          return acc;
        }, []);

      const newMenu = documentationTraversal(documentationMenu);
      const documentationJSON = {
        pinnedId: '',
        documentations: newMenu,
      };

      yield call(
        deleteDocumentationPost,
        profileInfo.user,
        questionId,
        documentationJSON,
        ethereumService,
      );
    } else {
      yield call(deleteQuestion, profileInfo.user, questionId, ethereumService);
    }

    yield put(deleteQuestionSuccess({ ...questionData, isDeleted: true }, buttonId));

    yield call(createdHistory.push, getPostsRoute(questionData.postType));
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
        answers.map(function* ({ author: answerUserInfo }) {
          const answerProfileInfo = yield select(selectUsers(author.id));
          if (!answerProfileInfo.profile) {
            const profile = JSON.parse(yield call(getText, answerUserInfo.ipfs_profile));
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
    yield put(getQuestionDataSuccess(questionData));
  } catch (err) {
    console.log(err);
    yield put(getQuestionDataErr(err));
  }
}

export function* checkPostCommentAvailableWorker(buttonId, answerId) {
  const { questionData, profileInfo } = yield call(getParams);

  yield call(isAuthorized);

  yield call(
    isAvailableAction,
    () => postCommentValidator(profileInfo, questionData, buttonId, answerId),
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

export function* postCommentWorker({ answerId, questionId, comment, reset, toggleView, buttonId }) {
  try {
    const { questionData, ethereumService, locale, profileInfo, histories } = yield call(getParams);

    yield call(checkPostCommentAvailableWorker, buttonId, answerId);
    const commentData = {
      content: comment,
    };

    const ipfsLink = yield call(saveText, JSON.stringify(commentData));
    const ipfsHash = getBytes32FromIpfsHash(ipfsLink);

    const transaction = yield call(
      postComment,
      profileInfo.user,
      questionId,
      answerId,
      ipfsHash,
      languagesEnum[locale],
      ethereumService,
    );

    const newComment = {
      ipfsHash,
      postTime: String(dateNowInSeconds()),
      user: profileInfo.user,
      properties: [],
      history: [],
      content: comment,
      isItWrittenByMe: true,
      votingStatus: {},
      author: profileInfo,
    };

    let commentId;

    if (answerId === 0) {
      questionData.commentCount += 1;
      commentId = questionData.commentCount;
      questionData.comments.push({
        ...newComment,
        id: commentId,
      });
    } else {
      const { comments, commentCount } = questionData.answers.find((x) => x.id === answerId);
      questionData.answers.find((x) => x.id === answerId).commentCount += 1;
      commentId = commentCount + 1;
      comments.push({
        ...newComment,
        id: commentId,
      });
    }

    const newHistory = {
      transactionHash: transaction.transactionHash,
      post: { id: questionId },
      reply: { id: `${questionId}-${answerId}` },
      comment: { id: `${questionId}-${answerId}-${commentId}` },
      eventEntity: 'Comment',
      eventName: 'Create',
      timeStamp: newComment.postTime,
    };

    histories.push(newHistory);

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
    const { questionData, ethereumService, locale, profileInfo, histories, account } = yield call(
      getParams,
    );

    yield call(isAuthorized);

    yield call(
      isAvailableAction,
      () => postAnswerValidator(profileInfo, questionData, POST_ANSWER_BUTTON),
      {
        communityID: questionData.communityId,
      },
    );

    const answerData = {
      content: answer,
    };

    const ipfsLink = yield call(saveText, JSON.stringify(answerData));
    const ipfsHash = getBytes32FromIpfsHash(ipfsLink);

    const transaction = yield call(
      postAnswer,
      profileInfo.user,
      questionId,
      ipfsHash,
      official,
      languagesEnum[locale],
      ethereumService,
    );

    questionData.replyCount += 1;
    const replyId = questionData.replyCount;

    const updatedProfileInfo = yield call(
      getProfileInfo,
      profileInfo.user,
      ethereumService,
      true,
      true,
      questionData.communityId,
    );

    const newAnswer = {
      id: replyId,
      postTime: String(dateNowInSeconds()),
      user: profileInfo.user,
      properties: official ? [{ key: 10, value: 1 }] : [],
      isOfficialReply: official,
      history: [],
      isItWrittenByMe: true,
      votingStatus: {},
      author: updatedProfileInfo,
      comments: [],
      commentCount: 0,
      rating: 0,
      content: answer,
      ipfsHash,
    };

    const newHistory = {
      transactionHash: transaction.transactionHash,
      post: { id: questionId },
      reply: { id: `${questionId}-${newAnswer.id}` },
      eventEntity: 'Reply',
      eventName: 'Create',
      timeStamp: newAnswer.postTime,
    };

    histories.push(newHistory);

    questionData.answers.push(newAnswer);

    yield call(reset);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    const updatedQuestionData = yield call(getQuestionData, {
      questionId,
      user: account,
    });
    yield put(getQuestionDataSuccess(updatedQuestionData));
    yield put(postAnswerSuccess(questionData));
  } catch (err) {
    yield put(postAnswerErr(err));
  }
}

export function* downVoteWorker({ whoWasDownvoted, buttonId, answerId, questionId }) {
  try {
    const { questionData, ethereumService, profileInfo } = yield call(getParams);

    const usersForUpdate = [whoWasDownvoted];

    yield call(isAuthorized);

    yield call(
      isAvailableAction,
      () => downVoteValidator(profileInfo, questionData, buttonId, answerId),
      {
        communityID: questionData.communityId,
        skipPermissions: isOwnItem(questionData, profileInfo, answerId),
      },
    );

    yield call(downVote, profileInfo.user, questionId, answerId, ethereumService);

    const item =
      answerId === 0 ? questionData : questionData.answers.find((x) => x.id === answerId);

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

export function* upVoteWorker({ buttonId, answerId, questionId, whoWasUpvoted }) {
  try {
    const { questionData, ethereumService, profileInfo } = yield call(getParams);

    const usersForUpdate = [whoWasUpvoted];

    yield call(isAuthorized);

    yield call(
      isAvailableAction,
      () => upVoteValidator(profileInfo, questionData, buttonId, answerId),
      {
        communityID: questionData.communityId,
        skipPermissions: isOwnItem(questionData, profileInfo, answerId),
      },
    );

    yield call(upVote, profileInfo.user, questionId, answerId, ethereumService);

    const item =
      answerId === 0 ? questionData : questionData.answers.find((x) => x.id === answerId);

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

export function* markAsAcceptedWorker({ buttonId, questionId, correctAnswerId, whoWasAccepted }) {
  try {
    const { questionData, ethereumService, profileInfo } = yield call(getParams);

    const usersForUpdate = [whoWasAccepted];

    yield call(isAuthorized);

    yield call(
      isAvailableAction,
      () => markAsAcceptedValidator(profileInfo, questionData, buttonId),
      {
        communityID: questionData.communityId,
      },
    );

    yield call(markAsAccepted, profileInfo.user, questionId, correctAnswerId, ethereumService);

    questionData.bestReply = questionData.bestReply === correctAnswerId ? 0 : correctAnswerId;

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(markAsAcceptedSuccess({ ...questionData }, usersForUpdate, buttonId));
  } catch (err) {
    yield put(markAsAcceptedErr(err, buttonId));
  }
}

export function* voteToDeleteWorker({ questionId, answerId, commentId, buttonId, whoWasVoted }) {
  try {
    const { questionData, ethereumService, profileInfo } = yield call(getParams);

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
      itemData = questionData.comments.filter((x) => x.id === item.commentId)[0];
    } else if (item.answerId && !item.commentId) {
      itemData = questionData.answers.filter((x) => x.id === item.answerId)[0];
    } else if (item.answerId && item.commentId) {
      itemData = questionData.answers
        .filter((x) => x.id === item.answerId)[0]
        .comments.filter((y) => y.id === item.commentId)[0];
    }

    yield call(
      isAvailableAction,
      () => voteToDeleteValidator(profileInfo, questionData, buttonId, item),
      {
        communityID: questionData.communityId,
        skipPermissions: itemData.votingStatus?.isUpVoted,
      },
    );

    yield call(voteToDelete, profileInfo.user, questionId, answerId, commentId, ethereumService);

    const isDeleteCommentButton = buttonId.includes('delete-comment-');
    const isDeleteAnswerButton = buttonId.includes(`${ANSWER_TYPE}_delete_`);
    const isDeleteQuestionButton = buttonId.includes(`${QUESTION_TYPE}_delete_`);

    const isModeratorDelete =
      isDeleteCommentButton || isDeleteAnswerButton || isDeleteQuestionButton;

    // handle moderator delete action
    if (isModeratorDelete) {
      if (isDeleteCommentButton) {
        // delete comment
        if (answerId === 0) {
          questionData.comments = questionData.comments.filter((x) => x.id !== commentId);
        } else if (answerId > 0) {
          const answer = questionData.answers.find((x) => x.id === answerId);
          answer.comments = answer.comments.filter((x) => x.id !== commentId);
        }

        yield put(deleteCommentSuccess({ ...questionData }, buttonId));
      }

      if (isDeleteAnswerButton) {
        // delete answer
        questionData.answers = questionData.answers.filter((x) => x.id !== answerId);

        yield put(deleteAnswerSuccess({ ...questionData }, buttonId));
      }

      if (isDeleteQuestionButton) {
        // delete question
        yield put(deleteQuestionSuccess({ ...questionData, isDeleted: true }, buttonId));

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
        item = questionData.comments.find((x) => x.id === commentId);
      } else if (answerId && !commentId) {
        item = questionData.answers.find((x) => x.id === answerId);
      } else if (answerId && commentId) {
        item = questionData.answers
          .find((x) => x.id === answerId)
          .comments.find((x) => x.id === commentId);
      }

      item.votingStatus.isVotedToDelete = true;

      yield put(voteToDeleteSuccess({ ...questionData }, usersForUpdate, buttonId));
    }

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);
  } catch (err) {
    yield put(voteToDeleteErr(err, buttonId));
  }
}

// Do not spent time for main action - update author as async action after main action
// TODO after Graph hooks
export function* updateQuestionDataAfterTransactionWorker({ usersForUpdate = [], questionData }) {
  try {
    let userInfoOpponent;
    const user = yield select(makeSelectAccount());

    yield call(getCurrentAccountWorker);

    if (user !== usersForUpdate[0]) {
      yield put(removeUserProfile(usersForUpdate[0]));
      userInfoOpponent = yield call(getUserProfileWorker, {
        user: usersForUpdate[0],
        communityIdForRating: questionData.communityId,
      });
    }

    const userInfoMe = yield call(getUserProfileWorker, { user });

    const changeUserInfo = (item) => {
      if (item.author.user === user) {
        item.author = userInfoMe;
      } else if (item.author.user === usersForUpdate[0]) {
        item.author = userInfoOpponent;
      }
    };

    changeUserInfo(questionData);
    questionData.comments.forEach((x) => changeUserInfo(x));

    questionData.answers.forEach((x) => {
      changeUserInfo(x);
      x.comments.forEach((y) => changeUserInfo(y));
    });

    yield put(getQuestionDataSuccess({ ...questionData }));
  } catch (err) {
    yield put(getQuestionDataErr(err));
  }
}

function* changeQuestionTypeWorker({ buttonId }) {
  try {
    const { questionData, ethereumService, profileInfo } = yield call(getParams);
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
    const { questionData, ethereumService, profileInfo } = yield call(getParams);
    yield call(payBounty, profileInfo?.user, questionData?.id, false, ethereumService);
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

export default function* () {
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
