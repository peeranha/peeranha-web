import React from 'react';
import PropTypes from 'prop-types';

import QuestionTitle from './QuestionTitle';
import Content from './Content';

const Question = props => (
  <div className="question">
    <QuestionTitle title={props.questionData.content.title} />
    <Content
      {...props}
      answerId="0"
      type="question"
      key={`question${props.questionData.id}`}
      comments={props.questionData.comments}
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
      editComment={props.editComment}
      saveComment={props.saveComment}
      editCommentState={props.editCommentState}
      deleteComment={props.deleteComment}
      buttonParams={{
        questionId: props.questionData.id,
        answerId: 0,
      }}
    />
  </div>
);

Question.propTypes = {
  questionData: PropTypes.object,
  editCommentState: PropTypes.object,
  deleteQuestion: PropTypes.func,
  editQuestion: PropTypes.func,
  editComment: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
};

export default Question;
