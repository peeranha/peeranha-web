import React from 'react';
import PropTypes from 'prop-types';

const QuestionTitle = props => (
  <h3 className="question-title">{props.title}</h3>
);

QuestionTitle.propTypes = {
  title: PropTypes.string,
};

export default QuestionTitle;
