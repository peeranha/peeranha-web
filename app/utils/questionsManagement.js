import { saveText, getText } from './ipfs';
import { getProfileInfo } from './profileManagement';

/* eslint no-param-reassign: ["error", { "props": false }] */
export async function getQuestions(limit, eosService, offset) {
  const questions = await eosService.getTableRows(
    'question',
    'allquestions',
    offset,
    limit,
  );

  return questions;
}

export async function postQuestion(user, questionData, eosService) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const question = await eosService.sendTransaction(user, 'postquestion', {
    user,
    title: questionData.title,
    ipfs_link: ipfsLink,
  });

  return question;
}

export async function postAnswer(user, questionId, answer, eosService) {
  const ipfsLink = await saveText(answer);

  await eosService.sendTransaction(user, 'postanswer', {
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

  await eosService.sendTransaction(user, 'postcomment', {
    user,
    question_id: +questionId,
    answer_id: +answerId,
    ipfs_link: ipfsLink,
  });
}

export async function upVote(user, questionId, answerId, eosService) {
  await eosService.sendTransaction(user, 'upvote', {
    user,
    question_id: +questionId,
    answer_id: +answerId,
  });
}

export async function downVote(user, questionId, answerId, eosService) {
  await eosService.sendTransaction(user, 'downvote', {
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
  await eosService.sendTransaction(user, 'mrkascorrect', {
    user,
    question_id: +questionId,
    answer_id: +correctAnswerId,
  });
}

export async function getQuestionData(eosService, questionId, user) {
  const question = await eosService.getTableRow(
    'question',
    'allquestions',
    questionId,
  );

  const p1 = async () => {
    question.content = JSON.parse(await getText(question.ipfs_link));
    question.userInfo = await getProfileInfo(question.user, eosService);
    question.isItWrittenByMe = user === question.user;
  };

  const p2 = async () => {
    await Promise.all(
      question.answers.map(async x => {
        x.content = await getText(x.ipfs_link);
        x.userInfo = await getProfileInfo(x.user, eosService);
        x.isItWrittenByMe = user === x.user;
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
