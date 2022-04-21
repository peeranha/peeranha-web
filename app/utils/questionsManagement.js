import JSBI from 'jsbi';

import { orderBy } from 'lodash/collection';
import {
  getBytes32FromIpfsHash,
  getIpfsHashFromBytes32,
  getText,
  saveText,
} from './ipfs';

import {
  ALL_QUESTIONS_SCOPE,
  CHANGE_PROMO_QUEST_COMM,
  CHANGE_QUESTION_TYPE_METHOD,
  DEL_ANSWER_METHOD,
  DEL_COMMENT_METHOD,
  DEL_QUESTION_METHOD,
  DOWN_VOTE_METHOD,
  EDIT_ANSWER_METHOD,
  EDIT_COMMENT_METHOD,
  EDIT_QUESTION_METHOD,
  GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION,
  GET_QUESTIONS_KEY_TYPE,
  MARK_AS_CORRECT_METHOD,
  PROMOTE_QUESTION_METHOD,
  PROMOTED_QUESTIONS_TABLES,
  QUESTION_TABLE,
  UP_VOTE_METHOD,
  USER_ANSWERS_TABLE,
  VOTE_TO_DELETE_METHOD,
} from './constants';
import {
  CHANGE_STATUS_BEST,
  DELETE_ANSWER,
  DELETE_COMMENT,
  DELETE_POST,
  DOWNVOTE_STATUS,
  EDIT_ANSWER,
  EDIT_COMMENT,
  EDIT_POST,
  GET_COMMENT,
  GET_POST,
  GET_QUESTION,
  CHANGE_POST_TYPE,
  GET_REPLY,
  GET_STATUS_HISTORY,
  POST_ANSWER,
  POST_COMMENT,
  POST_QUESTION,
  UPVOTE_STATUS,
  VOTE_ITEM,
} from './ethConstants';
import { getUsersAnsweredQuestions, getUsersQuestions } from './theGraph';

/* eslint-disable  */
export class FetcherOfQuestionsForFollowedCommunities {
  constructor(
    firstFetchCount = 5,
    communities,
    eosService,
  ) /* istanbul ignore next */ {
    this.eosService = eosService;
    this.firstFetchCount = firstFetchCount;
    this.communities = communities;

    if (!communities.length) return null;

    this.communitiesMap = {};

    communities.forEach(communityId => {
      const lowerBound = JSBI.leftShift(
        JSBI.BigInt(communityId),
        JSBI.BigInt(36),
      );

      this.communitiesMap[communityId] = {
        items: [],
        lowerBound: lowerBound.toString(),
        lastKeyFetched: lowerBound.toString(),
        uppperBound: JSBI.leftShift(
          JSBI.BigInt(communityId + 1),
          JSBI.BigInt(36),
        ).toString(),
        more: true,
      };
    });

    this.hasMore = true;
  }

  getNextItems = /* istanbul ignore next */ async fetchCount => {
    if (!this.hasMore) return [];

    const fill_fetcher = async communityId => {
      if (
        !this.communitiesMap[communityId].more ||
        this.communitiesMap[communityId].items.length >= fetchCount
      )
        return null;

      const limit =
        this.firstFetchCount - this.communitiesMap[communityId].items.length;

      const { rows } = await this.eosService.getTableRows(
        QUESTION_TABLE,
        ALL_QUESTIONS_SCOPE,
        this.communitiesMap[communityId].lastKeyFetched,
        limit,
        this.communitiesMap[communityId].uppperBound,
        GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION,
        GET_QUESTIONS_KEY_TYPE,
      );

      this.communitiesMap[communityId].items.push(...rows);

      if (rows.length === limit) {
        this.communitiesMap[communityId].lastKeyFetched = JSBI.add(
          JSBI.add(
            JSBI.BigInt(this.communitiesMap[communityId].lowerBound),
            JSBI.BigInt(rows[rows.length - 1].id),
          ),
          JSBI.BigInt(1),
        ).toString();
      } else {
        this.communitiesMap[communityId].more = false;
      }
    };

    const fill_fetcher_task = [];

    this.communities.forEach(communityId => {
      fill_fetcher_task.push(fill_fetcher(communityId));
    });

    await Promise.all(fill_fetcher_task);

    let availableItems = 0;

    this.communities.forEach(communityId => {
      availableItems += this.communitiesMap[communityId].items.length;
    });

    if (availableItems < fetchCount) {
      this.hasMore = false;
      fetchCount = availableItems;
    }

    const minIdInitializer = JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(65));
    const items = [];

