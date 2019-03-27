import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';
import { QUESTION_TYPE } from './constants';

export const Question = /* istanbul ignore next */ props => (
  <Content
    {...props}
    answerId="0"
    type={QUESTION_TYPE}
    key={`${QUESTION_TYPE}${props.questionData.id}`}
    comments={props.questionData.comments}
    title={props.questionData.content.title}
    content={props.questionData.content.content}
    rating={props.questionData.rating}
    isItWrittenByMe={props.questionData.isItWrittenByMe}
    history={props.questionData.history}
    userInfo={props.questionData.userInfo}
    postTime={props.questionData.post_time}
    lastEditedDate={props.questionData.lastEditedDate}
    votingStatus={props.questionData.votingStatus}
    deleteItem={props.deleteQuestion}
    editItem={props.editQuestion}
    saveComment={props.saveComment}
    deleteComment={props.deleteComment}
    buttonParams={{
      questionId: props.questionData.id,
      answerId: 0,
      whowasvoted: props.questionData.userInfo.user,
    }}
    communities={props.communities}
  />
);

Question.propTypes = {
  questionData: PropTypes.object,
  communities: PropTypes.array,
  deleteQuestion: PropTypes.func,
  editQuestion: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
};

export default React.memo(Question);
