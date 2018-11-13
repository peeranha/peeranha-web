import React from 'react';
import PropTypes from 'prop-types';

import QuestionTitle from './QuestionTitle';
import Content from './Content';

const Question = props => (
  <div className="question">
    <QuestionTitle title={props.questionData.content.title} />
    <Content {...props} comments={props.questionData.comments} />
  </div>
);

Question.propTypes = {
  questionData: PropTypes.object,
};

export default Question;
