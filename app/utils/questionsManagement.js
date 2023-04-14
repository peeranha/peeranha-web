import { orderBy } from 'lodash/collection';
import { getBytes32FromIpfsHash, getIpfsHashFromBytes32, getText, saveText } from './ipfs';
import { bigNumberToNumber } from './converters';

import {
  CHANGE_POST_TYPE,
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
  POST_ANSWER,
  POST_COMMENT,
  POST_QUESTION,
  UPDATE_DOCUMENTATION_TREE,
  UPVOTE_STATUS,
  VOTE_ITEM,
} from './ethConstants';
import { getUsersAnsweredQuestions, getUsersQuestions, historiesForPost } from './theGraph';
import { getCommunityTags } from 'utils/communityManagement';

export async function getQuestionsPostedByUser(id, limit, offset) {
  return await getUsersQuestions(id, limit, offset);
}

export async function getAnsweredUsersPosts(id, limit, offset) {
  return await getUsersAnsweredQuestions(id, limit, offset);
}

/* eslint no-param-reassign: ["error", { "props": false }] */
export async function getQuestions(ethereumService, limit, offset) {}

/* eslint no-bitwise: 0 no-undef: 0 */
export async function getQuestionsFilteredByCommunities(
  ethereumService,
  limit,
  offset,
  communityId,
) {}

export async function voteToDelete(user, questionId, answerId, commentId, ethereumService) {}

export async function getAskedQuestion(link) {
  return JSON.parse(await getText(link));
}

export async function postQuestion(
  user,
  communityId,
  questionData,
  postType,
  tags,
  ethereumService,
) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  return await ethereumService.sendTransaction(
    CONTRACT_CONTENT,
    user,
    POST_QUESTION,
    [user, communityId, ipfsHash, postType, tags],
    2, // wait for additional confirmation to avoid 404 error when redirect to newly created post
  );
}