    for (let i = 0; i < fetchCount; i++) {
      // Find min
      let minId = minIdInitializer;
      let communityWithMinId;

      this.communities.forEach(communityId => {
        if (this.communitiesMap[communityId].items.length) {
          const currId = JSBI.BigInt(
            this.communitiesMap[communityId].items[0].id,
          );
          if (JSBI.lessThan(currId, minId)) {
            minId = currId;
            communityWithMinId = communityId;
          }
        }
      });

      items.push(this.communitiesMap[communityWithMinId].items[0]);
      this.communitiesMap[communityWithMinId].items.shift();
    }

    return items;
  };
}

/* eslint-enable  */

export async function getQuestionsPostedByUser(id) {
  return await getUsersQuestions(id);
}

export async function getAnsweredUsersPosts(id) {
  return await getUsersAnsweredQuestions(id);
}

/* eslint no-param-reassign: ["error", { "props": false }] */
export async function getQuestions(eosService, limit, offset) {
  const { rows } = await eosService.getTableRows(
    QUESTION_TABLE,
    ALL_QUESTIONS_SCOPE,
    offset,
    limit,
  );

  return rows;
}

/* eslint no-bitwise: 0 no-undef: 0 */
export async function getQuestionsFilteredByCommunities(
  eosService,
  limit,
  offset,
  communityId,
) {
  const { rows } = await eosService.getTableRows(
    QUESTION_TABLE,
    ALL_QUESTIONS_SCOPE,
    JSBI.add(
      JSBI.leftShift(JSBI.BigInt(communityId), JSBI.BigInt(36)),
      JSBI.BigInt(offset),
    ).toString(),
    limit,
    JSBI.leftShift(JSBI.BigInt(communityId + 1), JSBI.BigInt(36)).toString(),
    GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION,
    GET_QUESTIONS_KEY_TYPE,
  );

  return rows;
}

/* eslint no-undef: 0 */
export async function getQuestionsForFollowedCommunities(limit, fetcher) {
  const questions = await fetcher.getNextItems(limit);

  return questions;
}

export async function getPromotedQuestions(eosService, communityId) {
  const offset = 0;
  const limit = 1000;

  const { rows } = await eosService.getTableRows(
    PROMOTED_QUESTIONS_TABLES,
    communityId,
    offset,
    limit,
    undefined,
    undefined,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );

  return rows;
}

export async function voteToDelete(
  user,
  questionId,
  answerId,
  commentId,
  eosService,
) {
  await eosService.sendTransaction(user, VOTE_TO_DELETE_METHOD, {
    user,
    question_id: questionId,
    answer_id: answerId || 0,
    comment_id: commentId || 0,
  });
}

export async function getAskedQuestion(link) {
  const question = JSON.parse(await getText(link));

  return question;
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
  return await ethereumService.sendTransactionWithSigner(user, POST_QUESTION, [
    communityId,
    ipfsHash,
    postType,
    tags,
  ]);
}

