import { saveText, getText } from '../ipfs';

import {
  QUESTION_TABLE,
  ALL_QUESTIONS_SCOPE,
  POST_QUESTION_METHOD,
  POST_ANSWER_METHOD,
  POST_COMMENT_METHOD,
  UP_VOTE_METHOD,
  DOWN_VOTE_METHOD,
  MARK_AS_CORRECT_METHOD,
  EDIT_QUESTION_METHOD,
  EDIT_ANSWER_METHOD,
  EDIT_COMMENT_METHOD,
  DEL_COMMENT_METHOD,
  DEL_ANSWER_METHOD,
  DEL_QUESTION_METHOD,
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
  editQuestion,
  editAnswer,
  editComment,
  deleteAnswer,
  deleteComment,
  deleteQuestion,
  getAnswer,
  getAskedQuestion,
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

describe('getAskedQuestion', async () => {
  const link = 'link';
  const question = JSON.stringify({});

  getText.mockImplementation(() => question);
  const questionObject = await getAskedQuestion(link);

  it('test', () => {
    expect(questionObject).toBe(JSON.parse(question));
  });
});

describe('getAnswer', async () => {
  const link = 'link';
  const answer = 'answer';

  getText.mockImplementation(() => answer);
  const answerTxt = await getAnswer(link);

  it('test', () => {
    expect(answerTxt).toBe(answer);
  });
});

describe('deleteQuestion', () => {
  const user = 'user';
  const questionId = 10;

  it('test', async () => {
    await deleteQuestion(user, questionId, eosService);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      DEL_QUESTION_METHOD,
      {
        user,
        question_id: +questionId,
      },
    );
  });
});

describe('deleteAnswer', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 10;

  it('test', async () => {
    await deleteAnswer(user, questionId, answerId, eosService);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      DEL_ANSWER_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
      },
    );
  });
});

describe('deleteComment', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 10;
  const commentId = 10;

  it('test', async () => {
    await deleteComment(user, questionId, answerId, commentId, eosService);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      DEL_COMMENT_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
        comment_id: +commentId,
      },
    );
  });
});

describe('editComment', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 10;
  const commentId = 10;
  const ipfsLink = 'ipfsLink';
  const textComment = 'textComment';

  saveText.mockImplementation(() => ipfsLink);

  it('test', async () => {
    await editComment(
      user,
      questionId,
      answerId,
      commentId,
      textComment,
      eosService,
    );

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      EDIT_COMMENT_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
        comment_id: +commentId,
        ipfs_link: ipfsLink,
      },
    );
  });
});

describe('editAnswer', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 10;
  const ipfsLink = 'ipfsLink';
  const textAnswer = 'textAnswer';

  saveText.mockImplementation(() => ipfsLink);

  it('test', async () => {
    await editAnswer(user, questionId, answerId, textAnswer, eosService);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      EDIT_ANSWER_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
        ipfs_link: ipfsLink,
      },
    );
  });
});

describe('editQuestion', () => {
  const user = 10;
  const id = 10;
  const ipfsLink = 'ipfsLink';
  const question = {
    title: 'title',
  };

  saveText.mockImplementation(() => ipfsLink);

  it('test', async () => {
    await editQuestion(user, id, question, eosService);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      EDIT_QUESTION_METHOD,
      {
        user,
        question_id: +id,
        title: question.title,
        ipfs_link: ipfsLink,
      },
    );
  });
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
    getText.mockImplementation(() => '{}');
    eosService.getTableRow.mockImplementation(() => questionInfo);

    await getQuestionData(eosService, questionId, user);
    expect(eosService.getTableRow).toHaveBeenCalledWith(
      QUESTION_TABLE,
      ALL_QUESTIONS_SCOPE,
      questionId,
    );
  });
});
