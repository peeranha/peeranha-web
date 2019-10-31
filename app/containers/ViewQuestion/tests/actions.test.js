import { TEXT_EDITOR_ANSWER_FORM } from 'components/AnswerForm/constants';

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
  voteToDelete,
  voteToDeleteSuccess,
  voteToDeleteErr,
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
  TEXTAREA_COMMENT_FORM,
} from '../constants';

const ev = {
  currentTarget: {
    id: '',
    dataset: {},
  },
};

const val = new Map();

const props = {
  reset: jest.fn(),
  toggleView: jest.fn(),
  commentId: '',
  answerId: '',
};

const questionId = 11;

describe('ViewQuestions actions', () => {
  it('VOTE_TO_DELETE', () => {
    const expected = {
      type: VOTE_TO_DELETE,
      questionId,
      answerId: ev.currentTarget.dataset.answerid,
      commentId: ev.currentTarget.dataset.commentid,
      postButtonId: ev.currentTarget.id,
      whoWasVoted: ev.currentTarget.dataset.whowasvoted,
    };

    expect(voteToDelete(questionId, ev)).toEqual(expected);
  });

  it('VOTE_TO_DELETE_SUCCESS', () => {
    const questionData = 'questionData';
    const expected = {
      type: VOTE_TO_DELETE_SUCCESS,
      questionData,
    };

    expect(voteToDeleteSuccess(questionData)).toEqual(expected);
  });

  it('VOTE_TO_DELETE_ERROR', () => {
    const voteToDeleteError = 'voteToDeleteError';
    const expected = {
      type: VOTE_TO_DELETE_ERROR,
      voteToDeleteError,
    };

    expect(voteToDeleteErr(voteToDeleteError)).toEqual(expected);
  });

  it('SAVE_COMMENT', () => {
    const expected = {
      type: SAVE_COMMENT,
      questionId,
      answerId: props.answerId,
      commentId: props.commentId,
      comment: val.get(TEXTAREA_COMMENT_FORM),
      toggleView: props.toggleView,
    };

    expect(saveComment(questionId, val, null, props)).toEqual(expected);
  });

  it('SAVE_COMMENT_SUCCESS', () => {
    const questionData = 'questionData';
    const expected = {
      type: SAVE_COMMENT_SUCCESS,
      questionData,
    };

    expect(saveCommentSuccess(questionData)).toEqual(expected);
  });

  it('SAVE_COMMENT_ERROR', () => {
    const saveCommentError = 'saveCommentError';
    const expected = {
      type: SAVE_COMMENT_ERROR,
      saveCommentError,
    };

    expect(saveCommentErr(saveCommentError)).toEqual(expected);
  });

  it('DELETE_COMMENT', () => {
    const expected = {
      type: DELETE_COMMENT,
      questionId,
      answerId: ev.currentTarget.dataset.answerid,
      commentId: ev.currentTarget.dataset.commentid,
      buttonId: ev.currentTarget.id,
    };

    expect(deleteComment(questionId, ev)).toEqual(expected);
  });

  it('DELETE_COMMENT_SUCCESS', () => {
    const questionData = 'questionData';
    const expected = {
      type: DELETE_COMMENT_SUCCESS,
      questionData,
    };

    expect(deleteCommentSuccess(questionData)).toEqual(expected);
  });

  it('DELETE_COMMENT_ERROR', () => {
    const deleteCommentError = 'deleteCommentError';
    const expected = {
      type: DELETE_COMMENT_ERROR,
      deleteCommentError,
    };

    expect(deleteCommentErr(deleteCommentError)).toEqual(expected);
  });

  it('DELETE_ANSWER', () => {
    const expected = {
      type: DELETE_ANSWER,
      questionId,
      answerId: ev.currentTarget.dataset.answerid,
      postButtonId: ev.currentTarget.id,
    };

    expect(deleteAnswer(questionId, ev)).toEqual(expected);
  });

  it('DELETE_ANSWER_SUCCESS', () => {
    const questionData = 'questionData';
    const expected = {
      type: DELETE_ANSWER_SUCCESS,
      questionData,
    };

    expect(deleteAnswerSuccess(questionData)).toEqual(expected);
  });

  it('DELETE_ANSWER_ERROR', () => {
    const deleteAnswerError = 'deleteAnswerError';
    const expected = {
      type: DELETE_ANSWER_ERROR,
      deleteAnswerError,
    };

    expect(deleteAnswerErr(deleteAnswerError)).toEqual(expected);
  });

  it('DELETE_QUESTION', () => {
    const expected = {
      type: DELETE_QUESTION,
      questionId,
      postButtonId: ev.currentTarget.id,
    };

    expect(deleteQuestion(questionId, ev)).toEqual(expected);
  });

  it('DELETE_QUESTION_SUCCESS', () => {
    const expected = {
      type: DELETE_QUESTION_SUCCESS,
    };

    expect(deleteQuestionSuccess()).toEqual(expected);
  });

  it('DELETE_QUESTION_ERROR', () => {
    const deleteQuestionError = 'deleteQuestionError';
    const expected = {
      type: DELETE_QUESTION_ERROR,
      deleteQuestionError,
    };

    expect(deleteQuestionErr(deleteQuestionError)).toEqual(expected);
  });

  it('GET_QUESTION_DATA', () => {
    const expected = {
      type: GET_QUESTION_DATA,
      questionId,
    };

    expect(getQuestionData(questionId)).toEqual(expected);
  });

  it('GET_QUESTION_DATA_SUCCESS', () => {
    const questionData = 'questionData';
    const expected = {
      type: GET_QUESTION_DATA_SUCCESS,
      questionData,
    };
    expect(getQuestionDataSuccess(questionData)).toEqual(expected);
  });

  it('GET_QUESTION_DATA_ERROR', () => {
    const getQuestionDataError = 'getQuestionDataError';
    const expected = {
      type: GET_QUESTION_DATA_ERROR,
      getQuestionDataError,
    };
    expect(getQuestionDataErr(getQuestionDataError)).toEqual(expected);
  });

  it('POST_ANSWER', () => {
    const expected = {
      type: POST_ANSWER,
      questionId,
      answer: val.get(TEXT_EDITOR_ANSWER_FORM),
      reset: props.reset,
    };

    expect(postAnswer(questionId, val, null, props)).toEqual(expected);
  });

  it('POST_ANSWER_SUCCESS', () => {
    const expected = {
      type: POST_ANSWER_SUCCESS,
    };
    expect(postAnswerSuccess()).toEqual(expected);
  });

  it('POST_ANSWER_ERROR', () => {
    const postAnswerError = 'postAnswerError';
    const expected = {
      type: POST_ANSWER_ERROR,
      postAnswerError,
    };
    expect(postAnswerErr(postAnswerError)).toEqual(expected);
  });

  it('POST_COMMENT', () => {
    const expected = {
      type: POST_COMMENT,
      questionId,
      answerId: props.answerId,
      comment: val.get(TEXTAREA_COMMENT_FORM),
      reset: props.reset,
      toggleView: props.toggleView,
    };

    expect(postComment(questionId, val, null, props)).toEqual(expected);
  });

  it('POST_COMMENT_SUCCESS', () => {
    const expected = {
      type: POST_COMMENT_SUCCESS,
    };
    expect(postCommentSuccess()).toEqual(expected);
  });

  it('POST_COMMENT_ERROR', () => {
    const postCommentError = 'postCommentError';
    const expected = {
      type: POST_COMMENT_ERROR,
      postCommentError,
    };
    expect(postCommentErr(postCommentError)).toEqual(expected);
  });

  it('UP_VOTE', () => {
    const expected = {
      type: UP_VOTE,
      questionId,
      answerId: ev.currentTarget.dataset.answerid,
      postButtonId: ev.currentTarget.id,
      whoWasUpvoted: ev.currentTarget.dataset.whowasupvoted,
    };
    expect(upVote(questionId, ev)).toEqual(expected);
  });

  it('UP_VOTE_SUCCESS', () => {
    const questionData = 'questionData';
    const expected = {
      type: UP_VOTE_SUCCESS,
      questionData,
    };
    expect(upVoteSuccess(questionData)).toEqual(expected);
  });

  it('UP_VOTE_ERROR', () => {
    const upVoteError = 'upVoteError';
    const expected = {
      type: UP_VOTE_ERROR,
      upVoteError,
    };
    expect(upVoteErr(upVoteError)).toEqual(expected);
  });

  it('DOWN_VOTE', () => {
    const expected = {
      type: DOWN_VOTE,
      questionId,
      answerId: ev.currentTarget.dataset.answerid,
      postButtonId: ev.currentTarget.id,
      whoWasDownvoted: ev.currentTarget.dataset.whowasdownvoted,
    };
    expect(downVote(questionId, ev)).toEqual(expected);
  });

  it('DOWN_VOTE_SUCCESS', () => {
    const questionData = 'questionData';
    const expected = {
      type: DOWN_VOTE_SUCCESS,
      questionData,
    };
    expect(downVoteSuccess(questionData)).toEqual(expected);
  });

  it('DOWN_VOTE_ERROR', () => {
    const downVoteError = 'downVoteError';
    const expected = {
      type: DOWN_VOTE_ERROR,
      downVoteError,
    };
    expect(downVoteErr(downVoteError)).toEqual(expected);
  });

  it('MARK_AS_ACCEPTED', () => {
    const expected = {
      type: MARK_AS_ACCEPTED,
      questionId,
      correctAnswerId: ev.currentTarget.dataset.answerid,
      postButtonId: ev.currentTarget.id,
      whoWasAccepted: ev.currentTarget.dataset.whowasaccepted,
    };
    expect(markAsAccepted(questionId, ev)).toEqual(expected);
  });

  it('MARK_AS_ACCEPTED_SUCCESS', () => {
    const questionData = 'questionData';
    const expected = {
      type: MARK_AS_ACCEPTED_SUCCESS,
      questionData,
    };
    expect(markAsAcceptedSuccess(questionData)).toEqual(expected);
  });

  it('MARK_AS_ACCEPTED_ERROR', () => {
    const markAsAcceptedError = 'markAsAcceptedError';
    const expected = {
      type: MARK_AS_ACCEPTED_ERROR,
      markAsAcceptedError,
    };
    expect(markAsAcceptedErr(markAsAcceptedError)).toEqual(expected);
  });
});
