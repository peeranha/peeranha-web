/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import {
  getQuestionData,
  postComment,
  postAnswer,
  upVote,
  downVote,
  markAsAccepted,
  deleteQuestion,
  deleteAnswer,
  deleteComment,
  editComment,
} from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { getProfileInfo } from 'utils/profileManagement';

import { SHOW_LOGIN_MODAL } from 'containers/Login/constants';

import defaultSaga, {
  getQuestionDataWorker,
  postCommentWorker,
  postAnswerWorker,
  upVoteWorker,
  downVoteWorker,
  markAsAcceptedWorker,
  deleteQuestionWorker,
  deleteAnswerWorker,
  deleteCommentWorker,
  saveCommentWorker,
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
} from '../constants';

import {
  postCommentValidator,
  postAnswerValidator,
  upVoteValidator,
  downVoteValidator,
  markAsAcceptedValidator,
  deleteQuestionValidator,
  deleteAnswerValidator,
} from '../validate';

jest.mock('../validate', () => ({
  postAnswerValidator: jest.fn().mockImplementation(() => true),
  postCommentValidator: jest.fn().mockImplementation(() => true),
  markAsAcceptedValidator: jest.fn().mockImplementation(() => true),
  upVoteValidator: jest.fn().mockImplementation(() => true),
  downVoteValidator: jest.fn().mockImplementation(() => true),
  deleteQuestionValidator: jest.fn().mockImplementation(() => true),
  deleteAnswerValidator: jest.fn().mockImplementation(() => true),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

jest.mock('utils/questionsManagement', () => ({
  getQuestionData: jest.fn(),
  postComment: jest.fn(),
  postAnswer: jest.fn(),
  upVote: jest.fn(),
  downVote: jest.fn(),
  markAsAccepted: jest.fn(),
  deleteQuestion: jest.fn(),
  deleteAnswer: jest.fn(),
  deleteComment: jest.fn(),
  editComment: jest.fn(),
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

describe('saveCommentWorker', () => {
  const eos = {};
  const locale = 'en';
  const user = 'user';
  const questionId = 11;
  const answerId = 11;
  const commentId = 12;
  const comment = 'comment';

  const res = {
    user,
    questionId,
    answerId,
    commentId,
    comment,
  };

  const generator = saveCommentWorker(res);

  it('step, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next(locale);
    expect(step.value).toEqual(eos);
  });

  it('step, editComment', () => {
    generator.next(eos);
    expect(editComment).toHaveBeenCalledWith(
      user,
      questionId,
      answerId,
      commentId,
      comment,
      eos,
    );
  });

  it('step, getQuestionData', () => {
    generator.next();
    expect(getQuestionData).toHaveBeenCalledWith(eos, questionId, user);
  });

  it('step, saveCommentSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(SAVE_COMMENT_SUCCESS);
  });

  it('error handling', () => {
    const err = 'some err';
    const step = generator.throw(err);
    expect(step.value.type).toBe(SAVE_COMMENT_ERROR);
  });
});

describe('deleteCommentWorker', () => {
  const eos = {};
  const locale = 'en';
  const user = 'user';
  const questionId = 11;
  const answerId = 11;
  const commentId = 12;

  const res = {
    user,
    questionId,
    answerId,
    commentId,
  };

  const generator = deleteCommentWorker(res);

  it('step, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next(locale);
    expect(step.value).toEqual(eos);
  });

  it('step, deleteComment', () => {
    generator.next(eos);
    expect(deleteComment).toHaveBeenCalledWith(
      user,
      questionId,
      answerId,
      commentId,
      eos,
    );
  });

  it('step, getQuestionData', () => {
    generator.next();
    expect(getQuestionData).toHaveBeenCalledWith(eos, questionId, user);
  });

  it('step, deleteCommentSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(DELETE_COMMENT_SUCCESS);
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
  const questionid = 11;
  const answerid = 11;
  const postButtonId = 'postButtonId';

  const questionData = {
    answers: [],
    correct_answer_id: 0,
  };

  const res = {
    user,
    questionid,
    answerid,
    postButtonId,
  };

  describe('isValid is true', () => {
    const generator = deleteAnswerWorker(res);

    it('step, selectQuestionData', () => {
      select.mockImplementation(() => questionData);
      const step = generator.next();
      expect(step.value).toEqual(questionData);
    });

    it('step, makeSelectLocale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next(questionData);
      expect(step.value).toEqual(locale);
    });

    it('step, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next(locale);
      expect(step.value).toEqual(eos);
    });

    it('step, deleteAnswerValidator', () => {
      generator.next(eos);
      expect(deleteAnswerValidator).toHaveBeenCalledWith(
        postButtonId,
        answerid,
        questionData.correct_answer_id,
        translationMessages[locale],
      );
    });

    it('step, deleteAnswer', () => {
      const isValid = true;
      generator.next(isValid);
      expect(deleteAnswer).toHaveBeenCalledWith(
        user,
        questionid,
        answerid,
        eos,
      );
    });

    it('step, getQuestionData', () => {
      generator.next();
      expect(getQuestionData).toHaveBeenCalledWith(eos, questionid, user);
    });

    it('step, deleteAnswerSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(DELETE_ANSWER_SUCCESS);
    });

    it('error handling', () => {
      const err = 'some err';
      const step = generator.throw(err);
      expect(step.value.type).toBe(DELETE_ANSWER_ERROR);
    });
  });

  describe('isValid is false', () => {
    const generator = deleteAnswerWorker(res);

    generator.next();
    generator.next(questionData);
    generator.next(locale);
    generator.next(eos);

    it('deleteQuestionErr', () => {
      const isValid = false;
      const step = generator.next(isValid);
      expect(step.value.type).toBe(DELETE_ANSWER_ERROR);
    });
  });
});

describe('deleteQuestionWorker', () => {
  const eos = {};
  const locale = 'en';
  const user = 'user';
  const questionid = 11;
  const postButtonId = 'postButtonId';

  const questionData = {
    answers: [],
  };

  const res = {
    user,
    questionid,
    postButtonId,
  };

  describe('isValid is true', () => {
    const generator = deleteQuestionWorker(res);

    it('step, selectQuestionData', () => {
      select.mockImplementation(() => questionData);
      const step = generator.next();
      expect(step.value).toEqual(questionData);
    });

    it('step, makeSelectLocale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next(questionData);
      expect(step.value).toEqual(locale);
    });

    it('step, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next(locale);
      expect(step.value).toEqual(eos);
    });

    it('step, deleteQuestionValidator', () => {
      generator.next(eos);
      expect(deleteQuestionValidator).toHaveBeenCalledWith(
        postButtonId,
        questionData.answers.length,
        translationMessages[locale],
      );
    });

    it('step, deleteQuestion', () => {
      const isValid = true;
      generator.next(isValid);
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

  describe('isValid is false', () => {
    const generator = deleteQuestionWorker(res);

    generator.next();
    generator.next(questionData);
    generator.next(locale);
    generator.next(eos);

    it('deleteQuestionErr', () => {
      const isValid = false;
      const step = generator.next(isValid);
      expect(step.value.type).toBe(DELETE_QUESTION_ERROR);
    });
  });
});

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
    translations: {},
    postButtonId: 'postButtonId',
  };

  describe('profileInfo true', () => {
    const generator = postCommentWorker(res);

    const profileInfo = {};
    const questionData = {};
    const eos = {
      getSelectedAccount: jest.fn().mockImplementation(() => res.user),
    };

    it('step1-1, selectQuestionData', () => {
      select.mockImplementation(() => questionData);
      const step = generator.next();
      expect(step.value).toEqual(questionData);
    });

    it('step1-2, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next(questionData);
      expect(step.value).toEqual(eos);
    });

    it('step1-3, profileInfo', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next(eos);
      expect(step.value).toEqual(profileInfo);
    });

    it('step1-4, validation', () => {
      generator.next(profileInfo);
      expect(postCommentValidator).toHaveBeenCalledWith(
        profileInfo,
        questionData,
        res.postButtonId,
        res.answerId,
        res.translations,
      );
    });

    it('step2, postComment', () => {
      generator.next(true);
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
      expect(getQuestionData).toHaveBeenCalledWith(
        eos,
        res.questionId,
        res.user,
      );
    });

    it('step4, reset', () => {
      generator.next();
      expect(res.reset).toHaveBeenCalled();
    });

    it('step5, postCommentSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(POST_COMMENT_SUCCESS);
    });
  });

  describe('profileInfo false => showLoginModal', () => {
    const generator = postCommentWorker(res);
    const profileInfo = null;

    generator.next();
    generator.next();
    generator.next();

    it('showLoginModal', () => {
      const showLoginModal = generator.next(profileInfo);
      expect(showLoginModal.value.type).toBe(SHOW_LOGIN_MODAL);
    });

    it('error handling', () => {
      const err = new Error('some error');
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(POST_COMMENT_ERROR);
    });
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

  describe('profileInfo true', () => {
    const generator = postAnswerWorker(res);

    const profileInfo = {};
    const questionData = {};
    const eos = {
      getSelectedAccount: jest.fn().mockImplementation(() => res.user),
    };

    it('step1-1, selectQuestionData', () => {
      select.mockImplementation(() => questionData);
      const step = generator.next();
      expect(step.value).toEqual(questionData);
    });

    it('step1-2, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next(questionData);
      expect(step.value).toEqual(eos);
    });

    it('step1-3, profileInfo', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next(eos);
      expect(step.value).toEqual(profileInfo);
    });

    it('step1-4, validation', () => {
      generator.next(profileInfo);
      expect(postAnswerValidator).toHaveBeenCalledWith(
        profileInfo,
        questionData,
        res.postButtonId,
        res.translations,
      );
    });

    it('step2, postAnswer', () => {
      generator.next(true);
      expect(postAnswer).toHaveBeenCalledWith(
        res.user,
        res.questionId,
        res.answer,
        eos,
      );
    });

    it('step3, getQuestionData', () => {
      generator.next();
      expect(getQuestionData).toHaveBeenCalledWith(
        eos,
        res.questionId,
        res.user,
      );
    });

    it('step4, reset', () => {
      generator.next();
      expect(res.reset).toHaveBeenCalled();
    });

    it('step5, POST_ANSWER_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(POST_ANSWER_SUCCESS);
    });
  });

  describe('profileInfo false => showLoginModal', () => {
    const generator = postAnswerWorker(res);
    const profileInfo = null;

    generator.next();
    generator.next();
    generator.next();

    it('showLoginModal', () => {
      const showLoginModal = generator.next(profileInfo);
      expect(showLoginModal.value.type).toBe(SHOW_LOGIN_MODAL);
    });

    it('error handling', () => {
      const err = new Error('some error');
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(POST_ANSWER_ERROR);
    });
  });
});

