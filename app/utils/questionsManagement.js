import { saveText, getText } from './ipfs';

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
    question_id: questionId,
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
    question_id: questionId,
    answer_id: answerId,
    ipfs_link: ipfsLink,
  });
}

export async function getQuestionData(eosService, questionId) {
  const question = await eosService.getTableRow(
    'question',
    'allquestions',
    questionId,
  );

  const p1 = async () => {
    question.content = JSON.parse(await getText(question.ipfs_link));
  };

  const p2 = async () => {
    await Promise.all(
      question.answers.map(async x => {
        x.content = await getText(x.ipfs_link);
        await Promise.all(
          x.comments.map(async y => {
            y.content = await getText(y.ipfs_link);
          }),
        );
      }),
    );
  };

  const p3 = async () => {
    question.comments.map(async x => {
      x.content = await getText(x.ipfs_link);
    });
  };

  await Promise.all([p1(), p2(), p3()]);

  return question;
}
