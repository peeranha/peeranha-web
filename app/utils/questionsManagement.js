import { orderBy } from 'lodash/collection';
import { getActualId, getNetwork } from 'utils/properties';
import { getCommunityTags } from 'utils/communityManagement';
import { getBytes32FromIpfsHash, getIpfsHashFromBytes32, getText, saveText } from './ipfs';
import { bigNumberToNumber } from './converters';

import {
  CHANGE_STATUS_BEST,
  CONTRACT_CONTENT,
  DELETE_ANSWER,
  DELETE_COMMENT,
  DELETE_DOCUMENTATION_POST,
  DELETE_POST,
  DOWNVOTE_STATUS,
  EDIT_ANSWER,
  EDIT_COMMENT,
  EDIT_POST,
  GET_COMMENT,
  GET_POST,
  GET_REPLY,
  GET_STATUS_HISTORY,
  getContentData,
  POST_ANSWER,
  POST_COMMENT,
  POST_QUESTION,
  UPDATE_DOCUMENTATION_TREE,
  UPVOTE_STATUS,
  VOTE_ITEM,
} from './queries/constants';
import {
  getUsersQuestions,
  getUsersAnsweredQuestions,
  historiesForPost,
} from './queries/ethereumService';

export async function getQuestionsPostedByUser(id, limit, offset) {
  return getUsersQuestions(id, limit, offset);
}

export async function getAnsweredUsersPosts(id, limit, offset) {
  return getUsersAnsweredQuestions(id, limit, offset);
}

export async function postQuestion(
  user,
  communityId,
  questionData,
  postType,
  tags,
  language,
  ethereumService,
) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  const network = communityId.split('-')[0];
  const resultTransaction = await ethereumService.sendTransaction(
    network - 1,
    CONTRACT_CONTENT[network - 1],
    user,
    POST_QUESTION,
    [user, getActualId(communityId), ipfsHash, postType, tags, language],
    3, // wait for additional confirmation to avoid 404 error when redirect to newly created post
  );
  await waitForTransactionConfirmation();
  return resultTransaction;
}

export async function deleteDocumentationPost(user, postId, documentationJSON, ethereumService) {
  const ipfsLink = await saveText(JSON.stringify(documentationJSON));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  return ethereumService.sendTransaction(
    getNetwork(postId),
    CONTRACT_CONTENT[getNetwork(postId)],
    user,
    DELETE_DOCUMENTATION_POST,
    [getActualId(postId), ipfsHash],
    2, // wait for additional confirmation to avoid 404 error when redirect to newly created post
  );
}

export async function updateDocumentationTree(
  user,
  communityId,
  documentationJSON,
  ethereumService,
) {
  const ipfsLink = await saveText(JSON.stringify(documentationJSON));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);

  return ethereumService.sendTransaction(
    getNetwork(communityId),
    CONTRACT_CONTENT[getNetwork(communityId)],
    user,
    UPDATE_DOCUMENTATION_TREE,
    [user, getActualId(communityId), ipfsHash],
    2,
  );
}

export const editQuestion = async (
  network,
  user,
  postId,
  communityId,
  questionData,
  tags,
  postType,
  language,
  ethereumService,
) => {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  return ethereumService.sendTransaction(
    network - 1,
    CONTRACT_CONTENT[network - 1],
    user,
    EDIT_POST,
    [user, getActualId(postId), ipfsHash, tags, getActualId(communityId), postType, language],
  );
};

export async function deleteQuestion(user, questionId, ethereumService) {
  await ethereumService.sendTransaction(
    getNetwork(questionId),
    CONTRACT_CONTENT[getNetwork(questionId)],
    user,
    DELETE_POST,
    [user, getActualId(questionId)],
    2,
  );
}

export async function postAnswer(user, questionId, ipfsHash, official, language, ethereumService) {
  return ethereumService.sendTransaction(
    getNetwork(questionId),
    CONTRACT_CONTENT[getNetwork(questionId)],
    user,
    POST_ANSWER,
    [user, getActualId(questionId), 0, ipfsHash, official, language],
  );
}

export async function editAnswer(
  user,
  questionId,
  answerId,
  answerData,
  official,
  locale,
  ethereumService,
) {
  const ipfsLink = await saveText(JSON.stringify(answerData));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  await ethereumService.sendTransaction(
    getNetwork(questionId),
    CONTRACT_CONTENT[getNetwork(questionId)],
    user,
    EDIT_ANSWER,
    [user, getActualId(questionId), answerId.split('-')[2], ipfsHash, official, locale],
    2,
  );
}

export async function deleteAnswer(user, questionId, answerId, ethereumService) {
  return ethereumService.sendTransaction(
    getNetwork(questionId),
    CONTRACT_CONTENT[getNetwork(questionId)],
    user,
    DELETE_ANSWER,
    [user, getActualId(questionId), answerId.split('-')[2]],
  );
}

