/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, all, call, put } from 'redux-saga/effects';
import cloneDeep from 'lodash/cloneDeep';
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
import { removeUserProfile } from 'containers/DataCacheProvider/actions';
import { getCurrentAccountWorker } from 'containers/AccountProvider/saga';
import { getUniqQuestions } from 'containers/Questions/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

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
  POST_COMMENT_BUTTON,
  POST_ANSWER_BUTTON,
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
import {
  getQuestionDataSuccess,
  postAnswerSuccess,
  postCommentSuccess,
} from '../actions';

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
  call: jest.fn().mockImplementation((x, ...args) => x(...args)),
  put: jest.fn().mockImplementation(res => res),
  all: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
  takeEvery: jest.fn().mockImplementation(res => res),
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

window.Date.now = jest.fn().mockImplementation(() => '15151515151');

describe('getQuestionData', () => {
  const eosService = {};
  const questionId = 1;
  const user = 'user';
  const res = { eosService, questionId, user };

  const question = {
    answers: [{}],
    comments: [{}],
    communityId: 2,
    correct_answer_id: 1,
    history: [],
    id: '68719476729',
    ipfs_link: 'QmQnvSPNHehegUFohQ8kABdrGCFeADVTiwuD8SM23xmVjZ',
    postTime: 1551430946,
    properties: [],
    rating: 0,
    tags: [1, 2],
    title: 'sdadsddsdadsddsdadsddsdadsddsdadsddsdadsdd',
    user: 'user1',
  };

  describe('there is cached question', () => {
    const generator = sagaImports.getQuestionData(res);

    it('select questionData', () => {
      select.mockImplementationOnce(() => question);
      const selectDescriptor = generator.next();
      expect(selectDescriptor.value).toEqual(question);
    });

    it('all promises', () => {
      const isAll = true;

      all.mockImplementation(() => isAll);
      const step = generator.next(question);
      expect(step.value).toBe(isAll);
    });
  });

  describe('there is NO cached question', () => {
    const generator = sagaImports.getQuestionData(res);

    generator.next();

    it('getQuestionById', () => {
      getQuestionById.mockImplementation(() => question);
      const step = generator.next(null);
      expect(step.value).toBe(question);
    });

    it('all promises', () => {
      const isAll = true;

      all.mockImplementation(() => isAll);
      const step = generator.next(question);
      expect(step.value).toBe(isAll);
    });
  });
});

describe('getParams', () => {
  const questionData = 'questionData';
  const eosService = 'eosService';
  const locale = 'locale';
  const profileInfo = 'profileInfo';
  const account = 'account';

  const generator = sagaImports.getParams();

  it('select questionData', () => {
    select.mockImplementationOnce(() => questionData);
    const selectDescriptor = generator.next();
    expect(selectDescriptor.value).toEqual(questionData);
  });

  it('select eosService', () => {
    select.mockImplementationOnce(() => eosService);
    const selectDescriptor = generator.next();
    expect(selectDescriptor.value).toEqual(eosService);
  });

  it('select locale', () => {
    select.mockImplementationOnce(() => locale);
    const selectDescriptor = generator.next();
    expect(selectDescriptor.value).toEqual(locale);
  });

  it('select profileInfo', () => {
    select.mockImplementationOnce(() => profileInfo);
    const selectDescriptor = generator.next();
    expect(selectDescriptor.value).toEqual(profileInfo);
  });

  it('select account', () => {
    select.mockImplementationOnce(() => account);
    const selectDescriptor = generator.next();
    expect(selectDescriptor.value).toEqual(account);
  });
});

