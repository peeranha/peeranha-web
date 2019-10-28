/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call } from 'redux-saga/effects';
import _ from 'lodash';
import { translationMessages } from 'i18n';

import {
  postComment,
  getQuestionById,
  postAnswer,
  upVote,
  downVote,
  markAsAccepted,
  deleteQuestion,
  deleteAnswer,
  deleteComment,
  editComment,
  voteToDelete,
} from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { isAuthorized } from 'containers/EosioProvider/saga';

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
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
  DELETE_ANSWER,
  DELETE_ANSWER_SUCCESS,
  DELETE_ANSWER_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  SAVE_COMMENT,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_ERROR,
  VOTE_TO_DELETE,
  VOTE_TO_DELETE_SUCCESS,
  VOTE_TO_DELETE_ERROR,
} from '../constants';

import {
  postCommentValidator,
  postAnswerValidator,
  upVoteValidator,
  downVoteValidator,
  markAsAcceptedValidator,
  deleteQuestionValidator,
  deleteAnswerValidator,
  voteToDeleteValidator,
  deleteCommentValidator,
} from '../validate';

import * as sagaImports from '../saga';

jest.mock('containers/EosioProvider/saga', () => ({
  isAuthorized: jest.fn(),
}));

jest.mock('../validate', () => ({
  postAnswerValidator: jest.fn().mockImplementation(() => true),
  postCommentValidator: jest.fn().mockImplementation(() => true),
  markAsAcceptedValidator: jest.fn().mockImplementation(() => true),
  upVoteValidator: jest.fn().mockImplementation(() => true),
  downVoteValidator: jest.fn().mockImplementation(() => true),
  deleteQuestionValidator: jest.fn().mockImplementation(() => true),
  deleteAnswerValidator: jest.fn().mockImplementation(() => true),
  voteToDeleteValidator: jest.fn().mockImplementation(() => true),
  deleteCommentValidator: jest.fn().mockImplementation(() => true),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  all: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

jest.mock('utils/questionsManagement', () => ({
  getQuestionById: jest.fn(),
  postComment: jest.fn(),
  postAnswer: jest.fn(),
  upVote: jest.fn(),
  downVote: jest.fn(),
  markAsAccepted: jest.fn(),
  deleteQuestion: jest.fn(),
  deleteAnswer: jest.fn(),
  deleteComment: jest.fn(),
  editComment: jest.fn(),
  voteToDelete: jest.fn(),
  getParams: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

jest.mock('containers/DataCacheProvider/saga', () => ({
  getUserProfileWorker: jest.fn(),
}));

jest.mock('utils/ipfs', () => ({
  getText: jest.fn(),
}));

jest.mock('containers/AccountProvider/saga', () => ({
  getCurrentAccountWorker: jest.fn(),
}));

describe('getQuestionData', () => {
  const eosService = {};
  const questionId = 1;
  const user = 'user';
  const res = { eosService, questionId, user };

  const question = {
    answers: [{}],
    comments: [{}],
    community_id: 2,
    correct_answer_id: 1,
    history: [],
    id: '68719476729',
    ipfs_link: 'QmQnvSPNHehegUFohQ8kABdrGCFeADVTiwuD8SM23xmVjZ',
    post_time: 1551430946,
    properties: [],
    rating: 0,
    tags: [1, 2],
    title: 'sdadsddsdadsddsdadsddsdadsddsdadsddsdadsdd',
    user: 'user1',
  };

  const generator = sagaImports.getQuestionData(res);

  it('getQuestionById', () => {
    getQuestionById.mockImplementation(() => question);
    const step = generator.next();
    expect(step.value).toBe(question);
  });

  it('all promises', () => {
    const isAll = true;

    all.mockImplementation(() => isAll);
    const step = generator.next(question);
    expect(step.value).toBe(isAll);
  });
});

/* eslint no-underscore-dangle: 0 */
describe('saveCommentWorker', () => {
  const eosService = {};

  const answerId = 0;
  const user = 'user';
  const questionId = 1;
  const commentId = 1;
  const comment = 'comment';
  const toggleView = jest.fn();

  const res = {
    user,
    questionId,
    answerId,
    commentId,
    comment,
    toggleView,
  };

  describe('asnwerId > 0', () => {
    const questionData = {
      comments: [{ id: 1 }, { id: 2 }],
      answers: [
        { id: 1, comments: [{ id: 1 }, { id: 2 }] },
        { id: 2, comments: [{ id: 1 }, { id: 2 }] },
      ],
    };

    const generator = sagaImports.saveCommentWorker({
      ...res,
      answerId: 1,
    });

    generator.next();
    generator.next({ questionData, eosService });
    generator.next();

    it('test', () => {
      const step = generator.next();
      expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
    });
  });

  describe('+answerId === 0', () => {
    const questionData = {
      comments: [{ id: 1 }, { id: 2 }],
      answers: [
        { id: 1, comments: [{ id: 1 }, { id: 2 }] },
        { id: 2, comments: [{ id: 1 }, { id: 2 }] },
      ],
    };

    const generator = sagaImports.saveCommentWorker({
      ...res,
      answerId: 0,
    });

    it('step, getParams', () => {
      const step = generator.next();
      expect(typeof step.value._invoke).toBe('function');
    });

    it('step, editComment', () => {
      generator.next({ questionData, eosService });
      expect(editComment).toHaveBeenCalledWith(
        user,
        questionId,
        answerId,
        commentId,
        comment,
        eosService,
      );
    });

    it('step, toggleView', () => {
      generator.next();
      expect(call).toHaveBeenCalledWith(toggleView, true);
    });

    it('step, saveCommentSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(SAVE_COMMENT_SUCCESS);
      expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
    });

    it('error handling', () => {
      const err = 'some err';
      const step = generator.throw(err);
      expect(step.value.type).toBe(SAVE_COMMENT_ERROR);
    });
  });
});

describe('deleteCommentWorker', () => {
  const eos = {};
  const locale = 'en';
  const user = 'user';
  const questionId = 1;
  const answerId = 1;
  const commentId = 2;
  const profileInfo = 'profileInfo';
  const buttonId = 'buttonId';

  const questionData = {
    comments: [{ id: 1 }, { id: 2 }],
    answers: [
      { id: 1, comments: [{ id: 1 }, { id: 2 }] },
      { id: 2, comments: [{ id: 1 }, { id: 2 }] },
    ],
  };

  const res = {
    user,
    questionId,
    answerId,
    commentId,
    buttonId,
  };

  const generator = sagaImports.deleteCommentWorker(res);

  it('step, getParams', () => {
    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, deleteCommentValidator', () => {
    generator.next({ questionData, eosService: eos, locale, profileInfo });
    expect(deleteCommentValidator).toHaveBeenCalledWith(
      profileInfo,
      buttonId,
      translationMessages[locale],
    );
  });

  it('step, deleteComment', () => {
    generator.next();
    expect(deleteComment).toHaveBeenCalledWith(
      user,
      questionId,
      answerId,
      commentId,
      eos,
    );
  });

  it('step, deleteCommentSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(DELETE_COMMENT_SUCCESS);
    expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
  });

  it('error handling', () => {
    const err = 'some err';
    const step = generator.throw(err);
    expect(step.value.type).toBe(DELETE_COMMENT_ERROR);
  });
});

describe('deleteAnswerWorker', () => {
  const eos = {};
  const locale = 'en';
  const user = 'user';
  const questionId = 1;
  const answerId = 1;
  const postButtonId = 'postButtonId';
  const profileInfo = 'profileInfo';

  const questionData = {
    comments: [{ id: 1 }, { id: 2 }],
    answers: [
      { id: 1, comments: [{ id: 1 }, { id: 2 }] },
      { id: 2, comments: [{ id: 1 }, { id: 2 }] },
    ],
  };

  const res = {
    user,
    questionId,
    answerId,
    postButtonId,
  };

  const generator = sagaImports.deleteAnswerWorker(res);

  it('step, getParams', () => {
    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, deleteAnswerValidator', () => {
    generator.next({ questionData, eosService: eos, locale, profileInfo });
    expect(deleteAnswerValidator).toHaveBeenCalledWith(
      postButtonId,
      answerId,
      questionData.correct_answer_id,
      translationMessages[locale],
      profileInfo,
    );
  });

  it('step, deleteAnswer', () => {
    generator.next();
    expect(deleteAnswer).toHaveBeenCalledWith(user, questionId, answerId, eos);
  });

  it('step, deleteAnswerSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(DELETE_ANSWER_SUCCESS);
    expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
  });

  it('error handling', () => {
    const err = 'some err';
    const step = generator.throw(err);
    expect(step.value.type).toBe(DELETE_ANSWER_ERROR);
  });
});

describe('deleteQuestionWorker', () => {
  const eos = {};
  const locale = 'en';
  const user = 'user';
  const questionid = 11;
  const postButtonId = 'postButtonId';
  const profileInfo = 'profileInfo';

  const questionData = {
    answers: [],
  };

  const res = {
    user,
    questionid,
    postButtonId,
    profileInfo,
  };

  const generator = sagaImports.deleteQuestionWorker(res);

  it('step, getParams', () => {
    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, deleteQuestionValidator', () => {
    generator.next({ questionData, eosService: eos, locale, profileInfo });
    expect(deleteQuestionValidator).toHaveBeenCalledWith(
      postButtonId,
      questionData.answers.length,
      translationMessages[locale],
      profileInfo,
    );
  });

  it('step, deleteQuestion', () => {
    generator.next();
    expect(deleteQuestion).toHaveBeenCalledWith(user, questionid, eos);
  });

  it('step, deleteQuestionSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(DELETE_QUESTION_SUCCESS);
  });

  it('createdHistory.push', () => {
    generator.next();
    expect(createdHistory.push).toHaveBeenCalledWith(routes.questions());
  });

  it('error handling', () => {
    const err = 'some err';
    const step = generator.throw(err);
    expect(step.value.type).toBe(DELETE_QUESTION_ERROR);
  });
});

describe('getQuestionDataWorker', () => {
  const res = { questionId: 1 };
  const generator = sagaImports.getQuestionDataWorker(res);
  const profileInfo = { user: 'user' };
  const eosService = {};

  it('step, getParams', () => {
    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, getQuestionData', () => {
    const step = generator.next({ eosService, profileInfo });
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, getQuestionDataSuccess', () => {
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
    toggleView: jest.fn(),
    translations: {},
    postButtonId: 'postButtonId',
  };

  const generator = sagaImports.postCommentWorker(res);

  const profileInfo = {};
  const questionData = {};
  const eos = {};

  it('step, getParams', () => {
    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, isAuthorized', () => {
    generator.next({ profileInfo, eosService: eos, questionData });
    expect(call).toHaveBeenCalledWith(isAuthorized);
  });

  it('step, validation', () => {
    generator.next();
    expect(postCommentValidator).toHaveBeenCalledWith(
      profileInfo,
      questionData,
      res.postButtonId,
      res.answerId,
      res.translations,
    );
  });

  it('step, postComment', () => {
    generator.next(true);
    expect(postComment).toHaveBeenCalledWith(
      res.user,
      res.questionId,
      res.answerId,
      res.comment,
      eos,
    );
  });

  it('step, updateQuestionDataAfterTransactionWorker', () => {
    call.mockImplementationOnce((x, args) => x(args));

    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, toggleView', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(res.toggleView, true);
  });

  it('step, reset', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(res.reset);
  });

  it('step, postCommentSuccess', () => {
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
    translations: {},
    postButtonId: 'postButtonId',
  };

  const generator = sagaImports.postAnswerWorker(res);

  const profileInfo = {};
  const questionData = {};
  const eos = {};

  it('step, getParams', () => {
    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, isAuthorized', () => {
    generator.next({ profileInfo, eosService: eos, questionData });
    expect(call).toHaveBeenCalledWith(isAuthorized);
  });

  it('step, validation', () => {
    generator.next(profileInfo);
    expect(postAnswerValidator).toHaveBeenCalledWith(
      profileInfo,
      questionData,
      res.postButtonId,
      res.translations,
    );
  });

  it('step, postAnswer', () => {
    generator.next();
    expect(postAnswer).toHaveBeenCalledWith(
      res.user,
      res.questionId,
      res.answer,
      eos,
    );
  });

  it('step, updateQuestionDataAfterTransactionWorker', () => {
    call.mockImplementationOnce((x, args) => x(args));

    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, reset', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(res.reset);
  });

  it('step, POST_ANSWER_SUCCESS', () => {
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
    whoWasUpvoted: 'whoWasUpvoted',
    questionId: 1,
    postButtonId: 'postButtonId',
    translations: {},
  };

  const profileInfo = {};
  const eos = {};

  const questionData = {
    id: 1,
    votingStatus: { isDownVoted: false, isUpVoted: false },
    rating: 0,
    answers: [
      {
        id: 1,
        votingStatus: { isDownVoted: false, isUpVoted: false },
        rating: 0,
      },
      {
        id: 2,
        votingStatus: { isDownVoted: false, isUpVoted: false },
        rating: 0,
      },
    ],
  };

  describe('answerId = 0', () => {
    const answerId = 0;

    describe('isUpVoted is true', () => {
      const generator = sagaImports.upVoteWorker({ ...res, answerId });

      const clone = _.cloneDeep(questionData);

      clone.votingStatus.isUpVoted = true;

      it('step, getParams', () => {
        const step = generator.next();
        expect(typeof step.value._invoke).toBe('function');
      });

      it('step, isAuthorized', () => {
        generator.next({ profileInfo, eosService: eos, questionData: clone });
        expect(call).toHaveBeenCalledWith(isAuthorized);
      });

      it('step, validation', () => {
        generator.next();
        expect(upVoteValidator).toHaveBeenCalledWith(
          profileInfo,
          clone,
          res.postButtonId,
          answerId,
          res.translations,
        );
      });

      it('step, upVote', () => {
        generator.next();
        expect(upVote).toHaveBeenCalledWith(
          res.user,
          res.questionId,
          answerId,
          eos,
        );
      });

      it('step, UP_VOTE_SUCCESS', () => {
        const step = generator.next();
        expect(step.value.type).toBe(UP_VOTE_SUCCESS);
        expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
      });

      it('error handling', () => {
        const err = new Error('some error');
        const putDescriptor = generator.throw(err);
        expect(putDescriptor.value.type).toBe(UP_VOTE_ERROR);
      });
    });

    describe('isDownVoted is true', () => {
      const generator = sagaImports.upVoteWorker({ ...res, answerId });

      const clone = _.cloneDeep(questionData);

      clone.votingStatus.isDownVoted = true;

      generator.next();
      generator.next({ profileInfo, eosService: eos, questionData: clone });
      generator.next();
      generator.next();

      it('test', () => {
        const step = generator.next();
        expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
      });
    });

    describe('isUpVoted is false', () => {
      const generator = sagaImports.upVoteWorker({ ...res, answerId });

      const clone = _.cloneDeep(questionData);

      clone.votingStatus.isUpVoted = false;

      generator.next();
      generator.next({ profileInfo, eosService: eos, questionData: clone });
      generator.next();
      generator.next();

      it('test', () => {
        const step = generator.next();
        expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
      });
    });
  });

  describe('answerId > 0', () => {
    const answerId = 1;

    describe('isUpVoted is true', () => {
      const generator = sagaImports.upVoteWorker({ ...res, answerId });

      const clone = _.cloneDeep(questionData);

      clone.answers.find(x => x.id === answerId).votingStatus.isUpVoted = true;

      generator.next();
      generator.next({ profileInfo, eosService: eos, questionData: clone });
      generator.next();
      generator.next();

      it('test', () => {
        const step = generator.next();
        expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
      });
    });
  });
});

describe('downVoteWorker', () => {
  const res = {
    user: 'user1',
    whoWasDownvoted: 'whoWasDownvoted',
    questionId: 1,
    postButtonId: 'postButtonId',
    translations: {},
  };

  const profileInfo = {};
  const eos = {};

  const questionData = {
    id: 1,
    votingStatus: { isDownVoted: false, isUpVoted: false },
    rating: 0,
    answers: [
      {
        id: 1,
        votingStatus: { isDownVoted: false, isUpVoted: false },
        rating: 0,
      },
      {
        id: 2,
        votingStatus: { isDownVoted: false, isUpVoted: false },
        rating: 0,
      },
    ],
  };

  describe('answerId === 0', () => {
    const answerId = 0;

    describe('isDownVoted is true', () => {
      const generator = sagaImports.downVoteWorker({ ...res, answerId });

      const clone = _.cloneDeep(questionData);

      clone.votingStatus.isDownVoted = true;

      it('step, getParams', () => {
        const step = generator.next();
        expect(typeof step.value._invoke).toBe('function');
      });

      it('step, isAuthorized', () => {
        generator.next({ profileInfo, eosService: eos, questionData: clone });
        expect(call).toHaveBeenCalledWith(isAuthorized);
      });

      it('step, validation', () => {
        generator.next();
        expect(downVoteValidator).toHaveBeenCalledWith(
          profileInfo,
          clone,
          res.postButtonId,
          answerId,
          res.translations,
        );
      });

      it('step, downVote', () => {
        generator.next();
        expect(downVote).toHaveBeenCalledWith(
          res.user,
          res.questionId,
          answerId,
          eos,
        );
      });

      it('step, DOWN_VOTE_SUCCESS', () => {
        const step = generator.next();
        expect(step.value.type).toBe(DOWN_VOTE_SUCCESS);
        expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
      });

      it('error handling', () => {
        const err = new Error('some error');
        const putDescriptor = generator.throw(err);
        expect(putDescriptor.value.type).toBe(DOWN_VOTE_ERROR);
      });
    });

    describe('isUpVoted is true', () => {
      const generator = sagaImports.downVoteWorker({ ...res, answerId });

      const clone = _.cloneDeep(questionData);

      clone.votingStatus.isUpVoted = true;

      generator.next();
      generator.next({ profileInfo, eosService: eos, questionData: clone });
      generator.next();
      generator.next();

      it('test', () => {
        const step = generator.next();
        expect(step.value.type).toBe(DOWN_VOTE_SUCCESS);
        expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
      });
    });

    describe('isDownVoted is false', () => {
      const generator = sagaImports.downVoteWorker({ ...res, answerId });

      const clone = _.cloneDeep(questionData);

      clone.votingStatus.isDownVoted = false;

      generator.next();
      generator.next({ profileInfo, eosService: eos, questionData: clone });
      generator.next();
      generator.next();

      it('test', () => {
        const step = generator.next();
        expect(step.value.type).toBe(DOWN_VOTE_SUCCESS);
        expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
      });
    });
  });

  describe('answerId > 0', () => {
    const answerId = 1;

    describe('isDownVoted is true', () => {
      const generator = sagaImports.downVoteWorker({ ...res, answerId });

      const clone = _.cloneDeep(questionData);

      clone.answers.find(
        x => x.id === answerId,
      ).votingStatus.isDownVoted = true;

      generator.next();
      generator.next({ profileInfo, eosService: eos, questionData: clone });
      generator.next();
      generator.next();

      it('test', () => {
        const step = generator.next();
        expect(step.value.type).toBe(DOWN_VOTE_SUCCESS);
        expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
      });
    });
  });
});

describe('markAsAcceptedWorker', () => {
  const res = {
    user: 'user1',
    whoWasAccepted: 'whoWasAccepted',
    questionId: 1,
    correctAnswerId: 1,
    postButtonId: 'postButtonId',
    translations: {},
  };

  const profileInfo = {};
  const eos = {};

  describe('correctAnswerId !== questionData.correctAnswerId', () => {
    const generator = sagaImports.markAsAcceptedWorker(res);
    const questionData = { correct_answer_id: 0 };

    generator.next();
    generator.next({ profileInfo, eosService: eos, questionData });
    generator.next();
    generator.next();

    it('step, MARK_AS_ACCEPTED_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.questionData).toEqual({
        ...questionData,
        correct_answer_id: res.correctAnswerId,
      });
    });
  });

  describe('correctAnswerId == questionData.correctAnswerId', () => {
    const generator = sagaImports.markAsAcceptedWorker(res);
    const questionData = { correct_answer_id: 1 };

    it('step, getParams', () => {
      const step = generator.next();
      expect(typeof step.value._invoke).toBe('function');
    });

    it('step, isAuthorized', () => {
      generator.next({ profileInfo, eosService: eos, questionData });
      expect(call).toHaveBeenCalledWith(isAuthorized);
    });

    it('step, validation', () => {
      generator.next();
      expect(markAsAcceptedValidator).toHaveBeenCalledWith(
        profileInfo,
        questionData,
        res.postButtonId,
        res.translations,
      );
    });

    it('step, markAsAccepted', () => {
      generator.next();
      expect(markAsAccepted).toHaveBeenCalledWith(
        res.user,
        res.questionId,
        res.correctAnswerId,
        eos,
      );
    });

    it('step, MARK_AS_ACCEPTED_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(MARK_AS_ACCEPTED_SUCCESS);
      expect(step.value.questionData).toEqual({
        ...questionData,
        correct_answer_id: 0,
      });
    });

    it('error handling', () => {
      const err = new Error('some error');
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(MARK_AS_ACCEPTED_ERROR);
    });
  });
});

