import ReactGA from 'react-ga4';
import { isMeshServiceConfig } from 'communities-config';
import { selectDocumentationMenu } from 'containers/AppWrapper/selectors';
import { getCurrentAccountSuccess } from 'containers/AccountProvider/actions';
import { showLoginModal } from 'containers/Login/actions';
import { ApplicationError } from 'utils/errors';
import { getProfileInfo } from 'utils/profileManagement';
import { call, put, select, takeEvery, takeLatest, all } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { getBytes32FromIpfsHash, saveText } from 'utils/ipfs';
import { getActualId } from 'utils/properties';

import {
  deleteAnswer,
  deleteComment,
  deleteDocumentationPost,
  deleteQuestion,
  downVote,
  editComment,
  getHistoriesForPost,
  getQuestionById,
  markAsAccepted,
  postAnswer,
  postComment,
  upVote,
  votingStatus,
  getStatusHistory,
} from 'utils/questionsManagement';
import { getSuiUserById, waitForPostTransactionToIndex } from 'utils/sui/suiIndexer';
import { payBounty } from 'utils/walletManagement';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { CHANGED_POSTS_KEY, isSuiBlockchain } from 'utils/constants';
import { dateNowInSeconds } from 'utils/datetime';

import { getUserProfileSuccess, removeUserProfile } from 'containers/DataCacheProvider/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { makeSelectAccount, makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import { getCurrentAccountWorker, isAvailableAction } from 'containers/AccountProvider/saga';
import { isAuthorized } from 'containers/EthereumProvider/saga';
import { getUniqQuestions } from 'containers/Questions/actions';

import { saveChangedItemIdToSessionStorage } from 'utils/sessionStorage';
import { waitForTransactionConfirmation } from 'utils/sui/sui';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import {
  getPost,
  getVoteHistory,
  getCommentId2,
  queryOnlyFromIndexer,
} from 'utils/queries/ethereumService';
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
import {
  CHECK_ADD_COMMENT_AVAILABLE,
  DELETE_ANSWER,
  DELETE_COMMENT,
  DELETE_QUESTION,
  DOWN_VOTE,
  DOWN_VOTE_SUCCESS,
  GET_QUESTION_DATA,
  PAY_BOUNTY,
  MARK_AS_ACCEPTED,
  MARK_AS_ACCEPTED_SUCCESS,
  POST_ANSWER,
  POST_ANSWER_BUTTON,
  POST_COMMENT,
  SAVE_COMMENT,
  UP_VOTE,
  UP_VOTE_SUCCESS,
  GET_HISTORIES,
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
import { selectCommunities } from '../DataCacheProvider/selectors';
import { selectEthereum } from '../EthereumProvider/selectors';

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
  const ethereumService = yield select(selectEthereum);
  const indexerOnly = yield call(queryOnlyFromIndexer, ethereumService);
  const isMeshService = indexerOnly ? true : isMeshServiceConfig();

  const question = yield call(getPost, questionId, indexerOnly);

  question.author = { ...question.author, user: question.author.id };

  if (user) {
    if (isMeshService) {
      const statusHistory = yield call(getVoteHistory, questionId, user, indexerOnly);
      question.votingStatus = votingStatus(Number(statusHistory));
      question.answers.map((reply) => {
        const replyStatusHistory = reply.replyvotehistory.find(
          (voting) => voting.userId === user,
        )?.direction;
        reply.votingStatus = votingStatus(Number(replyStatusHistory));
      });
    } else {
      const postId = questionId.split('-')[1];
      const statusHistory = yield call(getStatusHistory, 0, user, postId, 0, 0, ethereumService);
      question.votingStatus = votingStatus(Number(statusHistory));

      const updatedAnswer = yield all(
        question.answers.map(function* (reply) {
          const replyId = reply.id.split('-')[2];
          const answerStatusHistory = yield call(
            getStatusHistory,
            0,
            user,
            postId,
            replyId,
            0,
            ethereumService,
          );

          reply = { ...reply, votingStatus: votingStatus(Number(answerStatusHistory)) };
          return reply;
        }),
      );
      question.answers = updatedAnswer;
    }
  }

  question.comments = question.comments.map((comment) => ({
    ...comment,
    author: { ...comment.author, user: comment.author.id },
  }));

  question.isGeneral = isGeneralQuestion(question);
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
    ReactGA.event({
      category: 'Users',
      action: 'create_comment_started',
    });
    const { questionData, ethereumService, profileInfo, locale, histories } = yield call(getParams);
    yield call(isAvailableAction, () => editCommentValidator(profileInfo, buttonId));
    const commentData = {
      content: comment,
    };
    const ipfsLink = yield call(saveText, JSON.stringify(commentData));

    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const commentObjectId = yield call(getCommentId2, commentId);

      let actualAnswerId = answerId;
      if (answerId) {
        actualAnswerId = answerId === '0' ? 0 : answerId.split('-')[2];
      }

      const txResult = yield call(
        editSuiComment,
        wallet,
        profileInfo.id,
        getActualId(questionId),
        commentObjectId,
        actualAnswerId,
        commentId.split('-')[3],
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
      const indexerOnly = yield call(queryOnlyFromIndexer, ethereumService);
      yield call(waitForPostTransactionToIndex, transaction.transactionHash, indexerOnly);
      histories.push(newHistory);
    }

    let item;
    if (!answerId) {
      item = questionData.comments?.find((x) => x.id === commentId);
    } else {
      item = questionData.answers
        .find((x) => x.id === answerId)
        .comments.find((x) => x.id === commentId);
    }

    item.content = comment;

    yield call(toggleView, true);

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(saveCommentSuccess({ ...questionData }, buttonId, commentId));
    ReactGA.event({
      category: 'Users',
      action: 'create_comment_completed',
    });
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(saveCommentErr(err, buttonId, commentId));
  }
}