describe('updateQuestionDataAfterTransactionWorker', () => {
  const account = 'account';
  const questionData = {
    id: 1,
    userInfo: {},
    user: 'user1',
    comments: [{ id: 1, user: 'user1', userInfo: {} }],
    answers: [
      {
        id: 1,
        user: 'account',
        userInfo: {},
        comments: [{ id: 1, user: 'account', userInfo: {} }],
      },
    ],
  };

  const userInfoMe = { profile: {} };
  const userInfoOpponent = { profile: {} };

  describe('with users for update', () => {
    const usersForUpdate = ['user1'];
    const generator = sagaImports.updateQuestionDataAfterTransactionWorker({
      usersForUpdate,
      questionData,
    });

    it('select account', () => {
      select.mockImplementationOnce(() => account);
      const selectDescriptor = generator.next();
      expect(selectDescriptor.value).toEqual(account);
    });

    it('call getCurrentAccountWorker', () => {
      generator.next(account);
      expect(call).toHaveBeenCalledWith(getCurrentAccountWorker);
    });

    it('removeUserProfile', () => {
      generator.next();
      expect(put).toHaveBeenCalledWith(removeUserProfile(usersForUpdate[0]));
    });

    it('call, get userInfoOpponent', () => {
      generator.next();
      expect(call).toHaveBeenCalledWith(getUserProfileWorker, {
        user: usersForUpdate[0],
      });
    });

    it('call, get userInfoMe', () => {
      generator.next(userInfoOpponent);
      expect(call).toHaveBeenCalledWith(getUserProfileWorker, {
        user: account,
      });
    });

    it('put, getQuestionData', () => {
      generator.next(userInfoMe);
      expect(questionData).toMatchSnapshot();
      expect(put).toHaveBeenCalledWith(
        getQuestionDataSuccess({ ...questionData }),
      );
    });

    it('error handling', () => {
      const err = 'some err';
      const step = generator.throw(err);
      expect(step.value.type).toBe(GET_QUESTION_DATA_ERROR);
    });
  });

  describe('without users for update', () => {
    const usersForUpdate = null;
    const generator = sagaImports.updateQuestionDataAfterTransactionWorker({
      usersForUpdate,
      questionData,
    });

    call.mockImplementationOnce((x, args) => x(args));

    generator.next();
    generator.next(account);
    generator.next();
    generator.next(userInfoMe);

    it('test', () => {
      const step = generator.next();
      expect(step.done).toBe(true);
    });
  });
});

