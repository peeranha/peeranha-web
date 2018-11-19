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