export async function postComment(user, questionId, answerId, ipfsHash, language, ethereumService) {
  return ethereumService.sendTransaction(
    getNetwork(questionId),
    CONTRACT_CONTENT[getNetwork(questionId)],
    user,
    POST_COMMENT,
    [
      user,
      getActualId(questionId),
      answerId ? answerId.split('-')[2] : answerId,
      ipfsHash,
      language,
    ],
  );
}

export async function editComment(
  user,
  questionId,
  answerId,
  commentId,
  ipfsHash,
  locale,
  ethereumService,
) {
  let actualAnswerId = answerId;
  if (answerId) {
    actualAnswerId = answerId === '0' ? 0 : answerId.split('-')[2];
  }
  return ethereumService.sendTransaction(
    getNetwork(questionId),
    CONTRACT_CONTENT[getNetwork(questionId)],
    user,
    EDIT_COMMENT,
    [user, getActualId(questionId), actualAnswerId, commentId.split('-')[3], ipfsHash, locale],
  );
}

export async function deleteComment(user, questionId, answerId, commentId, ethereumService) {
  let actualAnswerId = answerId;
  if (answerId) {
    actualAnswerId = answerId === '0' ? 0 : answerId.split('-')[2];
  }
  return ethereumService.sendTransaction(
    getNetwork(questionId),
    CONTRACT_CONTENT[getNetwork(questionId)],
    user,
    DELETE_COMMENT,
    [user, getActualId(questionId), actualAnswerId, commentId.split('-')[3]],
  );
}

export async function upVote(user, questionId, answerId, ethereumService) {
  let actualAnswerId = answerId;
  if (answerId) {
    actualAnswerId = answerId === '0' ? 0 : answerId.split('-')[2];
  }
  await ethereumService.sendTransaction(
    getNetwork(questionId),
    CONTRACT_CONTENT[getNetwork(questionId)],
    user,
    VOTE_ITEM,
    [user, getActualId(questionId), actualAnswerId, 0, true],
  );
}

export async function downVote(user, questionId, answerId, ethereumService) {
  let actualAnswerId = answerId;
  if (answerId) {
    actualAnswerId = answerId === '0' ? 0 : answerId.split('-')[2];
  }
  await ethereumService.sendTransaction(
    getNetwork(questionId),
    CONTRACT_CONTENT[getNetwork(questionId)],
    user,
    VOTE_ITEM,
    [user, getActualId(questionId), actualAnswerId, 0, false],
  );
}

export const getStatusHistory = async (
  network,
  user,
  questionId,
  answerId,
  commentId,
  ethereumService,
) =>
  ethereumService[getContentData[network]](GET_STATUS_HISTORY, [
    user,
    questionId,
    answerId,
    commentId,
  ]);

export async function markAsAccepted(user, questionId, correctAnswerId, ethereumService) {
  await ethereumService.sendTransaction(
    getNetwork(questionId),
    CONTRACT_CONTENT[getNetwork(questionId)],
    user,
    CHANGE_STATUS_BEST,
    [user, getActualId(questionId), correctAnswerId],
  );
}

export const getCreatedPostId = async (ethereumService, block, user, communityId) => {
  const network = getNetwork(communityId);
  const filter = ethereumService[CONTRACT_CONTENT[network]].filters.PostCreated();
  const events = await ethereumService[CONTRACT_CONTENT[network]].queryFilter(filter, block, block);
  const postId = bigNumberToNumber(
    events.filter(
      (event) =>
        event.args.user.toLowerCase() === user.toLowerCase() &&
        Number(event.args.communityId) === Number(getActualId(communityId)),
    )[0].args.postId,
  );
  return `${Number(network) + 1}-${postId}`;
};

const formCommonInfo = (object, statusHistory) => ({
  author: object.author.toLowerCase(),
  isDeleted: object.isDeleted,
  postTime: object.postTime,
  propertyCount: object.propertyCount,
  rating: object.rating,
  votingStatus: votingStatus(Number(statusHistory)),
});

export const formCommentObject = async (rawComment, id, ethereumService, statusHistory) => {
  const { content } = JSON.parse(await getText(getIpfsHashFromBytes32(rawComment.ipfsDoc.hash)));
  return {
    content,
    ipfsHash: rawComment.ipfsDoc.hash,
    ...formCommonInfo(rawComment, statusHistory),
    id,
  };
};

export const formReplyObject = async (rawReply, comments, id, ethereumService, statusHistory) => {
  const { content } = JSON.parse(await getText(getIpfsHashFromBytes32(rawReply.ipfsDoc.hash)));
  return {
    content,
    ipfsHash: rawReply.ipfsDoc.hash,
    ...formCommonInfo(rawReply, statusHistory),
    commentCount: rawReply.commentCount,
    isFirstReply: rawReply.isFirstReply,
    isQuickReply: rawReply.isQuickReply,
    parentReplyId: rawReply.parentReplyId,
    comments,
    id,
  };
};