/* eslint no-underscore-dangle: 0 */
describe('saveCommentWorker', () => {
  const eosService = {};

  const questionId = 1;
  const commentId = 1;
  const comment = 'comment';
  const toggleView = jest.fn();
  const profileInfo = { user: 'user' };

  const res = {
    questionId,
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
    generator.next({ questionData, eosService, profileInfo });
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
      generator.next({ questionData, eosService, profileInfo });
      expect(editComment).toHaveBeenCalledWith(
        profileInfo.user,
        questionId,
        0,
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
  const questionId = 1;
  const answerId = 1;
  const commentId = 2;
  const profileInfo = { user: 'user' };
  const buttonId = 'buttonId';

  const questionData = {
    comments: [{ id: 1 }, { id: 2 }],
    answers: [
      { id: 1, comments: [{ id: 1 }, { id: 2 }] },
      { id: 2, comments: [{ id: 1 }, { id: 2 }] },
    ],
  };

  const res = {
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
      profileInfo.user,
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
  const profileInfo = { user: 'user' };
  const questionId = 1;
  const answerId = 1;
  const postButtonId = 'postButtonId';

  const questionData = {
    comments: [{ id: 1 }, { id: 2 }],
    answers: [
      { id: 1, comments: [{ id: 1 }, { id: 2 }] },
      { id: 2, comments: [{ id: 1 }, { id: 2 }] },
    ],
  };

  const res = {
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
    expect(deleteAnswer).toHaveBeenCalledWith(
      profileInfo.user,
      questionId,
      answerId,
      eos,
    );
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
  const questionId = 11;
  const postButtonId = 'postButtonId';
  const profileInfo = { user: 'user' };

  const questionData = {
    answers: [],
  };

  const res = {
    questionId,
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
    expect(deleteQuestion).toHaveBeenCalledWith(
      profileInfo.user,
      questionId,
      eos,
    );
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
  const account = 'account';
  const eosService = {};

  it('step, getParams', () => {
    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, getQuestionData', () => {
    const step = generator.next({ eosService, account });
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
    questionId: 1,
    comment: 'comment',
    reset: jest.fn(),
    toggleView: jest.fn(),
    postButtonId: 'postButtonId',
  };

  const profileInfo = { user: 'user' };
  const locale = 'en';
  const eos = {};

  describe('comment of question', () => {
    const answerId = 0;
    const generator = sagaImports.postCommentWorker({ ...res, answerId });

    const questionData = {
      comments: [],
      answers: [{ id: 1, comments: [] }, { id: 2, comments: [] }],
    };

    it('step, getParams', () => {
      const step = generator.next();
      expect(typeof step.value._invoke).toBe('function');
    });

    it('step, isAuthorized', () => {
      generator.next({ profileInfo, eosService: eos, questionData, locale });
      expect(questionData.comments.length).toBe(0);
      expect(call).toHaveBeenCalledWith(isAuthorized);
    });

    it('step, validation', () => {
      generator.next();
      expect(postCommentValidator).toHaveBeenCalledWith(
        profileInfo,
        questionData,
        `${POST_COMMENT_BUTTON}${answerId}`,
        answerId,
        translationMessages[locale],
      );
    });

    it('step, postComment', () => {
      generator.next(true);
      expect(postComment).toHaveBeenCalledWith(
        profileInfo.user,
        res.questionId,
        answerId,
        res.comment,
        eos,
      );
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
      expect(questionData.comments.length).toBe(1);
      expect(questionData).toMatchSnapshot();
      expect(step.value).toEqual(postCommentSuccess({ ...questionData }));
    });

    it('error handling', () => {
      const err = new Error('some error');
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(POST_COMMENT_ERROR);
    });
  });

  describe('comment of answer', () => {
    const answerId = 1;
    const generator = sagaImports.postCommentWorker({ ...res, answerId });

    const questionData = {
      comments: [],
      answers: [{ id: answerId, comments: [] }, { id: 2, comments: [] }],
    };

    generator.next();
    generator.next({ profileInfo, eosService: eos, questionData, locale });
    generator.next();
    generator.next(true);
    generator.next();
    generator.next();

    it('step, postCommentSuccess', () => {
      const step = generator.next();

      expect(questionData.answers[0].comments.length).toBe(1);
      expect(questionData).toMatchSnapshot();
      expect(step.value).toEqual(postCommentSuccess({ ...questionData }));
    });
  });
});

describe('postAnswerWorker', () => {
  const res = {
    questionId: 1,
    answer: 1,
    reset: jest.fn(),
    postButtonId: 'postButtonId',
  };

  const generator = sagaImports.postAnswerWorker(res);

  const profileInfo = { user: 'user' };
  const locale = 'en';
  const questionData = { answers: [] };
  const eos = {};

  it('step, getParams', () => {
    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, isAuthorized', () => {
    generator.next({ profileInfo, eosService: eos, questionData, locale });
    expect(questionData.answers.length).toBe(0);
    expect(call).toHaveBeenCalledWith(isAuthorized);
  });

  it('step, validation', () => {
    generator.next();
    expect(postAnswerValidator).toHaveBeenCalledWith(
      profileInfo,
      questionData,
      POST_ANSWER_BUTTON,
      translationMessages[locale],
    );
  });

  it('step, postAnswer', () => {
    generator.next();
    expect(postAnswer).toHaveBeenCalledWith(
      profileInfo.user,
      res.questionId,
      res.answer,
      eos,
    );
  });

  it('step, reset', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(res.reset);
  });

  it('step, POST_ANSWER_SUCCESS', () => {
    const step = generator.next();
    expect(questionData).toMatchSnapshot();
    expect(questionData.answers.length).toBe(1);
    expect(step.value).toEqual(postAnswerSuccess({ ...questionData }));
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(POST_ANSWER_ERROR);
  });
});

describe('upVoteWorker', () => {
  const res = {
    whoWasUpvoted: 'whoWasUpvoted',
    questionId: 1,
    postButtonId: 'postButtonId',
  };

  const profileInfo = { user: 'user' };
  const eos = {};
  const locale = 'en';

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

      const clone = cloneDeep(questionData);

      clone.votingStatus.isUpVoted = true;

      it('step, getParams', () => {
        const step = generator.next();
        expect(typeof step.value._invoke).toBe('function');
      });

      it('step, isAuthorized', () => {
        generator.next({
          profileInfo,
          eosService: eos,
          questionData: clone,
          locale,
        });
        expect(call).toHaveBeenCalledWith(isAuthorized);
      });

      it('step, validation', () => {
        generator.next();
        expect(upVoteValidator).toHaveBeenCalledWith(
          profileInfo,
          clone,
          res.postButtonId,
          answerId,
          translationMessages[locale],
        );
      });

      it('step, upVote', () => {
        generator.next();
        expect(upVote).toHaveBeenCalledWith(
          profileInfo.user,
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

      const clone = cloneDeep(questionData);

      clone.votingStatus.isDownVoted = true;

      generator.next();
      generator.next({
        profileInfo,
        eosService: eos,
        questionData: clone,
        locale,
      });
      generator.next();
      generator.next();

      it('test', () => {
        const step = generator.next();
        expect(JSON.stringify(step.value.questionData)).toMatchSnapshot();
      });
    });

    describe('isUpVoted is false', () => {
      const generator = sagaImports.upVoteWorker({ ...res, answerId });

      const clone = cloneDeep(questionData);

      clone.votingStatus.isUpVoted = false;

      generator.next();
      generator.next({
        profileInfo,
        eosService: eos,
        questionData: clone,
        locale,
      });
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

      const clone = cloneDeep(questionData);

      clone.answers.find(x => x.id === answerId).votingStatus.isUpVoted = true;

      generator.next();
      generator.next({
        profileInfo,
        eosService: eos,
        questionData: clone,
        locale,
      });
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
    whoWasDownvoted: 'whoWasDownvoted',
    questionId: 1,
    postButtonId: 'postButtonId',
  };

  const profileInfo = { user: 'user' };
  const eos = {};
  const locale = 'en';

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

      const clone = cloneDeep(questionData);

      clone.votingStatus.isDownVoted = true;

      it('step, getParams', () => {
        const step = generator.next();
        expect(typeof step.value._invoke).toBe('function');
      });

      it('step, isAuthorized', () => {
        generator.next({
          profileInfo,
          eosService: eos,
          questionData: clone,
          locale,
        });
        expect(call).toHaveBeenCalledWith(isAuthorized);
      });

      it('step, validation', () => {
        generator.next();
        expect(downVoteValidator).toHaveBeenCalledWith(
          profileInfo,
          clone,
          res.postButtonId,
          answerId,
          translationMessages[locale],
        );
      });

      it('step, downVote', () => {
        generator.next();
        expect(downVote).toHaveBeenCalledWith(
          profileInfo.user,
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

      const clone = cloneDeep(questionData);

      clone.votingStatus.isUpVoted = true;

      generator.next();
      generator.next({
        profileInfo,
        eosService: eos,
        questionData: clone,
        locale,
      });
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

      const clone = cloneDeep(questionData);

      clone.votingStatus.isDownVoted = false;

      generator.next();
      generator.next({
        profileInfo,
        eosService: eos,
        questionData: clone,
        locale,
      });
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

      const clone = cloneDeep(questionData);

      clone.answers.find(
        x => x.id === answerId,
      ).votingStatus.isDownVoted = true;

      generator.next();
      generator.next({
        profileInfo,
        eosService: eos,
        questionData: clone,
        locale,
      });
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
    whoWasAccepted: 'whoWasAccepted',
    questionId: 1,
    correctAnswerId: 1,
    postButtonId: 'postButtonId',
  };

  const profileInfo = { user: 'user' };
  const eos = {};
  const locale = 'en';

  describe('correctAnswerId !== questionData.correctAnswerId', () => {
    const generator = sagaImports.markAsAcceptedWorker(res);
    const questionData = { correct_answer_id: 0 };

    generator.next();
    generator.next({ profileInfo, eosService: eos, questionData, locale });
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
      generator.next({ profileInfo, eosService: eos, questionData, locale });
      expect(call).toHaveBeenCalledWith(isAuthorized);
    });

    it('step, validation', () => {
      generator.next();
      expect(markAsAcceptedValidator).toHaveBeenCalledWith(
        profileInfo,
        questionData,
        res.postButtonId,
        translationMessages[locale],
      );
    });

    it('step, markAsAccepted', () => {
      generator.next();
      expect(markAsAccepted).toHaveBeenCalledWith(
        profileInfo.user,
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

    const copy = cloneDeep(questionData);

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

describe('updateQuestionList', () => {
  describe('there is questionData', () => {
    const questionData = {};
    const generator = sagaImports.updateQuestionList({ questionData });

    it('put questionData', () => {
      const step = generator.next();
      expect(step.value).toEqual(getUniqQuestions([questionData]));
    });
  });

  describe('there is no questionData', () => {
    const questionData = null;
    const generator = sagaImports.updateQuestionList({ questionData });

    it('put questionData', () => {
      const step = generator.next();
      expect(step.done).toBe(true);
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

  it('updateQuestionDataAfterTransactionWorker', () => {
    const step = generator.next();
    expect(step.value).toEqual([
      UP_VOTE_SUCCESS,
      DOWN_VOTE_SUCCESS,
      MARK_AS_ACCEPTED_SUCCESS,
      VOTE_TO_DELETE_SUCCESS,
      POST_COMMENT_SUCCESS,
      POST_ANSWER_SUCCESS,
    ]);
  });

  it('updateQuestionList', () => {
    const step = generator.next();
    expect(step.value).toEqual([
      GET_QUESTION_DATA,
      POST_COMMENT,
      POST_ANSWER,
      UP_VOTE,
      DOWN_VOTE,
      MARK_AS_ACCEPTED,
      DELETE_QUESTION,
      DELETE_ANSWER,
      DELETE_COMMENT,
      SAVE_COMMENT,
      VOTE_TO_DELETE,
    ]);
  });
});
