/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  getQuestionData,
  postComment,
  postAnswer,
  upVote,
  downVote,
  markAsAccepted,
} from 'utils/questionsManagement';

import defaultSaga, {
  getQuestionDataWorker,
  postCommentWorker,
  postAnswerWorker,
  upVoteWorker,
  downVoteWorker,
  markAsAcceptedWorker,
} from '../saga';

import {
  GET_QUESTION_DATA,
  GET_QUESTION_DATA_SUCCESS,
  GET_QUESTION_DATA_ERROR,
  POST_COMMENT,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  POST_ANSWER,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_ERROR,
  UP_VOTE,
  UP_VOTE_SUCCESS,
  UP_VOTE_ERROR,
  DOWN_VOTE,
  DOWN_VOTE_SUCCESS,
  DOWN_VOTE_ERROR,
  MARK_AS_ACCEPTED,
  MARK_AS_ACCEPTED_SUCCESS,
  MARK_AS_ACCEPTED_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeEvery: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getQuestionData: jest.fn(),
  postComment: jest.fn(),
  postAnswer: jest.fn(),
  upVote: jest.fn(),
  downVote: jest.fn(),
  markAsAccepted: jest.fn(),
}));

describe('getQuestionDataWorker', () => {
  const res = { questionId: 1 };
  const generator = getQuestionDataWorker(res);
  const account = 'user1';
  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => account),
  };

  it('step1, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step2, getSelectedAccount', () => {
    const step = generator.next(eos);
    expect(step.value).toBe(account);
  });

  it('step3, getQuestionData', () => {
    generator.next(account);
    expect(getQuestionData).toHaveBeenCalledWith(eos, res.questionId, account);
  });

  it('step4, getQuestionDataSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(GET_QUESTION_DATA_SUCCESS);
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(GET_QUESTION_DATA_ERROR);
  });
});

describe('postCommentWorker', () => {
  const res = {
    user: 'user1',
    questionId: 1,
    answerId: 1,
    comment: 'comment',
    reset: jest.fn(),
  };

  const generator = postCommentWorker(res);
  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => res.user),
  };

  it('step1, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step2, postComment', () => {
    generator.next(eos);
    expect(postComment).toHaveBeenCalledWith(
      res.user,
      res.questionId,
      res.answerId,
      res.comment,
      eos,
    );
  });

  it('step3, getQuestionData', () => {
    generator.next();
    expect(getQuestionData).toHaveBeenCalledWith(eos, res.questionId, res.user);
  });

  it('step4, reset', () => {
    generator.next();
    expect(res.reset).toHaveBeenCalled();
  });

  it('step5, postCommentSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(POST_COMMENT_SUCCESS);
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(POST_COMMENT_ERROR);
  });
});

describe('postAnswerWorker', () => {
  const res = {
    user: 'user1',
    questionId: 1,
    answer: 1,
    reset: jest.fn(),
  };

  const generator = postAnswerWorker(res);
  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => res.user),
  };

  it('step1, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step2, postAnswer', () => {
    generator.next(eos);
    expect(postAnswer).toHaveBeenCalledWith(
      res.user,
      res.questionId,
      res.answer,
      eos,
    );
  });

  it('step3, getQuestionData', () => {
    generator.next();
    expect(getQuestionData).toHaveBeenCalledWith(eos, res.questionId, res.user);
  });

  it('step4, reset', () => {
    generator.next();
    expect(res.reset).toHaveBeenCalled();
  });

  it('step5, POST_ANSWER_SUCCESS', () => {
    const step = generator.next();
    expect(step.value.type).toBe(POST_ANSWER_SUCCESS);
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(POST_ANSWER_ERROR);
  });
});

describe('upVoteWorker', () => {
  const res = {
    user: 'user1',
    questionId: 1,
    answerId: 1,
  };

  const generator = upVoteWorker(res);
  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => res.user),
  };

  it('step1, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step2, upVote', () => {
    generator.next(eos);
    expect(upVote).toHaveBeenCalledWith(
      res.user,
      res.questionId,
      res.answerId,
      eos,
    );
  });

  it('step3, getQuestionData', () => {
    generator.next();
    expect(getQuestionData).toHaveBeenCalledWith(eos, res.questionId, res.user);
  });

  it('step4, UP_VOTE_SUCCESS', () => {
    const step = generator.next();
    expect(step.value.type).toBe(UP_VOTE_SUCCESS);
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(UP_VOTE_ERROR);
  });
});

describe('downVoteWorker', () => {
  const res = {
    user: 'user1',
    questionId: 1,
    answerId: 1,
  };

  const generator = downVoteWorker(res);
  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => res.user),
  };

  it('step1, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step2, upVote', () => {
    generator.next(eos);
    expect(downVote).toHaveBeenCalledWith(
      res.user,
      res.questionId,
      res.answerId,
      eos,
    );
  });

  it('step3, getQuestionData', () => {
    generator.next();
    expect(getQuestionData).toHaveBeenCalledWith(eos, res.questionId, res.user);
  });

  it('step4, DOWN_VOTE_SUCCESS', () => {
    const step = generator.next();
    expect(step.value.type).toBe(DOWN_VOTE_SUCCESS);
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(DOWN_VOTE_ERROR);
  });
});

describe('markAsAcceptedWorker', () => {
  const res = {
    user: 'user1',
    questionId: 1,
    correctAnswerId: 1,
  };

  const generator = markAsAcceptedWorker(res);
  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => res.user),
  };

  it('step1, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step2, markAsAccepted', () => {
    generator.next(eos);
    expect(markAsAccepted).toHaveBeenCalledWith(
      res.user,
      res.questionId,
      res.correctAnswerId,
      eos,
    );
  });

  it('step3, getQuestionData', () => {
    generator.next();
    expect(getQuestionData).toHaveBeenCalledWith(eos, res.questionId, res.user);
  });

  it('step4, MARK_AS_ACCEPTED_SUCCESS', () => {
    const step = generator.next();
    expect(step.value.type).toBe(MARK_AS_ACCEPTED_SUCCESS);
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(MARK_AS_ACCEPTED_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_QUESTION_DATA', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_QUESTION_DATA);
  });

  it('POST_COMMENT', () => {
    const step = generator.next();
    expect(step.value).toBe(POST_COMMENT);
  });

  it('POST_ANSWER', () => {
    const step = generator.next();
    expect(step.value).toBe(POST_ANSWER);
  });

  it('UP_VOTE', () => {
    const step = generator.next();
    expect(step.value).toBe(UP_VOTE);
  });

  it('DOWN_VOTE', () => {
    const step = generator.next();
    expect(step.value).toBe(DOWN_VOTE);
  });

  it('MARK_AS_ACCEPTED', () => {
    const step = generator.next();
    expect(step.value).toBe(MARK_AS_ACCEPTED);
  });
});
