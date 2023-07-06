import { selectDocumentationMenu } from 'containers/AppWrapper/selectors';
import { getCurrentAccountSuccess } from 'containers/AccountProvider/actions';
import { getProfileInfo } from 'utils/profileManagement';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { getBytes32FromIpfsHash, getText, saveText } from 'utils/ipfs';
import { getActualId, getNetwork } from 'utils/properties';

import {
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
  votingStatus,
} from 'utils/questionsManagement';
import { getSuiPost, getSuiUserById, waitForPostTransactionToIndex } from 'utils/sui/suiIndexer';
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
  SAVE_COMMENT,
  SAVE_COMMENT_SUCCESS,
  UP_VOTE,
  UP_VOTE_SUCCESS,
  GET_HISTORIES,
  GET_HISTORIES_SUCCESS,
} from './constants';

import {
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
  showAddCommentForm,
  upVoteErr,
  upVoteSuccess,
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
} from './validate';
import { selectCommunities, selectUsers } from '../DataCacheProvider/selectors';
import { selectEthereum } from '../EthereumProvider/selectors';
import { getQuestionFromGraph, getCommentId2 } from 'utils/theGraph';

import { selectPostedAnswerIds } from '../AskQuestion/selectors';
import { isSuiBlockchain, waitForTransactionConfirmation } from 'utils/sui/sui';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import {
  deleteSuiAnswer,
  deleteSuiComment,
  deleteSuiQuestion,
  editSuiComment,
  postSuiAnswer,
  postSuiComment,
  markAsAcceptedSuiReply,
  voteSuiPost,
  voteSuiReply,
  suiVotingStatus,
} from 'utils/sui/questionsManagement';
import { createSuiProfile, getSuiProfileInfo } from 'utils/sui/profileManagement';
import { languagesEnum } from 'app/i18n';
import { getSuiUserObject } from 'utils/sui/accountManagement';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';
export const isGeneralQuestion = (question) => Boolean(question.postType === 1);

const getPostsRoute = (postType) => {
  switch (postType) {
    case 0:
      return routes.expertPosts();
    case 1:
      return routes.questions();
    case 2:
      return routes.tutorials();
    default:
      return routes.questions();
  }
};

const isOwnItem = (questionData, profileInfo, answerId) =>
  questionData.author.user === profileInfo.user ||
  questionData.answers.find((x) => x.id === answerId)?.user === profileInfo.user;

