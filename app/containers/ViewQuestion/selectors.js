import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewQuestion state domain
 */

const selectViewQuestionDomain = state =>
  state.get('viewQuestion', initialState);

const selectEditComment = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('editComment'),
  );

const selectQuestionData = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('questionData'),
  );

const selectQuestionDataError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('getQuestionDataError'),
  );

const selectQuestionDataLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('questionDataLoading'),
  );

const selectPostAnswerError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('postAnswerError'),
  );

const selectPostAnswerLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('postAnswerLoading'),
  );

const selectPostCommentError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('postCommentError'),
  );

const selectPostCommentLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('postCommentLoading'),
  );

const selectUpVoteError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('upVoteError'),
  );

const selectUpVoteLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('upVoteLoading'),
  );

const selectDownVoteError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('downVoteError'),
  );

const selectDownVoteLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('downVoteLoading'),
  );

const selectMarkAsAcceptedError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('markAsAcceptedError'),
  );

const selectMarkAsAcceptedLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('markAsAcceptedLoading'),
  );

const selectDeleteQuestionLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('deleteQuestionLoading'),
  );

const selectDeleteQuestionError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('deleteQuestionError'),
  );

const selectDeleteAnswerLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('deleteAnswerLoading'),
  );

const selectDeleteAnswerError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('deleteAnswerError'),
  );

const selectDeleteCommentLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('deleteCommentLoading'),
  );

const selectDeleteCommentError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('deleteCommentError'),
  );

const selectSaveCommentLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('saveCommentLoading'),
  );

const selectSaveCommentError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('saveCommentError'),
  );

export {
  selectViewQuestionDomain,
  selectEditComment,
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
};