export function* deleteCommentWorker({ questionId, answerId, commentId, buttonId }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'delete_comment_started',
    });
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
      let actualAnswerId = answerId;
      if (answerId) {
        actualAnswerId = answerId === '0' ? 0 : answerId.split('-')[2];
      }
      const txResult = yield call(
        deleteSuiComment,
        wallet,
        profileInfo.id,
        getActualId(questionId),
        actualAnswerId,
        commentId.split('-')[3],
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
      const indexerOnly = yield call(queryOnlyFromIndexer, ethereumService);
      yield call(waitForPostTransactionToIndex, transaction.transactionHash, indexerOnly);
      histories.push(newHistory);
    }
    if (answerId === 0 || answerId === '0') {
      questionData.comments = questionData.comments.filter((x) => x.id !== commentId);
    } else {
      const answer = questionData.answers.find((x) => x.id === answerId);
      answer.comments = answer.comments.filter((x) => x.id !== commentId);
    }

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(deleteCommentSuccess({ ...questionData }, buttonId));
    ReactGA.event({
      category: 'Users',
      action: 'delete_comment_completed',
    });
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(deleteCommentErr(err, buttonId));
  }
}

export function* deleteAnswerWorker({ questionId, answerId, buttonId }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'delete_answer_started',
    });
    const { questionData, ethereumService, profileInfo, histories } = yield call(getParams);

    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const txResult = yield call(
        deleteSuiAnswer,
        wallet,
        profileInfo.id,
        getActualId(questionId),
        answerId.split('-')[2],
      );
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
    ReactGA.event({
      category: 'Users',
      action: 'delete_answer_completed',
    });
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(deleteAnswerErr(err, buttonId));
  }
}

export function* deleteQuestionWorker({ questionId, isDocumentation, buttonId }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'delete_post_started',
    });
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
      const txResult = yield call(
        deleteSuiQuestion,
        wallet,
        profileInfo.id,
        getActualId(questionId),
      );
      yield put(transactionInPending(txResult.digest));
      const confirmedTx = yield call(waitForTransactionConfirmation, txResult.digest);
      yield call(waitForPostTransactionToIndex, confirmedTx.digest);
      yield put(transactionCompleted());
    } else {
      yield call(deleteQuestion, profileInfo.user, questionId, ethereumService);
    }

    yield put(deleteQuestionSuccess({ ...questionData, isDeleted: true }, buttonId));
    ReactGA.event({
      category: 'Users',
      action: 'delete_post_completed',
    });
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
  if (isSuiBlockchain) {
    if (!profileInfo) {
      yield put(showLoginModal());
      throw new ApplicationError('Not authorized');
    }
  } else {
    yield call(isAuthorized);
  }

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
    ReactGA.event({
      category: 'Users',
      action: 'create_comment_started',
    });
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
        getActualId(questionId),
        answerId ? answerId.split('-')[2] : answerId,
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
      const indexerOnly = yield call(queryOnlyFromIndexer, ethereumService);
      yield call(waitForPostTransactionToIndex, txHash, indexerOnly);
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
        id: `${questionId}-${answerId ? answerId.split('-')[2] : 0}-${commentId}`,
      });
    } else {
      const { comments, commentCount } = questionData.answers.find((x) => x.id === answerId);
      questionData.answers.find((x) => x.id === answerId).commentCount += 1;
      commentId = commentCount + 1;
      comments.push({
        ...newComment,
        id: `${questionId}-${answerId ? answerId.split('-')[2] : 0}-${commentId}`,
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
    ReactGA.event({
      category: 'Users',
      action: 'create_comment_completed',
    });
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(postCommentErr(err, buttonId));
  }
}

export function* postAnswerWorker({ questionId, answer, official, reset }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'create_answer_started',
    });
    const { questionData, ethereumService, locale, profileInfo, histories } = yield call(getParams);

    if (isSuiBlockchain) {
      if (!profileInfo) {
        yield put(showLoginModal());
        throw new ApplicationError('Not authorized');
      }
    } else {
      yield call(isAuthorized);
    }

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
        getActualId(questionId),
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
      updatedProfileInfo = yield call(getProfileInfo, profileInfo.user);

      txHash = transaction.transactionHash;
      const indexerOnly = yield call(queryOnlyFromIndexer, ethereumService);
      yield call(waitForPostTransactionToIndex, txHash, indexerOnly);
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
    ReactGA.event({
      category: 'Users',
      action: 'create_answer_completed',
    });
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(postAnswerErr(err));
  }
}

