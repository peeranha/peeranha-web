import { saveText, getText } from './ipfs';
import { getProfileInfo } from './profileManagement';

import {
  QUESTION_TABLE,
  ALL_QUESTIONS_SCOPE,
  POST_QUESTION_METHOD,
  POST_ANSWER_METHOD,
  POST_COMMENT_METHOD,
  UP_VOTE_METHOD,
  DOWN_VOTE_METHOD,
  MARK_AS_CORRECT_METHOD,
} from './constants';

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

export async function postQuestion(user, questionData, eosService) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const question = await eosService.sendTransaction(
    user,
    POST_QUESTION_METHOD,
    {
      user,
      title: questionData.title,
      ipfs_link: ipfsLink,
    },
  );

  return question;
}

export async function postAnswer(user, questionId, answer, eosService) {
  const ipfsLink = await saveText(answer);

  await eosService.sendTransaction(user, POST_ANSWER_METHOD, {
    user,
    question_id: +questionId,
    ipfs_link: ipfsLink,
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

  // flag: 1 - upVote
  // flag: 2 - downVote
  const votingStatus = history => {
    const filtered = history.filter(x => x.user === user);
    return (filtered[0] && filtered[0].flag) || 0;
  };

  const p1 = async () => {
    question = {
      ...question,
      content: JSON.parse(await getText(question.ipfs_link)),
      userInfo: await getProfileInfo(question.user, eosService),
      isItWrittenByMe: user === question.user,
      votingStatus: votingStatus(question.history),
    };
  };

  const p2 = async () => {
    await Promise.all(
      question.answers.map(async x => {
        x.content = await getText(x.ipfs_link);
        x.userInfo = await getProfileInfo(x.user, eosService);
        x.isItWrittenByMe = user === x.user;
        x.votingStatus = votingStatus(x.history);

        await Promise.all(
          x.comments.map(async y => {
            y.content = await getText(y.ipfs_link);
            y.userInfo = await getProfileInfo(y.user, eosService);
            y.isItWrittenByMe = user === y.user;
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
      }),
    );
  };

  await Promise.all([p1(), p2(), p3()]);

  return question;
}