export const formQuestionObject = async (
  rawQuestion,
  replies,
  comments,
  ethereumService,
  id,
  statusHistory,
) => {
  const { title, content } = JSON.parse(
    await getText(getIpfsHashFromBytes32(rawQuestion.ipfsDoc.hash)),
  );
  return {
    title,
    content,
    ipfsHash: rawQuestion.ipfsDoc.hash,
    answers: replies,
    comments,
    ...formCommonInfo(rawQuestion, statusHistory),
    bestReply: rawQuestion.bestReply,
    commentCount: rawQuestion.commentCount,
    communityId: rawQuestion.communityId,
    officialReply: rawQuestion.officialReply,
    postType: rawQuestion.postType,
    replyCount: rawQuestion.replyCount,
    tags: rawQuestion.tags,
    id,
  };
};

export const votingStatus = (statusHistory) => ({
  isUpVoted: statusHistory === UPVOTE_STATUS,
  isDownVoted: statusHistory === DOWNVOTE_STATUS,
  isVotedToDelete: false,
});

export async function getQuestionById(network, ethereumService, questionId, user) {
  const rawQuestion = await ethereumService[getContentData[network - 1]](GET_POST, [questionId]);
  const statusHistory = await getStatusHistory(user, questionId, 0, 0, ethereumService);
  const tags = await getCommunityTags(rawQuestion.communityId);

  const questionTags = tags[rawQuestion.communityId].filter((tag) =>
    rawQuestion.tags.includes(Number(tag.id.split('-')[2])),
  );

  const replies = [];
  // getting all replies of post
  await Promise.all(
    new Array(rawQuestion.replyCount).fill().map(async (reply, replyIndex) => {
      let replyObj;
      try {
        const rawReply = await ethereumService[getContentData[getNetwork(questionId)]](GET_REPLY, [
          getActualId(questionId),
          replyIndex + 1,
        ]);
        const replyStatusHistory = await getStatusHistory(
          user,
          questionId,
          replyIndex + 1,
          0,
          ethereumService,
        );
        const comments = [];
        // getting all comments on a reply
        await Promise.all(
          new Array(rawReply.commentCount).fill().map(async (comment, commentIndex) => {
            let commentObj;
            try {
              const rawComment = await ethereumService[getContentData[getNetwork(questionId)]](
                GET_COMMENT,
                [getActualId(questionId), replyIndex + 1, commentIndex + 1],
              );
              const commentStatusHistory = await getStatusHistory(
                user,
                questionId,
                replyIndex + 1,
                commentIndex + 1,
                ethereumService,
              );
              commentObj = await formCommentObject(
                rawComment,
                commentIndex + 1,
                ethereumService,
                commentStatusHistory,
              );
            } catch (err) {
              // if comment is deleted
              console.log('Comment has been deleted');
            }

            if (commentObj) {
              comments.push(commentObj);
            }
          }),
        );

        replyObj = await formReplyObject(
          rawReply,
          orderBy(comments, 'postTime'),
          replyIndex + 1,
          ethereumService,
          replyStatusHistory,
        );
      } catch (err) {
        // if reply is deleted
        console.log('Reply has been deleted');
      }

      if (replyObj) {
        replies.push(replyObj);
      }
    }),
  );

  const comments = [];
  await Promise.all(
    new Array(rawQuestion.commentCount).fill().map(async (comment, index) => {
      let commentObj;
      try {
        commentObj = await formCommentObject(
          await ethereumService[getContentData[getNetwork(questionId)]](GET_COMMENT, [
            getActualId(questionId),
            0,
            index + 1,
          ]),
          index + 1,
          ethereumService,
          await getStatusHistory(user, questionId, 0, index + 1, ethereumService),
        );
      } catch (err) {
        console.log('Comment has been deleted');
      }
      if (commentObj) {
        comments.push(commentObj);
      }
    }),
  );
  return formQuestionObject(
    { ...rawQuestion, tags: questionTags },
    orderBy(replies, 'postTime'),
    orderBy(comments, 'postTime'),
    ethereumService,
    questionId,
    statusHistory,
  );
}

export const getQuestion = async (ethereumService, questionId) => {
  const question = await ethereumService[getContentData[getNetwork(questionId)]](GET_POST, [
    getActualId(questionId),
  ]);
  return formQuestionObject(question, [], [], ethereumService);
};

export const getAnswer = async (ethereumService, questionId, answerId) => {
  const answer = await ethereumService[getContentData[getNetwork(questionId)]](GET_REPLY, [
    getActualId(questionId),
    answerId,
  ]);
  return formReplyObject(answer, [], answerId, ethereumService);
};
export const getHistoriesForPost = async (postId) => {
  const histories = await historiesForPost(postId);
  return histories.map(
    ({ post, reply, comment, eventEntity, transactionHash, eventName, timeStamp }) => ({
      transactionHash,
      post,
      reply: reply != null ? reply : undefined,
      comment: comment != null ? comment : undefined,
      eventEntity,
      eventName,
      timeStamp,
    }),
  );
};

export const waitForTransactionConfirmation = async () =>
  new Promise((resolve) => setTimeout(resolve, 2000));