describe('upVoteWorker', () => {
  const res = {
    user: 'user1',
    questionId: 1,
    answerId: 1,
    postButtonId: 'postButtonId',
    translations: {},
  };

  describe('profileInfo is true', () => {
    const generator = upVoteWorker(res);

    const profileInfo = {};
    const questionData = {};
    const eos = {
      getSelectedAccount: jest.fn().mockImplementation(() => res.user),
    };

    it('step1-1, selectQuestionData', () => {
      select.mockImplementation(() => questionData);
      const step = generator.next();
      expect(step.value).toEqual(questionData);
    });

    it('step1-2, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next(questionData);
      expect(step.value).toEqual(eos);
    });

    it('step1-3, profileInfo', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next(eos);
      expect(step.value).toEqual(profileInfo);
    });

    it('step1-4, validation', () => {
      generator.next(profileInfo);
      expect(upVoteValidator).toHaveBeenCalledWith(
        profileInfo,
        questionData,
        res.postButtonId,
        res.answerId,
        res.translations,
      );
    });

    it('step2, upVote', () => {
      generator.next(true);
      expect(upVote).toHaveBeenCalledWith(
        res.user,
        res.questionId,
        res.answerId,
        eos,
      );
    });

    it('step3, getQuestionData', () => {
      generator.next();
      expect(getQuestionData).toHaveBeenCalledWith(
        eos,
        res.questionId,
        res.user,
      );
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

  describe('profileInfo false => showLoginModal', () => {
    const generator = upVoteWorker(res);
    const profileInfo = null;

    generator.next();
    generator.next();
    generator.next();

    it('showLoginModal', () => {
      const showLoginModal = generator.next(profileInfo);
      expect(showLoginModal.value.type).toBe(SHOW_LOGIN_MODAL);
    });

    it('errorHandling', () => {
      const errorHandling = generator.next();
      expect(errorHandling.value.type).toBe(UP_VOTE_ERROR);
    });
  });
});

describe('downVoteWorker', () => {
  const res = {
    user: 'user1',
    questionId: 1,
    answerId: 1,
    postButtonId: 'postButtonId',
    translations: {},
  };

  describe('profileInfo true', () => {
    const generator = downVoteWorker(res);

    const profileInfo = {};
    const questionData = {};
    const eos = {
      getSelectedAccount: jest.fn().mockImplementation(() => res.user),
    };

    it('step1-1, selectQuestionData', () => {
      select.mockImplementation(() => questionData);
      const step = generator.next();
      expect(step.value).toEqual(questionData);
    });

    it('step1-2, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next(questionData);
      expect(step.value).toEqual(eos);
    });

    it('step1-3, profileInfo', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next(eos);
      expect(step.value).toEqual(profileInfo);
    });

    it('step1-4, validation', () => {
      generator.next(profileInfo);
      expect(downVoteValidator).toHaveBeenCalledWith(
        profileInfo,
        questionData,
        res.postButtonId,
        res.answerId,
        res.translations,
      );
    });

    it('step2, downVote', () => {
      generator.next(true);
      expect(downVote).toHaveBeenCalledWith(
        res.user,
        res.questionId,
        res.answerId,
        eos,
      );
    });

    it('step3, getQuestionData', () => {
      generator.next();
      expect(getQuestionData).toHaveBeenCalledWith(
        eos,
        res.questionId,
        res.user,
      );
    });

    it('step4, DOWN_VOTE_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(DOWN_VOTE_SUCCESS);
    });
  });

  describe('profileInfo false => showLoginModal', () => {
    const generator = downVoteWorker(res);
    const profileInfo = null;

    generator.next();
    generator.next();
    generator.next();

    it('showLoginModal', () => {
      const showLoginModal = generator.next(profileInfo);
      expect(showLoginModal.value.type).toBe(SHOW_LOGIN_MODAL);
    });

    it('error handling', () => {
      const err = new Error('some error');
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(DOWN_VOTE_ERROR);
    });
  });
});

