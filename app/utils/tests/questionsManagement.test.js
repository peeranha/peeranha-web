import { saveText } from '../ipfs';

import {
  QUESTION_TABLE,
  ALL_QUESTIONS_SCOPE,
  POST_QUESTION_METHOD,
  POST_ANSWER_METHOD,
  POST_COMMENT_METHOD,
  UP_VOTE_METHOD,
  DOWN_VOTE_METHOD,
  MARK_AS_CORRECT_METHOD,
} from '../constants';

import {
  getQuestions,
  postQuestion,
  postAnswer,
  postComment,
  upVote,
  downVote,
  markAsAccepted,
  getQuestionData,
} from '../questionsManagement';

jest.mock('../ipfs', () => ({
  saveText: jest.fn().mockImplementation(() => {}),
  getText: jest.fn().mockImplementation(() => '{}'),
}));

let eosService;

beforeEach(() => {
  eosService = {
    sendTransaction: jest.fn(),
    getTableRow: jest.fn(),
    getTableRows: jest.fn(),
  };
});

describe('getQuestions', () => {
  const limit = 10;
  const offset = 10;
  const questionsMass = [];

  it('test', async () => {
    eosService.getTableRows.mockImplementation(() => questionsMass);

    const questions = await getQuestions(limit, eosService, offset);

    expect(questions).toEqual(questionsMass);
    expect(eosService.getTableRows).toHaveBeenCalledWith(
      QUESTION_TABLE,
      ALL_QUESTIONS_SCOPE,
      offset,
      limit,
    );
  });
});

describe('postQuestion', () => {
  const user = 'user';
  const questionData = {};
  const questionInfo = { info: 'questionInfo' };
  const ipfsLink = 'ipfsLink';

  it('test', async () => {
    eosService.sendTransaction.mockImplementation(() => questionInfo);

    saveText.mockImplementation(() => ipfsLink);

    const question = await postQuestion(user, questionData, eosService);
    expect(question).toEqual(questionInfo);
    expect(saveText).toHaveBeenCalledWith(JSON.stringify(questionData));
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      POST_QUESTION_METHOD,
      {
        user,
        title: questionData.title,
        ipfs_link: ipfsLink,
      },
    );
  });
});

describe('postAnswer', () => {
  const user = 'user';
  const questionId = 10;
  const answer = 'answer';
  const ipfsLink = 'ipfsLink';

  it('test', async () => {
    saveText.mockImplementation(() => ipfsLink);

    await postAnswer(user, questionId, answer, eosService);
    expect(saveText).toHaveBeenCalledWith(answer);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      POST_ANSWER_METHOD,
      {
        user,
        question_id: +questionId,
        ipfs_link: ipfsLink,
      },
    );
  });
});

describe('postComment', () => {
  const user = 'user';
  const comment = 'comment';
  const questionId = 10;
  const answerId = 50;
  const ipfsLink = 'ipfsLink';

  it('test', async () => {
    saveText.mockImplementation(() => ipfsLink);

    await postComment(user, questionId, answerId, comment, eosService);
    expect(saveText).toHaveBeenCalledWith(comment);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      POST_COMMENT_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
        ipfs_link: ipfsLink,
      },
    );
  });
});

describe('upVote', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 50;

  it('test', async () => {
    await upVote(user, questionId, answerId, eosService);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      UP_VOTE_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
      },
    );
  });
});

describe('downVote', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 50;

  it('test', async () => {
    await downVote(user, questionId, answerId, eosService);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      DOWN_VOTE_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
      },
    );
  });
});

describe('markAsAccepted', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 50;

  it('test', async () => {
    await markAsAccepted(user, questionId, answerId, eosService);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      MARK_AS_CORRECT_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
      },
    );
  });
});

describe('getQuestionData', () => {
  const questionId = 10;
  const user = 'user';
  const questionInfo = {
    answers: [],
    comments: [],
    history: [],
  };

  it('test', async () => {
    eosService.getTableRow.mockImplementation(() => questionInfo);

    await getQuestionData(eosService, questionId, user);
    expect(eosService.getTableRow).toHaveBeenCalledWith(
      QUESTION_TABLE,
      ALL_QUESTIONS_SCOPE,
      questionId,
    );
  });
});
