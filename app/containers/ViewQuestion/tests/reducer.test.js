import { fromJS } from 'immutable';

import viewQuestionReducer from '../reducer';

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

describe('viewQuestionReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(viewQuestionReducer(state, {})).toEqual(state);
  });

  it('voteToDelete', () => {
    const obj = state.set('voteToDeleteLoading', true);
    expect(viewQuestionReducer(state, voteToDelete())).toEqual(obj);
  });

  it('voteToDeleteSuccess', () => {
    const questionData = 'questionData';
    const obj = state
      .set('voteToDeleteLoading', false)
      .set('questionData', questionData);

    expect(
      viewQuestionReducer(state, voteToDeleteSuccess(questionData)),
    ).toEqual(obj);
  });

  it('voteToDeleteErr', () => {
    const voteToDeleteError = 'voteToDeleteError';
    const obj = state
      .set('voteToDeleteLoading', false)
      .set('voteToDeleteError', voteToDeleteError);

    expect(
      viewQuestionReducer(state, voteToDeleteErr(voteToDeleteError)),
    ).toEqual(obj);
  });

  it('saveComment', () => {
    const obj = state.set('saveCommentLoading', true);
    expect(viewQuestionReducer(state, saveComment())).toEqual(obj);
  });

  it('saveCommentSuccess', () => {
    const questionData = 'questionData';
    const obj = state
      .set('saveCommentLoading', false)
      .set('questionData', questionData);

    expect(
      viewQuestionReducer(state, saveCommentSuccess(questionData)),
    ).toEqual(obj);
  });

  it('saveCommentErr', () => {
    const saveCommentError = 'saveCommentError';
    const obj = state
      .set('saveCommentLoading', false)
      .set('saveCommentError', saveCommentError);

    expect(
      viewQuestionReducer(state, saveCommentErr(saveCommentError)),
    ).toEqual(obj);
  });

  it('deleteComment', () => {
    const obj = state.set('deleteCommentLoading', true);
    expect(viewQuestionReducer(state, deleteComment())).toEqual(obj);
  });

  it('deleteCommentSuccess', () => {
    const questionData = 'questionData';
    const obj = state
      .set('questionData', questionData)
      .set('deleteCommentLoading', false);

    expect(
      viewQuestionReducer(state, deleteCommentSuccess(questionData)),
    ).toEqual(obj);
  });

  it('deleteCommentErr', () => {
    const deleteCommentError = 'deleteCommentError';
    const obj = state
      .set('deleteCommentLoading', false)
      .set('deleteCommentError', deleteCommentError);

    expect(
      viewQuestionReducer(state, deleteCommentErr(deleteCommentError)),
    ).toEqual(obj);
  });

  it('deleteAnswer', () => {
    const obj = state.set('deleteAnswerLoading', true);
    expect(viewQuestionReducer(state, deleteAnswer())).toEqual(obj);
  });

  it('deleteAnswerSuccess', () => {
    const questionData = 'questionData';
    const obj = state
      .set('questionData', questionData)
      .set('deleteAnswerLoading', false);

    expect(
      viewQuestionReducer(state, deleteAnswerSuccess(questionData)),
    ).toEqual(obj);
  });

  it('deleteAnswerErr', () => {
    const deleteAnswerError = 'deleteAnswerError';
    const obj = state
      .set('deleteAnswerLoading', false)
      .set('deleteAnswerError', deleteAnswerError);

    expect(
      viewQuestionReducer(state, deleteAnswerErr(deleteAnswerError)),
    ).toEqual(obj);
  });

  it('deleteQuestion', () => {
    const obj = state.set('deleteQuestionLoading', true);
    expect(viewQuestionReducer(state, deleteQuestion())).toEqual(obj);
  });

  it('deleteQuestionSuccess', () => {
    const questionData = 'questionData';
    const obj = state.set('deleteQuestionLoading', false);
    expect(
      viewQuestionReducer(state, deleteQuestionSuccess(questionData)),
    ).toEqual(obj);
  });

  it('deleteQuestionErr', () => {
    const deleteQuestionError = 'deleteQuestionError';
    const obj = state
      .set('deleteQuestionLoading', false)
      .set('deleteQuestionError', deleteQuestionError);

    expect(
      viewQuestionReducer(state, deleteQuestionErr(deleteQuestionError)),
    ).toEqual(obj);
  });

  it('getQuestionData', () => {
    const obj = state.set('questionDataLoading', true);
    expect(viewQuestionReducer(state, getQuestionData())).toEqual(obj);
  });

  it('getQuestionDataSuccess', () => {
    const questionData = 'questionData';
    const obj = state
      .set('questionDataLoading', false)
      .set('questionData', questionData);

    expect(
      viewQuestionReducer(state, getQuestionDataSuccess(questionData)),
    ).toEqual(obj);
  });

  it('getQuestionDataErr', () => {
    const getQuestionDataError = 'getQuestionDataError';
    const obj = state
      .set('questionDataLoading', false)
      .set('getQuestionDataError', getQuestionDataError);

    expect(
      viewQuestionReducer(state, getQuestionDataErr(getQuestionDataError)),
    ).toEqual(obj);
  });

  it('postAnswer', () => {
    const obj = state.set('postAnswerLoading', true);
    expect(viewQuestionReducer(state, postAnswer())).toEqual(obj);
  });

  it('postAnswerSuccess', () => {
    const questionData = 'questionData';
    const obj = state
      .set('postAnswerLoading', false)
      .set('questionData', questionData);

    expect(viewQuestionReducer(state, postAnswerSuccess(questionData))).toEqual(
      obj,
    );
  });

  it('postAnswerErr', () => {
    const postAnswerError = 'postAnswerError';
    const obj = state
      .set('postAnswerLoading', false)
      .set('postAnswerError', postAnswerError);

    expect(viewQuestionReducer(state, postAnswerErr(postAnswerError))).toEqual(
      obj,
    );
  });

  it('postComment', () => {
    const obj = state.set('postCommentLoading', true);
    expect(viewQuestionReducer(state, postComment())).toEqual(obj);
  });

  it('postCommentSuccess', () => {
    const questionData = 'questionData';
    const obj = state
      .set('postCommentLoading', false)
      .set('questionData', questionData);

    expect(
      viewQuestionReducer(state, postCommentSuccess(questionData)),
    ).toEqual(obj);
  });

  it('postCommentErr', () => {
    const postCommentError = 'postCommentError';
    const obj = state
      .set('postCommentLoading', false)
      .set('postCommentError', postCommentError);

    expect(
      viewQuestionReducer(state, postCommentErr(postCommentError)),
    ).toEqual(obj);
  });

  it('upVote', () => {
    const obj = state.set('upVoteLoading', true);
    expect(viewQuestionReducer(state, upVote())).toEqual(obj);
  });

  it('upVoteSuccess', () => {
    const questionData = 'questionData';
    const obj = state
      .set('upVoteLoading', false)
      .set('questionData', questionData);

    expect(viewQuestionReducer(state, upVoteSuccess(questionData))).toEqual(
      obj,
    );
  });

  it('upVoteErr', () => {
    const upVoteError = 'upVoteError';
    const obj = state
      .set('upVoteLoading', false)
      .set('upVoteError', upVoteError);

    expect(viewQuestionReducer(state, upVoteErr(upVoteError))).toEqual(obj);
  });

  it('downVote', () => {
    const obj = state.set('downVoteLoading', true);
    expect(viewQuestionReducer(state, downVote())).toEqual(obj);
  });

  it('downVoteSuccess', () => {
    const questionData = 'questionData';
    const obj = state
      .set('downVoteLoading', false)
      .set('questionData', questionData);

    expect(viewQuestionReducer(state, downVoteSuccess(questionData))).toEqual(
      obj,
    );
  });

  it('downVoteErr', () => {
    const downVoteError = 'downVoteError';
    const obj = state
      .set('downVoteLoading', false)
      .set('downVoteError', downVoteError);

    expect(viewQuestionReducer(state, downVoteErr(downVoteError))).toEqual(obj);
  });

  it('markAsAccepted', () => {
    const obj = state.set('markAsAcceptedLoading', true);
    expect(viewQuestionReducer(state, markAsAccepted())).toEqual(obj);
  });

  it('markAsAcceptedSuccess', () => {
    const questionData = 'questionData';
    const obj = state
      .set('markAsAcceptedLoading', false)
      .set('questionData', questionData);

    expect(
      viewQuestionReducer(state, markAsAcceptedSuccess(questionData)),
    ).toEqual(obj);
  });

  it('markAsAcceptedErr', () => {
    const markAsAcceptedError = 'markAsAcceptedError';
    const obj = state
      .set('markAsAcceptedLoading', false)
      .set('markAsAcceptedError', markAsAcceptedError);

    expect(
      viewQuestionReducer(state, markAsAcceptedErr(markAsAcceptedError)),
    ).toEqual(obj);
  });
});