describe('voteToDeleteWorker', () => {
  const res = {
    questionId: 1,
    postButtonId: 'id',
    whoWasVoted: 'whoWasVoted',
  };

  const locale = 'en';
  const eos = {};
  const profileInfo = { user: 'user1' };

  const questionData = {
    votingStatus: { isVotedToDelete: false },
    comments: [{ id: 1, votingStatus: { isVotedToDelete: false } }],
    answers: [
      {
        id: 1,
        votingStatus: { isVotedToDelete: false },
        comments: [{ id: 1, votingStatus: { isVotedToDelete: false } }],
      },
    ],
  };

  describe('+answerId && commentId', () => {
    const answerId = 1;
    const commentId = 1;

    const generator = sagaImports.voteToDeleteWorker({
      ...res,
      answerId,
      commentId,
    });

    generator.next();
    generator.next({
      profileInfo,
      eosService: eos,
      questionData,
      locale,
    });
    generator.next();
    generator.next();

    it('step, VOTE_TO_DELETE_SUCCESS', () => {
      const step = generator.next();
      expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
    });
  });

  describe('+answerId && !commentId', () => {
    const answerId = 1;
    const commentId = null;

    const generator = sagaImports.voteToDeleteWorker({
      ...res,
      answerId,
      commentId,
    });

    generator.next();
    generator.next({
      profileInfo,
      eosService: eos,
      questionData,
      locale,
    });
    generator.next();
    generator.next();

    it('step, VOTE_TO_DELETE_SUCCESS', () => {
      const step = generator.next();
      expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
    });
  });

  describe('!+answerId && commentId', () => {
    const answerId = null;
    const commentId = 1;

    const generator = sagaImports.voteToDeleteWorker({
      ...res,
      answerId,
      commentId,
    });

    const copy = _.cloneDeep(questionData);

    generator.next();
    generator.next({
      profileInfo,
      eosService: eos,
      questionData: copy,
      locale,
    });
    generator.next();
    generator.next();

    it('step, VOTE_TO_DELETE_SUCCESS', () => {
      const step = generator.next();
      expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
    });
  });

  describe('!+answerId && !commentId', () => {
    const answerId = null;
    const commentId = null;

    const generator = sagaImports.voteToDeleteWorker({
      ...res,
      answerId,
      commentId,
    });

    it('step, getParams', () => {
      const step = generator.next();
      expect(typeof step.value._invoke).toBe('function');
    });

    it('step, isAuthorized', () => {
      generator.next({
        profileInfo,
        eosService: eos,
        questionData,
        locale,
      });

      expect(call).toHaveBeenCalledWith(isAuthorized);
    });

    it('step, validation', () => {
      generator.next();
      expect(voteToDeleteValidator).toHaveBeenCalledWith(
        profileInfo,
        questionData,
        translationMessages[locale],
        res.postButtonId,
        {
          questionId: res.questionId,
          answerId,
          commentId,
        },
      );
    });

    it('step, voteToDelete', () => {
      generator.next();
      expect(voteToDelete).toHaveBeenCalledWith(
        profileInfo.user,
        res.questionId,
        answerId,
        commentId,
        eos,
      );
    });

    it('step, VOTE_TO_DELETE_SUCCESS', () => {
      questionData.votingStatus.isVotedToDelete = true;

      const step = generator.next();
      expect(step.value.type).toBe(VOTE_TO_DELETE_SUCCESS);
      expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
    });

    it('error handling', () => {
      const err = new Error('some error');
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(VOTE_TO_DELETE_ERROR);
    });
  });
});

describe('defaultSaga', () => {
  const generator = sagaImports.default();

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

  it('DELETE_QUESTION', () => {
    const step = generator.next();
    expect(step.value).toBe(DELETE_QUESTION);
  });

  it('DELETE_ANSWER', () => {
    const step = generator.next();
    expect(step.value).toBe(DELETE_ANSWER);
  });

  it('DELETE_COMMENT', () => {
    const step = generator.next();
    expect(step.value).toBe(DELETE_COMMENT);
  });

  it('SAVE_COMMENT', () => {
    const step = generator.next();
    expect(step.value).toBe(SAVE_COMMENT);
  });

  it('VOTE_TO_DELETE', () => {
    const step = generator.next();
    expect(step.value).toBe(VOTE_TO_DELETE);
  });
});
