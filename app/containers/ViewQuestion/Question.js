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
      key={`question${props.questionData.id}`}
      comments={props.questionData.comments}
      content={props.questionData.content.content}
      rating={props.questionData.rating}
      isItWrittenByMe={props.questionData.isItWrittenByMe}
      history={props.questionData.history}
      userInfo={props.questionData.userInfo}
      postTime={props.questionData.post_time}
      votingStatus={props.questionData.votingStatus}
    />
  </div>
);

Question.propTypes = {
  questionData: PropTypes.object,
};

export default Question;