export async function deleteDocumentationPost(user, postId, documentationJSON, ethereumService) {
  const ipfsLink = await saveText(JSON.stringify(documentationJSON));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  return await ethereumService.sendTransaction(
    CONTRACT_CONTENT,
    user,
    DELETE_DOCUMENTATION_POST,
    [postId, ipfsHash],
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

  return await ethereumService.sendTransaction(
    CONTRACT_CONTENT,
    user,
    UPDATE_DOCUMENTATION_TREE,
    [user, communityId, ipfsHash],
    2,
  );
}

export const editQuestion = async (
  user,
  postId,
  communityId,
  questionData,
  tags,
  postType,
  ethereumService,
) => {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  return await ethereumService.sendTransaction(CONTRACT_CONTENT, user, EDIT_POST, [
    user,
    postId,
    ipfsHash,
    tags,
    communityId,
    postType,
  ]);
};

// export const getEditQuestTrActData = async (user, id, question) => {
//   const ipfsLink = await saveText(JSON.stringify(question));
//
//   return {
//     action: EDIT_QUESTION_METHOD,
//     data: {
//       user,
//       question_id: +id,
//       name: question.name,
//       ipfs_link: ipfsLink,
//       communityId: question.community.value,
//       tags: question.tags.map(x => x.id),
//     },
//   };
// };

export async function deleteQuestion(user, questionId, ethereumService) {
  await ethereumService.sendTransaction(CONTRACT_CONTENT, user, DELETE_POST, [user, questionId], 2);
}

export async function postAnswer(user, questionId, ipfsHash, official, ethereumService) {
  return await ethereumService.sendTransaction(CONTRACT_CONTENT, user, POST_ANSWER, [
    user,
    questionId,
    0,
    ipfsHash,
    official,
  ]);
}

export async function editAnswer(
  user,
  questionId,
  answerId,
  answerData,
  official,
  ethereumService,
) {
  const ipfsLink = await saveText(JSON.stringify(answerData));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  await ethereumService.sendTransaction(
    CONTRACT_CONTENT,
    user,
    EDIT_ANSWER,
    [user, questionId, answerId, ipfsHash, official],
    2,
  );
}

export async function deleteAnswer(user, questionId, answerId, ethereumService) {
  return await ethereumService.sendTransaction(CONTRACT_CONTENT, user, DELETE_ANSWER, [
    user,
    questionId,
    answerId,
  ]);
}

export async function postComment(user, questionId, answerId, ipfsHash, ethereumService) {
  return await ethereumService.sendTransaction(CONTRACT_CONTENT, user, POST_COMMENT, [
    user,
    questionId,
    answerId,
    ipfsHash,
  ]);
}

export async function editComment(
  user,
  questionId,
  answerId,
  commentId,
  ipfsHash,
  ethereumService,
) {
  return await ethereumService.sendTransaction(CONTRACT_CONTENT, user, EDIT_COMMENT, [
    user,
    questionId,
    answerId,
    commentId,
    ipfsHash,
  ]);
}

export async function deleteComment(user, questionId, answerId, commentId, ethereumService) {
  return await ethereumService.sendTransaction(CONTRACT_CONTENT, user, DELETE_COMMENT, [
    user,
    questionId,
    answerId,
    commentId,
  ]);
}

export async function upVote(user, questionId, answerId, ethereumService) {
  await ethereumService.sendTransaction(CONTRACT_CONTENT, user, VOTE_ITEM, [
    user,
    questionId,
    answerId,
    0,
    true,
  ]);
}

export async function downVote(user, questionId, answerId, ethereumService) {
  await ethereumService.sendTransaction(CONTRACT_CONTENT, user, VOTE_ITEM, [
    user,
    questionId,
    answerId,
    0,
    false,
  ]);
}

export const getStatusHistory = async (user, questionId, answerId, commentId, ethereumService) =>
  await ethereumService.getContentDataWithArgs(GET_STATUS_HISTORY, [
    user,
    questionId,
    answerId,
    commentId,
  ]);

export async function markAsAccepted(user, questionId, correctAnswerId, ethereumService) {
  await ethereumService.sendTransaction(CONTRACT_CONTENT, user, CHANGE_STATUS_BEST, [
    user,
    questionId,
    correctAnswerId,
  ]);
}

export const getCreatedPostId = async (ethereumService, block, user, communityId) => {
  const filter = ethereumService.contractContent.filters.PostCreated();
  const events = await ethereumService.contractContent.queryFilter(filter, block, block);

  return bigNumberToNumber(
    events.filter(
      (event) =>
        event.args.user.toLowerCase() === user.toLowerCase() &&
        Number(event.args.communityId) === Number(communityId),
    )[0].args.postId,
  );
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

export async function getQuestionById(ethereumService, questionId, user) {
  const rawQuestion = await ethereumService.getContentDataWithArgs(GET_POST, [questionId]);
  const statusHistory = await getStatusHistory(user, questionId, 0, 0, ethereumService);
  const tags = await getCommunityTags(rawQuestion.communityId);

  const questionTags = tags[rawQuestion.communityId].filter((tag) =>
    rawQuestion.tags.includes(Number(tag.id.split('-')[1])),
  );

  const replies = [];
  // getting all replies of post
  await Promise.all(
    new Array(rawQuestion.replyCount).fill().map(async (reply, replyIndex) => {
      let replyObj;
      try {
        const rawReply = await ethereumService.getContentDataWithArgs(GET_REPLY, [
          questionId,
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
              const rawComment = await ethereumService.getContentDataWithArgs(GET_COMMENT, [
                questionId,
                replyIndex + 1,
                commentIndex + 1,
              ]);
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
          await ethereumService.getContentDataWithArgs(GET_COMMENT, [questionId, 0, index + 1]),
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
  return await formQuestionObject(
    { ...rawQuestion, tags: questionTags },
    orderBy(replies, 'postTime'),
    orderBy(comments, 'postTime'),
    ethereumService,
    questionId,
    statusHistory,
  );
}

export const getQuestion = async (ethereumService, questionId) => {
  const question = await ethereumService.getContentDataWithArgs(GET_POST, [questionId]);
  return await formQuestionObject(question, [], [], ethereumService);
};

export const getAnswer = async (ethereumService, questionId, answerId) => {
  const answer = await ethereumService.getContentDataWithArgs(GET_REPLY, [questionId, answerId]);
  return await formReplyObject(answer, [], answerId, ethereumService);
};

export const changeQuestionType = async (ethereumService, user, questionId, type) => {
  await ethereumService.sendTransaction(CONTRACT_CONTENT, user, CHANGE_POST_TYPE, [
    questionId,
    type,
  ]);
};

export const getRandomQuestions = (questions, amount) => {
  const result = [];

  if (questions.length > amount) {
    const showingPromotedQuestionsIds = [];

    do {
      const randomId = Math.floor(Math.random() * Math.floor(questions.length));

      if (!showingPromotedQuestionsIds.includes(randomId)) {
        showingPromotedQuestionsIds.push(randomId);
      }
    } while (showingPromotedQuestionsIds.length < amount);

    showingPromotedQuestionsIds.forEach((id) => {
      result.push(questions[id]);
    });
  } else {
    result.push(...questions);
  }

  return result;
};

export const getQuestionTags = (question, tagList) =>
  question.tags.map((tagId) =>
    tagList.find((tag) => tag.id === `${question.communityId}-${tagId}`),
  );

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
