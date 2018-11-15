import React from 'react';
import PropTypes from 'prop-types';

import AnswersTitle from './AnswersTitle';
import AnswersList from './AnswersList';
import AcceptedAnswer from './AcceptedAnswer';

const Answers = props => (
  <div className="answers">
    <AnswersTitle answersNum={props.questionData.answers.length} />
    <AcceptedAnswer {...props} />
    <AnswersList {...props} />
  </div>
);

Answers.propTypes = {
  questionData: PropTypes.object,
};

export default Answers;
