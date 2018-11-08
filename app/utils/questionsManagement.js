import { saveText } from './ipfs';

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
