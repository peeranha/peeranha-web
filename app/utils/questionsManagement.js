import { saveText, getText } from './ipfs';

/* eslint no-param-reassign: ["error", { "props": false }] */
export async function getQuestions(limit, eosService) {
  const questions = await eosService.getTableRows('question', 'allquestions');

  await questions.map(async item => {
    item.questionText = await getText(item.ipfs_link);
  });

  return questions;
}

export async function postQuestion(user, questionData, eosService) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const question = await eosService.sendTransaction(user, 'postquestion', {
    user,
    ipfs_link: ipfsLink,
  });

  return question;
}
