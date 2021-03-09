import JSBI from 'jsbi';

import { getText, saveText } from './ipfs';

import {
  ALL_QUESTIONS_SCOPE,
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
  POST_ANSWER_METHOD,
  POST_COMMENT_METHOD,
  POST_QUESTION_METHOD,
  QUESTION_TABLE,
  UP_VOTE_METHOD,
  USER_ANSWERS_TABLE,
  USER_QUESTIONS_TABLE,
  VOTE_TO_DELETE_METHOD,
  PROMOTED_QUESTIONS_TABLES,
  PROMOTE_QUESTION_METHOD,
  CHANGE_PROMO_QUEST_COMM,
} from './constants';

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

    communities.forEach(community_id => {
      const lowerBound = JSBI.leftShift(
        JSBI.BigInt(community_id),
        JSBI.BigInt(36),
      );

      this.communitiesMap[community_id] = {
        items: [],
        lowerBound: lowerBound.toString(),
        lastKeyFetched: lowerBound.toString(),
        uppperBound: JSBI.leftShift(
          JSBI.BigInt(community_id + 1),
          JSBI.BigInt(36),
        ).toString(),
        more: true,
      };
    });

    this.hasMore = true;
  }

  getNextItems = /* istanbul ignore next */ async fetchCount => {
    if (!this.hasMore) return [];

    const fill_fetcher = async community_id => {
      if (
        !this.communitiesMap[community_id].more ||
        this.communitiesMap[community_id].items.length >= fetchCount
      )
        return null;

      const limit =
        this.firstFetchCount - this.communitiesMap[community_id].items.length;

      const { rows } = await this.eosService.getTableRows(
        QUESTION_TABLE,
        ALL_QUESTIONS_SCOPE,
        this.communitiesMap[community_id].lastKeyFetched,
        limit,
        this.communitiesMap[community_id].uppperBound,
        GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION,
        GET_QUESTIONS_KEY_TYPE,
      );

      this.communitiesMap[community_id].items.push(...rows);

      if (rows.length === limit) {
        this.communitiesMap[community_id].lastKeyFetched = JSBI.add(
          JSBI.add(
            JSBI.BigInt(this.communitiesMap[community_id].lowerBound),
            JSBI.BigInt(rows[rows.length - 1].id),
          ),
          JSBI.BigInt(1),
        ).toString();
      } else {
        this.communitiesMap[community_id].more = false;
      }
    };

    const fill_fetcher_task = [];

    this.communities.forEach(community_id => {
      fill_fetcher_task.push(fill_fetcher(community_id));
    });

    await Promise.all(fill_fetcher_task);

    let availableItems = 0;

    this.communities.forEach(community_id => {
      availableItems += this.communitiesMap[community_id].items.length;
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

      this.communities.forEach(community_id => {
        if (this.communitiesMap[community_id].items.length) {
          const currId = JSBI.BigInt(
            this.communitiesMap[community_id].items[0].id,
          );
          if (JSBI.lessThan(currId, minId)) {
            minId = currId;
            communityWithMinId = community_id;
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

export async function getQuestionsPostedByUser(
  eosService,
  user,
  offset = 0,
  limit,
) {
  const { rows } = await eosService.getTableRows(
    USER_QUESTIONS_TABLE,
    user,
    offset,
    limit,
  );

  return rows;
}

export async function getAnswersPostedByUser(
  eosService,
  user,
  offset = 0,
  limit,
) {
  const { rows } = await eosService.getTableRows(
    USER_ANSWERS_TABLE,
    user,
    offset,
    limit,
  );

  return rows;
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

export async function postQuestion(user, questionData, eosService) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const question = await eosService.sendTransaction(
    user,
    POST_QUESTION_METHOD,
    {
      user,
      title: questionData.title,
      ipfs_link: ipfsLink,
      community_id: questionData.community.value,
      tags: questionData.chosenTags.map(x => x.id),
      type: questionData.type,
    },
    null,
    true,
  );

  return question;
}

export const getEditQuestTrActData = async (user, id, question) => {
  const ipfsLink = await saveText(JSON.stringify(question));

  return {
    action: EDIT_QUESTION_METHOD,
    data: {
      user,
      question_id: +id,
      title: question.title,
      ipfs_link: ipfsLink,
      community_id: question.community.value,
      tags: question.chosenTags.map(x => x.id),
    },
  };
};

export async function deleteQuestion(user, questionId, eosService) {
  await eosService.sendTransaction(user, DEL_QUESTION_METHOD, {
    user,
    question_id: +questionId,
  });
}

export async function getAnswer(link) {
  const answer = await getText(link);
  return answer;
}

export const postAnswer = async (
  user,
  questionId,
  answer,
  official,
  eosService,
) => {
  const ipfsLink = await saveText(answer);

  await eosService.sendTransaction(
    user,
    POST_ANSWER_METHOD,
    {
      user,
      question_id: +questionId,
      ipfs_link: ipfsLink,
      official_answer: +official,
    },
    null,
    true,
  );
};

export async function editAnswer(
  user,
  questionId,
  answerId,
  textAnswer,
  official,
  eosService,
) {
  const ipfsLink = await saveText(textAnswer);

  await eosService.sendTransaction(user, EDIT_ANSWER_METHOD, {
    user,
    question_id: questionId,
    answer_id: answerId,
    ipfs_link: ipfsLink,
    official_answer: +official,
  });
}

export async function deleteAnswer(user, questionId, answerId, eosService) {
  await eosService.sendTransaction(user, DEL_ANSWER_METHOD, {
    user,
    question_id: questionId,
    answer_id: answerId,
  });
}

export async function postComment(
  user,
  questionId,
  answerId,
  comment,
  eosService,
) {
  const ipfsLink = await saveText(comment);

  await eosService.sendTransaction(user, POST_COMMENT_METHOD, {
    user,
    question_id: questionId,
    answer_id: answerId,
    ipfs_link: ipfsLink,
  });
}

export async function editComment(
  user,
  questionId,
  answerId,
  commentId,
  textComment,
  eosService,
) {
  const ipfsLink = await saveText(textComment);

  await eosService.sendTransaction(user, EDIT_COMMENT_METHOD, {
    user,
    question_id: questionId,
    answer_id: answerId,
    comment_id: commentId,
    ipfs_link: ipfsLink,
  });
}

export async function deleteComment(
  user,
  questionId,
  answerId,
  commentId,
  eosService,
) {
  await eosService.sendTransaction(user, DEL_COMMENT_METHOD, {
    user,
    question_id: questionId,
    answer_id: answerId,
    comment_id: commentId,
  });
}

export async function upVote(user, questionId, answerId, eosService) {
  await eosService.sendTransaction(user, UP_VOTE_METHOD, {
    user,
    question_id: questionId,
    answer_id: answerId,
  });
}

export async function downVote(user, questionId, answerId, eosService) {
  await eosService.sendTransaction(user, DOWN_VOTE_METHOD, {
    user,
    question_id: questionId,
    answer_id: answerId,
  });
}

export async function markAsAccepted(
  user,
  questionId,
  correctAnswerId,
  eosService,
) {
  await eosService.sendTransaction(user, MARK_AS_CORRECT_METHOD, {
    user,
    question_id: questionId,
    answer_id: correctAnswerId,
  });
}

export async function getQuestionById(eosService, questionId) {
  const question = await eosService.getTableRow(
    QUESTION_TABLE,
    ALL_QUESTIONS_SCOPE,
    questionId,
  );

  return question;
}

export const changeQuestionType = async (
  user,
  questionId,
  type,
  ratingRestore,
  eosService,
) => {
  await eosService.sendTransaction(user, CHANGE_QUESTION_TYPE_METHOD, {
    user,
    question_id: +questionId,
    type,
    restore_rating: ratingRestore,
  });
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
    old_community_id: prevCommId,
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
