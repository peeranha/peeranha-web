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
  toggleCommentVision,
  deleteQuestion,
  deleteQuestionSuccess,
  deleteQuestionErr,
  deleteAnswer,
  deleteAnswerSuccess,
  deleteAnswerErr,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentErr,
  saveComment,
  saveCommentSuccess,
  saveCommentErr,
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
  TOGGLE_COMMENT_VISION,
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

describe('ViewQuestions actions', () => {
  describe('saveComment Action', () => {
    it('SAVE_COMMENT', () => {
      const user = 'user';
      const questionId = 11;
      const answerId = 12;
      const commentId = 12;
      const comment = 'comment';

      const expected = {
        type: SAVE_COMMENT,
        user,
        questionId,
        answerId,
        commentId,
        comment,
      };

      expect(
        saveComment(user, questionId, answerId, commentId, comment),
      ).toEqual(expected);
    });
  });

  describe('saveCommentSuccess Action', () => {
    it('SAVE_COMMENT_SUCCESS', () => {
      const questionData = 'questionData';
      const expected = {
        type: SAVE_COMMENT_SUCCESS,
        questionData,
      };

      expect(saveCommentSuccess(questionData)).toEqual(expected);
    });
  });

  describe('saveCommentError Action', () => {
    it('SAVE_COMMENT_ERROR', () => {
      const saveCommentError = 'saveCommentError';
      const expected = {
        type: SAVE_COMMENT_ERROR,
        saveCommentError,
      };

      expect(saveCommentErr(saveCommentError)).toEqual(expected);
    });
  });

  describe('deleteComment Action', () => {
    it('DELETE_COMMENT', () => {
      const user = 'user';
      const questionId = 11;
      const answerId = 12;
      const commentId = 12;
      const buttonId = 'postButtonId';

      const expected = {
        type: DELETE_COMMENT,
        user,
        questionId,
        answerId,
        commentId,
        buttonId,
      };

      expect(
        deleteComment(user, questionId, answerId, commentId, buttonId),
      ).toEqual(expected);
    });
  });

  describe('deleteCommentSuccess Action', () => {
    it('DELETE_COMMENT_SUCCESS', () => {
      const questionData = 'questionData';
      const expected = {
        type: DELETE_COMMENT_SUCCESS,
        questionData,
      };

      expect(deleteCommentSuccess(questionData)).toEqual(expected);
    });
  });

  describe('deleteCommentErr Action', () => {
    it('DELETE_COMMENT_ERROR', () => {
      const deleteCommentError = 'deleteCommentError';
      const expected = {
        type: DELETE_COMMENT_ERROR,
        deleteCommentError,
      };

      expect(deleteCommentErr(deleteCommentError)).toEqual(expected);
    });
  });

  describe('deleteAnswer Action', () => {
    it('DELETE_ANSWER', () => {
      const user = 'user';
      const questionid = 11;
      const answerid = 12;
      const postButtonId = 'postButtonId';

      const expected = {
        type: DELETE_ANSWER,
        user,
        questionid,
        answerid,
        postButtonId,
      };

      expect(deleteAnswer(user, questionid, answerid, postButtonId)).toEqual(
        expected,
      );
    });
  });

  describe('deleteAnswerSuccess Action', () => {
    it('DELETE_ANSWER_SUCCESS', () => {
      const questionData = 'questionData';
      const expected = {
        type: DELETE_ANSWER_SUCCESS,
        questionData,
      };

      expect(deleteAnswerSuccess(questionData)).toEqual(expected);
    });
  });

  describe('deleteAnswerErr Action', () => {
    it('DELETE_ANSWER_ERROR', () => {
      const deleteAnswerError = 'deleteAnswerError';
      const expected = {
        type: DELETE_ANSWER_ERROR,
        deleteAnswerError,
      };

      expect(deleteAnswerErr(deleteAnswerError)).toEqual(expected);
    });
  });

  describe('deleteQuestion Action', () => {
    it('DELETE_QUESTION', () => {
      const user = 'user';
      const questionid = 11;
      const postButtonId = 'postButtonId';

      const expected = {
        type: DELETE_QUESTION,
        user,
        questionid,
        postButtonId,
      };

      expect(deleteQuestion(user, questionid, postButtonId)).toEqual(expected);
    });
  });

  describe('deleteQuestionSuccess Action', () => {
    it('DELETE_QUESTION_SUCCESS', () => {
      const expected = {
        type: DELETE_QUESTION_SUCCESS,
      };

      expect(deleteQuestionSuccess()).toEqual(expected);
    });
  });

  describe('deleteQuestionErr Action', () => {
    it('DELETE_QUESTION_ERROR', () => {
      const deleteQuestionError = 'deleteQuestionError';
      const expected = {
        type: DELETE_QUESTION_ERROR,
        deleteQuestionError,
      };

      expect(deleteQuestionErr(deleteQuestionError)).toEqual(expected);
    });
  });

  describe('toggleCommentVision Action', () => {
    it('TOGGLE_COMMENT_VISION', () => {
      const editComment = 'editComment';
      const expected = {
        type: TOGGLE_COMMENT_VISION,
        editComment,
      };
      expect(toggleCommentVision(editComment)).toEqual(expected);
    });
  });

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
      const postButtonId = 'postButtonId';
      const translations = null;

      const expected = {
        type: POST_ANSWER,
        user,
        questionId,
        answer,
        reset,
        postButtonId,
        translations,
      };

      expect(
        postAnswer(user, questionId, answer, reset, postButtonId, translations),
      ).toEqual(expected);
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
      const postButtonId = 'postButtonId';
      const translations = null;

      const expected = {
        type: POST_COMMENT,
        user,
        questionId,
        answerId,
        comment,
        reset,
        postButtonId,
        translations,
      };
      expect(
        postComment(
          user,
          questionId,
          answerId,
          comment,
          reset,
          postButtonId,
          translations,
        ),
      ).toEqual(expected);
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
      const postButtonId = 'postButtonId';
      const translations = null;

      const expected = {
        type: UP_VOTE,
        user,
        questionId,
        answerId,
        postButtonId,
        translations,
      };
      expect(
        upVote(user, questionId, answerId, postButtonId, translations),
      ).toEqual(expected);
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
      const postButtonId = 'postButtonId';
      const translations = null;

      const expected = {
        type: DOWN_VOTE,
        user,
        questionId,
        answerId,
        postButtonId,
        translations,
      };
      expect(
        downVote(user, questionId, answerId, postButtonId, translations),
      ).toEqual(expected);
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
      const postButtonId = 'postButtonId';
      const translations = null;

      const expected = {
        type: MARK_AS_ACCEPTED,
        user,
        questionId,
        correctAnswerId,
        postButtonId,
        translations,
      };
      expect(
        markAsAccepted(
          user,
          questionId,
          correctAnswerId,
          postButtonId,
          translations,
        ),
      ).toEqual(expected);
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