export function* getQuestionData({ questionId, user }) /* istanbul ignore next */ {
  let ethereumService;
  if (!isSuiBlockchain) {
    ethereumService = yield select(selectEthereum);
  }
  const postedAnswerIds = yield select(selectPostedAnswerIds());
  const question = yield call(getQuestionFromGraph, questionId);

  const isQuestionChanged = isItemChanged(CHANGED_POSTS_KEY, questionId);
  const isQuestionJustCreated = postedAnswerIds.includes(questionId);
  question.commentCount = question.comments.length;

  question.author = { ...question.author, user: question.author.id };

  if (!isSuiBlockchain && user) {
    const statusHistory = yield getStatusHistory(
      getNetwork(questionId),
      user,
      getActualId(questionId),
      0,
      0,
      ethereumService,
    );
    question.votingStatus = votingStatus(Number(statusHistory));
  }

  yield all(
    question.answers.map(function* (answer) {
      answer.commentCount = answer.comments.length;
      answer.id = Number(answer.id.split('-')[3]);

      answer.author = { ...answer.author, user: answer.author.id };

      answer.comments = answer.comments.map((comment) => ({
        ...comment,
        author: { ...comment.author, user: comment.author.id },
        id: Number(comment.id.split('-')[2]),
      }));
      if (!isSuiBlockchain && user) {
        const answerStatusHistory = yield call(
          getStatusHistory,
          getNetwork(questionId),
          user,
          getActualId(questionId),
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

  if (!isSuiBlockchain && user && (isQuestionChanged || isQuestionJustCreated)) {
    yield all([processQuestion(), processAnswers(), processCommentsOfQuestion()]);
  }

  // To avoid of fetching same user profiles - remember it and to write author here
  if ((!isSuiBlockchain && user && isQuestionChanged) || isQuestionJustCreated) {
    yield all(
      Array.from(users.keys()).map(function* (userFromItem) {
        const author = yield call(getUserProfileWorker, {
          user: userFromItem.user || userFromItem,
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
  const locale = yield select(makeSelectLocale());
  const profileInfo = yield select(makeSelectProfileInfo());
  const questionBounty = yield select(selectQuestionBounty());
  const histories = yield select(selectHistories());

  let ethereumService;
  if (!isSuiBlockchain) {
    ethereumService = yield select(selectEthereum);
  }

  let account;
  if (isSuiBlockchain) {
    const profile = yield select(makeSelectProfileInfo());
    account = profile?.id;
  } else {
    account = yield select(makeSelectAccount());
  }

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

    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const commentObjectId = yield call(getCommentId2, questionId, answerId, commentId);

      const txResult = yield call(
        editSuiComment,
        wallet,
        profileInfo.id,
        questionId,
        commentObjectId,
        answerId,
        commentId,
        ipfsLink,
        languagesEnum[locale],
      );
      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
    } else {
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

      const newHistory = {
        transactionHash: transaction.transactionHash,
        post: { id: questionId },
        reply: { id: `${questionId}-${answerId}` },
        comment: { id: `${questionId}-${answerId}-${commentId}` },
        eventEntity: 'Comment',
        eventName: 'Edit',
        timeStamp: String(dateNowInSeconds()),
      };
      histories.push(newHistory);
    }

    let item;

    if (answerId === 0) {
      item = questionData.comments?.find((x) => x.id === commentId);
    } else if (answerId > 0) {
      item = questionData.answers
        .find((x) => x.id === answerId)
        .comments.find((x) => x.id === commentId);
    }

    item.content = comment;

    yield call(toggleView, true);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(saveCommentSuccess({ ...questionData }, buttonId));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
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

    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const txResult = yield call(
        deleteSuiComment,
        wallet,
        profileInfo.id,
        questionId,
        answerId,
        commentId,
      );
      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
    } else {
      const transaction = yield call(
        deleteComment,
        profileInfo.user,
        questionId,
        answerId,
        commentId,
        ethereumService,
      );

      const newHistory = {
        transactionHash: transaction.transactionHash,
        eventEntity: 'Comment',
        eventName: 'Delete',
        timeStamp: String(dateNowInSeconds()),
      };

      histories.push(newHistory);
    }

    if (answerId === 0) {
      questionData.comments = questionData.comments.filter((x) => x.id !== commentId);
    } else if (answerId > 0) {
      const answer = questionData.answers.find((x) => x.id === answerId);
      answer.comments = answer.comments.filter((x) => x.id !== commentId);
    }

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(deleteCommentSuccess({ ...questionData }, buttonId));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(deleteCommentErr(err, buttonId));
  }
}

export function* deleteAnswerWorker({ questionId, answerId, buttonId }) {
  try {
    const { questionData, ethereumService, profileInfo, histories } = yield call(getParams);

    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const txResult = yield call(deleteSuiAnswer, wallet, profileInfo.id, questionId, answerId);
      yield put(transactionInPending(txResult.digest));
      const confirmedTx = yield call(waitForTransactionConfirmation, txResult.digest);
      yield call(waitForPostTransactionToIndex, confirmedTx.digest);
      yield put(transactionCompleted());
    } else {
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
    }

    questionData.answers = questionData.answers.filter((x) => x.id !== answerId);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(deleteAnswerSuccess({ ...questionData }, buttonId));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(deleteAnswerErr(err, buttonId));
  }
}

export function* deleteQuestionWorker({ questionId, isDocumentation, buttonId }) {
  try {
    let { questionData, ethereumService, profileInfo } = yield call(getParams);

    if (!questionData) {
      if (isSuiBlockchain) {
        console.log('WARN: questionData is empty. Unable to delete');
      }
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
    } else if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const txResult = yield call(deleteSuiQuestion, wallet, profileInfo.id, questionId);
      yield put(transactionInPending(txResult.digest));
      const confirmedTx = yield call(waitForTransactionConfirmation, txResult.digest);
      yield call(waitForPostTransactionToIndex, confirmedTx.digest);
      yield put(transactionCompleted());
    } else {
      yield call(deleteQuestion, profileInfo.user, questionId, ethereumService);
    }

    yield put(deleteQuestionSuccess({ ...questionData, isDeleted: true }, buttonId));

    yield call(createdHistory.push, getPostsRoute(questionData.postType));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
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
          if (answerProfileInfo && !answerProfileInfo.profile) {
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

    let txHash;
    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const transactionResult = yield call(
        postSuiComment,
        wallet,
        profileInfo.id,
        questionId,
        answerId,
        ipfsLink,
        languagesEnum[locale],
      );
      txHash = transactionResult.digest;
      yield put(transactionInPending(txHash));
      yield call(waitForTransactionConfirmation, txHash);
      yield put(transactionCompleted());
    } else {
      const transaction = yield call(
        postComment,
        profileInfo.user,
        questionId,
        answerId,
        ipfsHash,
        languagesEnum[locale],
        ethereumService,
      );
      txHash = transaction.transactionHash;
    }

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
      transactionHash: txHash,
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
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
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

    let txHash;
    let updatedProfileInfo;

    if (isSuiBlockchain) {
      const wallet = yield select(selectSuiWallet());
      const suiUserObject = yield call(getSuiUserObject, wallet.address);
      if (!suiUserObject) {
        yield call(createSuiProfile, wallet);
        yield put(transactionCompleted());
        const newProfile = yield call(getSuiProfileInfo, wallet.address);

        yield put(getUserProfileSuccess(newProfile));
        yield put(getCurrentAccountSuccess(newProfile.id, 0, 0, 0));
        profileInfo.id = newProfile.id;
      }
      yield put(transactionInitialised());
      const transactionResult = yield call(
        postSuiAnswer,
        wallet,
        profileInfo.id,
        questionId,
        ipfsLink,
        official,
        languagesEnum[locale],
      );
      txHash = transactionResult.digest;
      yield put(transactionInPending(txHash));
      const confirmedTx = yield call(waitForTransactionConfirmation, txHash);
      yield call(waitForPostTransactionToIndex, confirmedTx.digest);
      yield put(transactionCompleted());
      const communities = yield select(selectCommunities());
      updatedProfileInfo = yield call(getSuiUserById, profileInfo.id, communities);
    } else {
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
      updatedProfileInfo = yield call(
        getProfileInfo,
        profileInfo.user,
        ethereumService,
        true,
        true,
        questionData.communityId,
      );

      txHash = transaction.transactionHash;
    }

    questionData.replyCount += 1;
    const replyId = questionData.replyCount;

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
      transactionHash: txHash,
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
      user: profileInfo.id,
    });
    yield put(getQuestionDataSuccess(updatedQuestionData));
    yield put(postAnswerSuccess(questionData));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
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

    if (isSuiBlockchain) {
      try {
        yield put(transactionInitialised());
        const wallet = yield select(selectSuiWallet());
        const profile = yield select(makeSelectProfileInfo());
        let txResult;
        if (!answerId) {
          txResult = yield call(voteSuiPost, wallet, profile.id, questionId, false);
        } else {
          txResult = yield call(voteSuiReply, wallet, profile.id, questionId, answerId, false);
        }
        yield put(transactionInPending(txResult.digest));
        yield call(waitForTransactionConfirmation, txResult.digest);
        yield put(transactionCompleted());
      } catch (err) {
        yield put(transactionFailed(err));
      }
    } else {
      yield call(downVote, profileInfo.user, questionId, answerId, ethereumService);
    }

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
    if (isSuiBlockchain) {
      try {
        yield put(transactionInitialised());
        const wallet = yield select(selectSuiWallet());
        const profile = yield select(makeSelectProfileInfo());
        let txResult;
        if (!answerId) {
          txResult = yield call(voteSuiPost, wallet, profile.id, questionId, true);
        } else {
          txResult = yield call(voteSuiReply, wallet, profile.id, questionId, answerId, true);
        }
        yield put(transactionInPending(txResult.digest));
        yield call(waitForTransactionConfirmation, txResult.digest);
        yield put(transactionCompleted());
      } catch (err) {
        yield put(transactionFailed(err));
      }
    } else {
      yield call(upVote, profileInfo.user, questionId, answerId, ethereumService);
    }

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
    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const txResult = yield call(
        markAsAcceptedSuiReply,
        wallet,
        profileInfo.id,
        questionId,
        correctAnswerId,
      );
      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
    } else {
      yield call(markAsAccepted, profileInfo.user, questionId, correctAnswerId, ethereumService);
    }

    questionData.bestReply = questionData.bestReply === correctAnswerId ? 0 : correctAnswerId;

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(markAsAcceptedSuccess({ ...questionData }, usersForUpdate, buttonId));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(markAsAcceptedErr(err, buttonId));
  }
}

// Do not spent time for main action - update author as async action after main action
// TODO after Graph hooks
export function* updateQuestionDataAfterTransactionWorker({ usersForUpdate = [], questionData }) {
  try {
    let userInfoOpponent;
    const user = yield select(makeSelectAccount());

    if (!isSuiBlockchain) {
      yield call(getCurrentAccountWorker);
    }

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
      CHANGE_QUESTION_TYPE_SUCCESS,
      GET_HISTORIES_SUCCESS,
    ],
    updateStoredQuestionsWorker,
  );
}
