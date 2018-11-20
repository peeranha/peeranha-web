import {
  getQuestionData,
  getQuestionDataSuccess,
  getQuestionDataErr,
  postAnswer,
  postAnswerSuccess,
  postAnswerErr,
  postComment,
  postCommentSuccess,
  postCommentErr,
  upVote,
  upVoteSuccess,
  upVoteErr,
  downVote,
  downVoteSuccess,
  downVoteErr,
  markAsAccepted,
  markAsAcceptedSuccess,
  markAsAcceptedErr,
} from '../actions';

import {
  GET_QUESTION_DATA,
  GET_QUESTION_DATA_SUCCESS,
  GET_QUESTION_DATA_ERROR,
  POST_ANSWER,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_ERROR,
  POST_COMMENT,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
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

describe('ViewQuestions actions', () => {
  describe('getQuestionData Action', () => {
    it('GET_QUESTION_DATA', () => {
      const questionId = 5;
      const expected = {
        type: GET_QUESTION_DATA,
        questionId,
      };
      expect(getQuestionData(questionId)).toEqual(expected);
    });
  });

  describe('getQuestionDataSuccess Action', () => {
    it('GET_QUESTION_DATA_SUCCESS', () => {
      const questionData = 'questionData';
      const expected = {
        type: GET_QUESTION_DATA_SUCCESS,
        questionData,
      };
      expect(getQuestionDataSuccess(questionData)).toEqual(expected);
    });
  });

  describe('getQuestionDataErr Action', () => {
    it('GET_QUESTION_DATA_ERROR', () => {
      const getQuestionDataError = 'getQuestionDataError';
      const expected = {
        type: GET_QUESTION_DATA_ERROR,
        getQuestionDataError,
      };
      expect(getQuestionDataErr(getQuestionDataError)).toEqual(expected);
    });
  });

  describe('postAnswer Action', () => {
    it('POST_ANSWER', () => {
      const user = 'user';
      const questionId = 'questionId';
      const answer = 'answer';
      const reset = 'reset';

      const expected = {
        type: POST_ANSWER,
        user,
        questionId,
        answer,
        reset,
      };
      expect(postAnswer(user, questionId, answer, reset)).toEqual(expected);
    });
  });

  describe('postAnswerSuccess Action', () => {
    it('POST_ANSWER_SUCCESS', () => {
      const questionData = 'questionData';
      const expected = {
        type: POST_ANSWER_SUCCESS,
        questionData,
      };
      expect(postAnswerSuccess(questionData)).toEqual(expected);
    });
  });

  describe('postAnswerErr Action', () => {
    it('POST_ANSWER_ERROR', () => {
      const postAnswerError = 'postAnswerError';
      const expected = {
        type: POST_ANSWER_ERROR,
        postAnswerError,
      };
      expect(postAnswerErr(postAnswerError)).toEqual(expected);
    });
  });

  describe('postComment Action', () => {
    it('POST_COMMENT', () => {
      const user = 'user';
      const questionId = 'questionId';
      const answerId = 'answerId';
      const comment = 'comment';
      const reset = 'reset';

      const expected = {
        type: POST_COMMENT,
        user,
        questionId,
        answerId,
        comment,
        reset,
      };
      expect(postComment(user, questionId, answerId, comment, reset)).toEqual(
        expected,
      );
    });
  });

  describe('postCommentSuccess Action', () => {
    it('POST_COMMENT_SUCCESS', () => {
      const questionData = 'questionData';
      const expected = {
        type: POST_COMMENT_SUCCESS,
        questionData,
      };
      expect(postCommentSuccess(questionData)).toEqual(expected);
    });
  });

  describe('postCommentErr Action', () => {
    it('POST_COMMENT_ERROR', () => {
      const postCommentError = 'postCommentError';
      const expected = {
        type: POST_COMMENT_ERROR,
        postCommentError,
      };
      expect(postCommentErr(postCommentError)).toEqual(expected);
    });
  });

  describe('upVote Action', () => {
    it('UP_VOTE', () => {
      const user = 'user';
      const questionId = 'questionId';
      const answerId = 'answerId';

      const expected = {
        type: UP_VOTE,
        user,
        questionId,
        answerId,
      };
      expect(upVote(user, questionId, answerId)).toEqual(expected);
    });
  });

  describe('upVoteSuccess Action', () => {
    it('UP_VOTE_SUCCESS', () => {
      const questionData = 'questionData';
      const expected = {
        type: UP_VOTE_SUCCESS,
        questionData,
      };
      expect(upVoteSuccess(questionData)).toEqual(expected);
    });
  });

  describe('upVoteErr Action', () => {
    it('UP_VOTE_ERROR', () => {
      const upVoteError = 'upVoteError';
      const expected = {
        type: UP_VOTE_ERROR,
        upVoteError,
      };
      expect(upVoteErr(upVoteError)).toEqual(expected);
    });
  });

  describe('downVote Action', () => {
    it('DOWN_VOTE', () => {
      const user = 'user';
      const questionId = 'questionId';
      const answerId = 'answerId';

      const expected = {
        type: DOWN_VOTE,
        user,
        questionId,
        answerId,
      };
      expect(downVote(user, questionId, answerId)).toEqual(expected);
    });
  });

  describe('downVoteSuccess Action', () => {
    it('DOWN_VOTE_SUCCESS', () => {
      const questionData = 'questionData';
      const expected = {
        type: DOWN_VOTE_SUCCESS,
        questionData,
      };
      expect(downVoteSuccess(questionData)).toEqual(expected);
    });
  });

  describe('downVoteErr Action', () => {
    it('DOWN_VOTE_ERROR', () => {
      const downVoteError = 'downVoteError';
      const expected = {
        type: DOWN_VOTE_ERROR,
        downVoteError,
      };
      expect(downVoteErr(downVoteError)).toEqual(expected);
    });
  });

  describe('markAsAccepted Action', () => {
    it('MARK_AS_ACCEPTED', () => {
      const user = 'user';
      const questionId = 'questionId';
      const correctAnswerId = 'correctAnswerId';

      const expected = {
        type: MARK_AS_ACCEPTED,
        user,
        questionId,
        correctAnswerId,
      };
      expect(markAsAccepted(user, questionId, correctAnswerId)).toEqual(
        expected,
      );
    });
  });

  describe('markAsAcceptedSuccess Action', () => {
    it('MARK_AS_ACCEPTED_SUCCESS', () => {
      const questionData = 'questionData';
      const expected = {
        type: MARK_AS_ACCEPTED_SUCCESS,
        questionData,
      };
      expect(markAsAcceptedSuccess(questionData)).toEqual(expected);
    });
  });

  describe('markAsAcceptedErr Action', () => {
    it('MARK_AS_ACCEPTED_ERROR', () => {
      const markAsAcceptedError = 'markAsAcceptedError';
      const expected = {
        type: MARK_AS_ACCEPTED_ERROR,
        markAsAcceptedError,
      };
      expect(markAsAcceptedErr(markAsAcceptedError)).toEqual(expected);
    });
  });
});