export function* downVoteWorker({ whoWasDownvoted, buttonId, answerId, questionId }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'create_downvote_started',
    });
    const { questionData, ethereumService, profileInfo } = yield call(getParams);

    const usersForUpdate = [whoWasDownvoted];

    if (isSuiBlockchain) {
      if (!profileInfo) {
        yield put(showLoginModal());
        throw new ApplicationError('Not authorized');
      }
    } else {
      yield call(isAuthorized);
    }

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
        if (!answerId || answerId === '0') {
          txResult = yield call(voteSuiPost, wallet, profile.id, getActualId(questionId), false);
        } else {
          let actualAnswerId = answerId;
          if (answerId) {
            actualAnswerId = Number(answerId === '0' ? 0 : answerId.split('-')[2]);
          }
          txResult = yield call(
            voteSuiReply,
            wallet,
            profile.id,
            getActualId(questionId),
            actualAnswerId,
            false,
          );
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
      answerId === '0' ? questionData : questionData.answers.find((x) => x.id === answerId);
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
    ReactGA.event({
      category: 'Users',
      action: 'create_downvote_completed',
    });
  } catch (err) {
    yield put(downVoteErr(err, buttonId));
  }
}

export function* upVoteWorker({ buttonId, answerId, questionId, whoWasUpvoted }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'create_upvote_started',
    });
    const { questionData, ethereumService, profileInfo } = yield call(getParams);

    const usersForUpdate = [whoWasUpvoted];

    if (isSuiBlockchain) {
      if (!profileInfo) {
        yield put(showLoginModal());
        throw new ApplicationError('Not authorized');
      }
    } else {
      yield call(isAuthorized);
    }

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
        if (!answerId || answerId === '0') {
          txResult = yield call(voteSuiPost, wallet, profile.id, getActualId(questionId), true);
        } else {
          let actualAnswerId = answerId;
          if (answerId) {
            actualAnswerId = Number(answerId === '0' ? 0 : answerId.split('-')[2]);
          }
          txResult = yield call(
            voteSuiReply,
            wallet,
            profile.id,
            getActualId(questionId),
            actualAnswerId,
            true,
          );
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
      answerId === '0' ? questionData : questionData.answers.find((x) => x.id === answerId);
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
    ReactGA.event({
      category: 'Users',
      action: 'create_upvote_completed',
    });
  } catch (err) {
    yield put(upVoteErr(err, buttonId));
  }
}

export function* markAsAcceptedWorker({ buttonId, questionId, correctAnswerId, whoWasAccepted }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'markAsAccepted_started',
    });
    const { questionData, ethereumService, profileInfo } = yield call(getParams);

    const usersForUpdate = [whoWasAccepted];
    if (isSuiBlockchain) {
      if (!profileInfo) {
        yield put(showLoginModal());
        throw new ApplicationError('Not authorized');
      }
    } else {
      yield call(isAuthorized);
    }

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
        getActualId(questionId),
        correctAnswerId,
      );
      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
    } else {
      yield call(markAsAccepted, profileInfo.user, questionId, correctAnswerId, ethereumService);
    }
    questionData.bestReply =
      String(questionData.bestReply) === String(correctAnswerId) ? 0 : correctAnswerId;
    const reply = questionData.answers.find(
      (reply) => reply.id === `${questionData.id}-${correctAnswerId}`,
    );
    reply.isBestReply = reply.isBestReply ? 0 : 1;

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(markAsAcceptedSuccess({ ...questionData }, usersForUpdate, buttonId));
    ReactGA.event({
      category: 'Users',
      action: 'markAsAccepted_completed',
    });
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
}
