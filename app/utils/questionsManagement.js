import {
  ITEM_UPV_FLAG,
  ITEM_DNV_FLAG,
  ITEM_VOTED_TO_DEL_FLAG,
} from 'containers/ViewQuestion/constants';

import { saveText, getText } from './ipfs';
import { getProfileInfo } from './profileManagement';

import {
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
} from './constants';

export async function getQuestionsPostedByUser(eosService, user) {
  const questions = await eosService.getTableRows(
    USER_QUESTIONS_TABLE,
    user,
    0,
  );

  return questions;
}

/* eslint no-param-reassign: ["error", { "props": false }] */
export async function getQuestions(limit, eosService, offset) {
  const questions = await eosService.getTableRows(
    QUESTION_TABLE,
    ALL_QUESTIONS_SCOPE,
    offset,
    limit,
  );

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
      community_id: 1,
      tags: [1, 2],
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

export async function getQuestionData(eosService, questionId, user) {
  let question = await eosService.getTableRow(
    QUESTION_TABLE,
    ALL_QUESTIONS_SCOPE,
    questionId,
  );

  /* eslint no-bitwise: 0 */
  const getItemStatus = (historyFlag, constantFlag) =>
    historyFlag && historyFlag.flag & (1 << constantFlag);

  /*
   * @ITEM_UPV_FLAG - number of bit from historyFlag value - zero bit
   * got status with help of @getItemStatus function
   * if value of this bit NOT 0 => status (isUpVoted) is true
   * and so on
   */

  const votingStatus = history => {
    const flag = history.filter(x => x.user === user)[0];

    return {
      isUpVoted: !!getItemStatus(flag, ITEM_UPV_FLAG),
      isDownVoted: !!getItemStatus(flag, ITEM_DNV_FLAG),
      isVotedToDelete: !!getItemStatus(flag, ITEM_VOTED_TO_DEL_FLAG),
    };
  };

  // key: 3 - key to last edited date value
  const getlastEditedDate = properties => {
    const lastEditedDate = properties.filter(x => x.key === 3)[0];
    return (lastEditedDate && lastEditedDate.value) || null;
  };

  const p1 = async () => {
    question = {
      ...question,
      content: JSON.parse(await getText(question.ipfs_link)),
      userInfo: await getProfileInfo(question.user, eosService),
      isItWrittenByMe: user === question.user,
      votingStatus: votingStatus(question.history),
      lastEditedDate: getlastEditedDate(question.properties),
    };
  };

  const p2 = async () => {
    await Promise.all(
      question.answers.map(async x => {
        x.content = await getText(x.ipfs_link);
        x.userInfo = await getProfileInfo(x.user, eosService);
        x.isItWrittenByMe = user === x.user;
        x.votingStatus = votingStatus(x.history);
        x.lastEditedDate = getlastEditedDate(x.properties);

        await Promise.all(
          x.comments.map(async y => {
            y.content = await getText(y.ipfs_link);
            y.userInfo = await getProfileInfo(y.user, eosService);
            y.isItWrittenByMe = user === y.user;
            y.votingStatus = votingStatus(y.history);
            y.lastEditedDate = getlastEditedDate(y.properties);
          }),
        );
      }),
    );
  };

  const p3 = async () => {
    await Promise.all(
      question.comments.map(async x => {
        x.content = await getText(x.ipfs_link);
        x.userInfo = await getProfileInfo(x.user, eosService);
        x.isItWrittenByMe = user === x.user;
        x.votingStatus = votingStatus(x.history);
        x.lastEditedDate = getlastEditedDate(x.properties);
      }),
    );
  };

  await Promise.all([p1(), p2(), p3()]);

  return question;
}