describe('markAsAcceptedWorker', () => {
  const res = {
    user: 'user1',
    questionId: 1,
    correctAnswerId: 1,
    postButtonId: 'postButtonId',
    translations: {},
  };

  describe('profileInfo true', () => {
    const generator = markAsAcceptedWorker(res);

    const profileInfo = {};
    const questionData = {};
    const eos = {
      getSelectedAccount: jest.fn().mockImplementation(() => res.user),
    };

    it('step1-1, selectQuestionData', () => {
      select.mockImplementation(() => questionData);
      const step = generator.next();
      expect(step.value).toEqual(questionData);
    });

    it('step1-2, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next(questionData);
      expect(step.value).toEqual(eos);
    });

    it('step1-3, profileInfo', () => {
      getProfileInfo.mockImplementation(() => profileInfo);
      const step = generator.next(eos);
      expect(step.value).toEqual(profileInfo);
    });

    it('step1-4, validation', () => {
      generator.next(profileInfo);
      expect(markAsAcceptedValidator).toHaveBeenCalledWith(
        profileInfo,
        questionData,
        res.postButtonId,
        res.translations,
      );
    });

    it('step2, markAsAccepted', () => {
      generator.next(true);
      expect(markAsAccepted).toHaveBeenCalledWith(
        res.user,
        res.questionId,
        res.correctAnswerId,
        eos,
      );
    });

    it('step3, getQuestionData', () => {
      generator.next();
      expect(getQuestionData).toHaveBeenCalledWith(
        eos,
        res.questionId,
        res.user,
      );
    });

    it('step4, MARK_AS_ACCEPTED_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(MARK_AS_ACCEPTED_SUCCESS);
    });
  });

  describe('profileInfo false => showLoginModal', () => {
    const generator = markAsAcceptedWorker(res);
    const profileInfo = null;

    generator.next();
    generator.next();
    generator.next();

    it('showLoginModal', () => {
      const showLoginModal = generator.next(profileInfo);
      expect(showLoginModal.value.type).toBe(SHOW_LOGIN_MODAL);
    });

    it('error handling', () => {
      const err = new Error('some error');
      const putDescriptor = generator.throw(err);
      expect(putDescriptor.value.type).toBe(MARK_AS_ACCEPTED_ERROR);
    });
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
});
