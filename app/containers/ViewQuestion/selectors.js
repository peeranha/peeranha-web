import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

/**
 * Direct selector to the viewQuestion state domain
 */

const selectViewQuestionDomain = state =>
  state.get('viewQuestion', initialState);

const selectQuestionData = () =>
  createSelector(
    selectViewQuestionDomain,
    makeSelectProfileInfo(),
    (substate, profileInfo) => {
      const questionData = substate.get('questionData');
      if (!questionData || !profileInfo) {
        return questionData;
      }

      // update profile question data if profile itself has updated
      const { userInfo, answers } = questionData;
      const { user, rating } = profileInfo;

      answers.forEach(answer => {
        const { comments, userInfo: answerUserInfo } = answer;
        if (answerUserInfo.user === user && answerUserInfo.rating !== rating) {
          answerUserInfo.rating = rating;
        }
        comments.forEach(comment => {
          const { userInfo: commentUserInfo } = comment;
          if (
            commentUserInfo.user === user &&
            commentUserInfo.rating !== rating
          ) {
            commentUserInfo.rating = rating;
          }
        });
      });

      if (
        userInfo.user === profileInfo.user &&
        userInfo.rating !== profileInfo.rating
      ) {
        return {
          ...questionData,
          userInfo: profileInfo,
        };
      }

      return questionData;
    },
  );

export const selectAnswer = answerId =>
  createSelector(
    selectViewQuestionDomain,
    substate =>
      substate.toJS().questionData
        ? substate.toJS().questionData.answers.find(x => x.id === answerId)
        : null,
  );

export const selectComment = (answerId, commentId) =>
  createSelector(selectViewQuestionDomain, substate => {
    const { questionData } = substate.toJS();

    if (!questionData) return null;

    // comments of question
    if (answerId === 0)
      return questionData.comments.filter(x => x.id === commentId)[0];

    // comments of answer
    const answer = questionData.answers.filter(x => x.id === answerId)[0];

    if (!answer) return null;

    return answer.comments.filter(x => x.id === commentId)[0];
  });

const selectQuestionBounty = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('questionBounty'),
  );

const selectIsAnotherCommQuestion = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('isAnotherCommQuestion'),
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

const selectAddCommentFormDisplay = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('addCommentFormDisplay').toJS(),
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

const selectVoteToDeleteLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('voteToDeleteLoading'),
  );

const selectVoteToDeleteError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('voteToDeleteError'),
  );

const selectChangeQuestionTypeLoading = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('changeQuestionTypeLoading'),
  );

const selectChangeQuestionTypeError = () =>
  createSelector(selectViewQuestionDomain, substate =>
    substate.get('changeQuestionTypeError'),
  );

const selectIds = () =>
  createSelector(selectViewQuestionDomain, substate => [
    ...substate.toJS().ids,
  ]);

export {
  selectViewQuestionDomain,
  selectQuestionData,
  selectQuestionBounty,
  selectIsAnotherCommQuestion,
  selectQuestionDataError,
  selectQuestionDataLoading,
  selectPostAnswerError,
  selectPostAnswerLoading,
  selectPostCommentError,
  selectPostCommentLoading,
  selectAddCommentFormDisplay,
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
  selectChangeQuestionTypeLoading,
  selectChangeQuestionTypeError,
  selectIds,
};
