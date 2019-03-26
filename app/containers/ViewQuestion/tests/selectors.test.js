import { fromJS } from 'immutable';
import {
  selectViewQuestionDomain,
  selectQuestionData,
  selectQuestionDataError,
  selectQuestionDataLoading,
  selectPostAnswerError,
  selectPostAnswerLoading,
  selectPostCommentError,
  selectPostCommentLoading,
  selectUpVoteError,
  selectUpVoteLoading,
  selectDownVoteError,
  selectDownVoteLoading,
  selectMarkAsAcceptedError,
  selectMarkAsAcceptedLoading,
  selectDeleteQuestionLoading,
  selectDeleteQuestionError,
  selectDeleteAnswerLoading,
  selectDeleteAnswerError,
  selectDeleteCommentLoading,
  selectDeleteCommentError,
  selectSaveCommentLoading,
  selectSaveCommentError,
  selectVoteToDeleteLoading,
  selectVoteToDeleteError,
} from '../selectors';

describe('selectViewQuestionDomain', () => {
  const questionData = fromJS([]);
  const getQuestionDataError = 'error';
  const questionDataLoading = true;
  const postAnswerError = 'error';
  const postAnswerLoading = true;
  const postCommentError = 'error';
  const postCommentLoading = true;
  const upVoteError = 'error';
  const upVoteLoading = true;
  const downVoteError = 'error';
  const downVoteLoading = true;
  const markAsAcceptedError = 'error';
  const markAsAcceptedLoading = true;
  const deleteQuestionLoading = true;
  const deleteQuestionError = 'error';
  const deleteAnswerLoading = true;
  const deleteAnswerError = 'error';
  const deleteCommentLoading = true;
  const deleteCommentError = 'error';
  const saveCommentLoading = true;
  const saveCommentError = 'error';
  const editComment = 'editComment';
  const voteToDeleteLoading = false;
  const voteToDeleteError = 'voteToDeleteError';

  const globalState = fromJS({
    questionData,
    getQuestionDataError,
    questionDataLoading,
    postAnswerError,
    postAnswerLoading,
    postCommentError,
    postCommentLoading,
    upVoteError,
    upVoteLoading,
    downVoteError,
    downVoteLoading,
    markAsAcceptedError,
    markAsAcceptedLoading,
    deleteQuestionLoading,
    deleteQuestionError,
    deleteAnswerLoading,
    deleteAnswerError,
    deleteCommentLoading,
    deleteCommentError,
    saveCommentLoading,
    saveCommentError,
    editComment,
    voteToDeleteLoading,
    voteToDeleteError,
  });

  const mockedState = fromJS({
    viewQuestion: globalState,
  });

  it('should select the global state', () => {
    expect(selectViewQuestionDomain(mockedState)).toEqual(globalState);
  });

  it('selectVoteToDeleteLoading', () => {
    const isVoteToDeleteLoading = selectVoteToDeleteLoading();
    expect(isVoteToDeleteLoading(mockedState)).toEqual(voteToDeleteLoading);
  });

  it('selectVoteToDeleteError', () => {
    const isVoteToDeleteError = selectVoteToDeleteError();
    expect(isVoteToDeleteError(mockedState)).toEqual(voteToDeleteError);
  });

  it('selectSaveCommentError', () => {
    const isSaveCommentError = selectSaveCommentError();
    expect(isSaveCommentError(mockedState)).toEqual(saveCommentError);
  });

  it('selectSaveCommentLoading', () => {
    const isSaveCommentLoading = selectSaveCommentLoading();
    expect(isSaveCommentLoading(mockedState)).toEqual(saveCommentLoading);
  });

  it('selectDeleteCommentError', () => {
    const isDeleteCommentError = selectDeleteCommentError();
    expect(isDeleteCommentError(mockedState)).toEqual(deleteCommentError);
  });

  it('selectDeleteCommentLoading', () => {
    const isDeleteCommentLoading = selectDeleteCommentLoading();
    expect(isDeleteCommentLoading(mockedState)).toEqual(deleteCommentLoading);
  });

  it('selectDeleteAnswerError', () => {
    const isDeleteAnswerError = selectDeleteAnswerError();
    expect(isDeleteAnswerError(mockedState)).toEqual(deleteAnswerError);
  });

  it('selectDeleteAnswerLoading', () => {
    const isDeleteAnswerLoading = selectDeleteAnswerLoading();
    expect(isDeleteAnswerLoading(mockedState)).toEqual(deleteAnswerLoading);
  });

  it('selectDeleteQuestionError', () => {
    const isDeleteQuestionError = selectDeleteQuestionError();
    expect(isDeleteQuestionError(mockedState)).toEqual(deleteQuestionError);
  });

  it('selectDeleteQuestionLoading', () => {
    const isDeleteQuestionLoading = selectDeleteQuestionLoading();
    expect(isDeleteQuestionLoading(mockedState)).toEqual(deleteQuestionLoading);
  });

  it('selectQuestionData', () => {
    const isQuestionData = selectQuestionData();
    expect(isQuestionData(mockedState)).toEqual(questionData);
  });

  it('selectQuestionDataError', () => {
    const isQuestionDataError = selectQuestionDataError();
    expect(isQuestionDataError(mockedState)).toEqual(getQuestionDataError);
  });

  it('selectQuestionDataLoading', () => {
    const isQuestionDataLoading = selectQuestionDataLoading();
    expect(isQuestionDataLoading(mockedState)).toEqual(questionDataLoading);
  });

  it('selectPostAnswerError', () => {
    const isPostAnswerError = selectPostAnswerError();
    expect(isPostAnswerError(mockedState)).toEqual(postAnswerError);
  });

  it('selectPostAnswerLoading', () => {
    const isPostAnswerLoading = selectPostAnswerLoading();
    expect(isPostAnswerLoading(mockedState)).toEqual(postAnswerLoading);
  });

  it('selectPostCommentError', () => {
    const isPostCommentError = selectPostCommentError();
    expect(isPostCommentError(mockedState)).toEqual(postCommentError);
  });

  it('selectPostCommentLoading', () => {
    const isPostCommentLoading = selectPostCommentLoading();
    expect(isPostCommentLoading(mockedState)).toEqual(postCommentLoading);
  });

  it('selectUpVoteError', () => {
    const isVoteError = selectUpVoteError();
    expect(isVoteError(mockedState)).toEqual(upVoteError);
  });

  it('selectUpVoteLoading', () => {
    const isVoteLoading = selectUpVoteLoading();
    expect(isVoteLoading(mockedState)).toEqual(upVoteLoading);
  });

  it('selectDownVoteError', () => {
    const isDownVoteError = selectDownVoteError();
    expect(isDownVoteError(mockedState)).toEqual(downVoteError);
  });

  it('selectDownVoteLoading', () => {
    const isDownVoteLoading = selectDownVoteLoading();
    expect(isDownVoteLoading(mockedState)).toEqual(downVoteLoading);
  });

  it('selectMarkAsAcceptedError', () => {
    const isMarkAsAcceptedError = selectMarkAsAcceptedError();
    expect(isMarkAsAcceptedError(mockedState)).toEqual(markAsAcceptedError);
  });

  it('selectMarkAsAcceptedLoading', () => {
    const isMarkAsAcceptedLoading = selectMarkAsAcceptedLoading();
    expect(isMarkAsAcceptedLoading(mockedState)).toEqual(markAsAcceptedLoading);
  });
});