export const editQuestion = async (
  user,
  postId,
  communityId,
  questionData,
  tags,
  ethereumService,
) => {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  return await ethereumService.sendTransactionWithSigner(user, EDIT_POST, [
    postId,
    ipfsHash,
    tags,
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
  await ethereumService.sendTransactionWithSigner(user, DELETE_POST, [
    questionId,
  ]);
}

export const postAnswer = async (
  user,
  questionId,
  answerData,
  official,
  ethereumService,
) => {
  const ipfsLink = await saveText(JSON.stringify(answerData));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  await ethereumService.sendTransactionWithSigner(user, POST_ANSWER, [
    questionId,
    0,
    ipfsHash,
    official,
  ]);
};

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
  await ethereumService.sendTransactionWithSigner(user, EDIT_ANSWER, [
    questionId,
    answerId,
    ipfsHash,
  ]);
}

export async function deleteAnswer(
  user,
  questionId,
  answerId,
  ethereumService,
) {
  await ethereumService.sendTransactionWithSigner(user, DELETE_ANSWER, [
    questionId,
    answerId,
  ]);
}

export async function postComment(
  user,
  questionId,
  answerId,
  commentData,
  ethereumService,
) {
  const ipfsLink = await saveText(JSON.stringify(commentData));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  await ethereumService.sendTransactionWithSigner(user, POST_COMMENT, [
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
  commentData,
  ethereumService,
) {
  const ipfsLink = await saveText(JSON.stringify(commentData));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  await ethereumService.sendTransactionWithSigner(user, EDIT_COMMENT, [
    questionId,
    answerId,
    commentId,
    ipfsHash,
  ]);
}

export async function deleteComment(
  user,
  questionId,
  answerId,
  commentId,
  ethereumService,
) {
  await ethereumService.sendTransactionWithSigner(user, DELETE_COMMENT, [
    questionId,
    answerId,
    commentId,
  ]);
}

export async function upVote(user, questionId, answerId, ethereumService) {
  await ethereumService.sendTransactionWithSigner(user, VOTE_ITEM, [
    questionId,
    answerId,
    0,
    true,
  ]);
}

export async function downVote(user, questionId, answerId, ethereumService) {
  await ethereumService.sendTransactionWithSigner(user, VOTE_ITEM, [
    questionId,
    answerId,
    0,
    false,
  ]);
}

export const getStatusHistory = async (
  user,
  questionId,
  answerId,
  commentId,
  ethereumService,
) =>
  await ethereumService.getDataWithArgs(GET_STATUS_HISTORY, [
    user,
    questionId,
    answerId,
    commentId,
  ]);

export async function markAsAccepted(
  user,
  questionId,
  correctAnswerId,
  ethereumService,
) {
  await ethereumService.sendTransactionWithSigner(user, CHANGE_STATUS_BEST, [
    questionId,
    correctAnswerId,
  ]);
}

const formCommonInfo = (object, statusHistory) => ({
  author: object.author.toLowerCase(),
  isDeleted: object.isDeleted,
  postTime: object.postTime,
  propertyCount: object.propertyCount,
  rating: object.rating,
  votingStatus: votingStatus(Number(statusHistory)),
});

export const formCommentObject = async (
  rawComment,
  id,
  ethereumService,
  statusHistory,
) => {
  const { content } = JSON.parse(
    await getText(getIpfsHashFromBytes32(rawComment.ipfsDoc.hash)),
  );
  return {
    content,
    ...formCommonInfo(rawComment, statusHistory),
    id,
  };
};

export const formReplyObject = async (
  rawReply,
  comments,
  id,
  ethereumService,
  statusHistory,
) => {
  const { content } = JSON.parse(
    await getText(getIpfsHashFromBytes32(rawReply.ipfsDoc.hash)),
  );
  return {
    content,
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

export const votingStatus = statusHistory => ({
  isUpVoted: statusHistory === UPVOTE_STATUS,
  isDownVoted: statusHistory === DOWNVOTE_STATUS,
  isVotedToDelete: false,
});

export async function getQuestionById(ethereumService, questionId, user) {
  const rawQuestion = await ethereumService.getDataWithArgs(GET_POST, [
    questionId,
  ]);
  const statusHistory = await getStatusHistory(
    user,
    questionId,
    0,
    0,
    ethereumService,
  );
  const replies = [];
  // getting all replies of post
  await Promise.all(
    new Array(rawQuestion.replyCount).fill().map(async (reply, replyIndex) => {
      let replyObj;
      try {
        const rawReply = await ethereumService.getDataWithArgs(GET_REPLY, [
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
          new Array(rawReply.commentCount)
            .fill()
            .map(async (comment, commentIndex) => {
              let commentObj;
              try {
                const rawComment = await ethereumService.getDataWithArgs(
                  GET_COMMENT,
                  [questionId, replyIndex + 1, commentIndex + 1],
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
          await ethereumService.getDataWithArgs(GET_COMMENT, [
            questionId,
            0,
            index + 1,
          ]),
          index + 1,
          ethereumService,
          await getStatusHistory(
            user,
            questionId,
            0,
            index + 1,
            ethereumService,
          ),
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
    rawQuestion,
    orderBy(replies, 'postTime'),
    orderBy(comments, 'postTime'),
    ethereumService,
    questionId,
    statusHistory,
  );
}

export const getAnswer = async (ethereumService, questionId, answerId) => {
  const answer = await ethereumService.getDataWithArgs(GET_REPLY, [
    questionId,
    answerId,
  ]);
  return await formReplyObject(answer, [], answerId, ethereumService);
};

export const changeQuestionType = async (
  ethereumService,
  user,
  questionId,
  type,
) => {
  await ethereumService.sendTransactionWithSigner(user, CHANGE_POST_TYPE, [
    questionId,
    type,
  ]);
};

export const getPromoteQuestTrActData = (user, questionId, hours) => ({
  action: PROMOTE_QUESTION_METHOD,
  data: {
    user,
    question_id: +questionId,
    hours,
  },
  account: process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
});

export const promoteQuestion = async (eosService, user, questionId, hours) => {
  const { action, data, account } = getPromoteQuestTrActData(
    user,
    questionId,
    hours,
  );

  await eosService.sendTransaction(user, action, data, account);
};

export const getChangePromoCommTrActData = (user, questionId, prevCommId) => ({
  action: CHANGE_PROMO_QUEST_COMM,
  data: {
    user,
    question_id: questionId,
    old_communityId: prevCommId,
  },
  account: process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
});

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

    showingPromotedQuestionsIds.forEach(id => {
      result.push(questions[id]);
    });
  } else {
    result.push(...questions);
  }

  return result;
};

export const getQuestionTags = (question, tagList) =>
  question.tags.map(tagId =>
    tagList.find(tag => tag.id === `${question.communityId}-${tagId}`),
  );
