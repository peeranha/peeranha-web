import { saveText, getText } from './ipfs';

import {
  GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION,
  GET_QUESTIONS_KEY_TYPE,
  QUESTION_TABLE,
  USER_QUESTIONS_TABLE,
  ALL_QUESTIONS_SCOPE,
  POST_QUESTION_METHOD,
  EDIT_QUESTION_METHOD,
  DEL_QUESTION_METHOD,
  POST_ANSWER_METHOD,
  EDIT_ANSWER_METHOD,
  DEL_ANSWER_METHOD,
  POST_COMMENT_METHOD,
  EDIT_COMMENT_METHOD,
  DEL_COMMENT_METHOD,
  UP_VOTE_METHOD,
  DOWN_VOTE_METHOD,
  MARK_AS_CORRECT_METHOD,
  VOTE_TO_DELETE_METHOD,
  USER_ANSWERS_TABLE,
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
      const lowerBound = BigInt(community_id) << BigInt(36);
      this.communitiesMap[community_id] = {
        items: [],
        lowerBound: `${lowerBound}`,
        lastKeyFetched: `${lowerBound}`,
        uppperBound: `${BigInt(community_id + 1) << BigInt(36)}`,
        more: true,
      };
    });

    this.hasMore = true;
  }

  getNextItems = /* istanbul ignore next */ async fetchCount => {
    if (!this.hasMore) return [];

    const inc = BigInt(1);

    const fill_fetcher = async community_id => {
      if (
        !this.communitiesMap[community_id].more ||
        this.communitiesMap[community_id].items.length >= fetchCount
      )
        return null;

      const limit =
        this.firstFetchCount - this.communitiesMap[community_id].items.length;

      const fetch_res = await this.eosService.getTableRows(
        QUESTION_TABLE,
        ALL_QUESTIONS_SCOPE,
        this.communitiesMap[community_id].lastKeyFetched,
        limit,
        this.communitiesMap[community_id].uppperBound,
        GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION,
        GET_QUESTIONS_KEY_TYPE,
      );

      this.communitiesMap[community_id].items.push(...fetch_res);

      if (fetch_res.length === limit) {
        this.communitiesMap[community_id].lastKeyFetched = `${this
          .communitiesMap[community_id].lowerBound +
          BigInt(fetch_res[fetch_res.length - 1].id) +
          inc}`;
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

    const minIdInitializer = BigInt(1) << BigInt(65);
    const items = [];

    for (let i = 0; i < fetchCount; i++) {
      // Find min
      let minId = minIdInitializer;
      let communityWithMinId;

      this.communities.forEach(community_id => {
        if (this.communitiesMap[community_id].items.length) {
          const currId = BigInt(this.communitiesMap[community_id].items[0].id);
          if (currId < minId) {
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
  const questions = await eosService.getTableRows(
    USER_QUESTIONS_TABLE,
    user,
    offset,
    limit,
  );

  return questions;
}

export async function getAnswersPostedByUser(
  eosService,
  user,
  offset = 0,
  limit,
) {
  const answers = await eosService.getTableRows(
    USER_ANSWERS_TABLE,
    user,
    offset,
    limit,
  );

  return answers;
}

/* eslint no-param-reassign: ["error", { "props": false }] */
export async function getQuestions(eosService, limit, offset) {
  const questions = await eosService.getTableRows(
    QUESTION_TABLE,
    ALL_QUESTIONS_SCOPE,
    offset,
    limit,
  );

  return questions;
}

/* eslint no-bitwise: 0 no-undef: 0 */
export async function getQuestionsFilteredByCommunities(
  eosService,
  limit,
  offset,
  communityId,
) {
  const questions = await eosService.getTableRows(
    QUESTION_TABLE,
    ALL_QUESTIONS_SCOPE,
    String((BigInt(communityId) << BigInt(36)) + BigInt(offset)),
    limit,
    String(BigInt(communityId + 1) << BigInt(36)),
    GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION,
    GET_QUESTIONS_KEY_TYPE,
  );

  return questions;
}

/* eslint no-undef: 0 */
export async function getQuestionsForFollowedCommunities(limit, fetcher) {
  const questions = await fetcher.getNextItems(limit);

  return questions;
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
    question_id: +questionId,
    answer_id: +answerId || 0,
    comment_id: +commentId || 0,
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
      tags: questionData.chosenTags.map(x => x.value),
    },
  );

  return question;
}

export async function editQuestion(user, id, question, eosService) {
  const ipfsLink = await saveText(JSON.stringify(question));

  await eosService.sendTransaction(user, EDIT_QUESTION_METHOD, {
    user,
    question_id: +id,
    title: question.title,
    ipfs_link: ipfsLink,
    community_id: question.community.value,
    tags: question.chosenTags.map(x => x.value),
  });
}

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

export async function postAnswer(user, questionId, answer, eosService) {
  const ipfsLink = await saveText(answer);

  await eosService.sendTransaction(user, POST_ANSWER_METHOD, {
    user,
    question_id: +questionId,
    ipfs_link: ipfsLink,
  });
}

export async function editAnswer(
  user,
  questionId,
  answerId,
  textAnswer,
  eosService,
) {
  const ipfsLink = await saveText(textAnswer);

  await eosService.sendTransaction(user, EDIT_ANSWER_METHOD, {
    user,
    question_id: +questionId,
    answer_id: +answerId,
    ipfs_link: ipfsLink,
  });
}

export async function deleteAnswer(user, questionId, answerId, eosService) {
  await eosService.sendTransaction(user, DEL_ANSWER_METHOD, {
    user,
    question_id: +questionId,
    answer_id: +answerId,
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
    question_id: +questionId,
    answer_id: +answerId,
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
    question_id: +questionId,
    answer_id: +answerId,
    comment_id: +commentId,
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
    question_id: +questionId,
    answer_id: +answerId,
    comment_id: +commentId,
  });
}

export async function upVote(user, questionId, answerId, eosService) {
  await eosService.sendTransaction(user, UP_VOTE_METHOD, {
    user,
    question_id: +questionId,
    answer_id: +answerId,
  });
}

export async function downVote(user, questionId, answerId, eosService) {
  await eosService.sendTransaction(user, DOWN_VOTE_METHOD, {
    user,
    question_id: +questionId,
    answer_id: +answerId,
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
    question_id: +questionId,
    answer_id: +correctAnswerId,
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
