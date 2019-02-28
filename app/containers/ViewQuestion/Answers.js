import React from 'react';
import PropTypes from 'prop-types';

import AnswersTitle from './AnswersTitle';
import AnswersList from './AnswersList';
import AcceptedAnswer from './AcceptedAnswer';

const Answers = props => {
  const answersList = props.questionData.answers;

  if (!answersList.length) return null;

  return (
    <div className="answers">
      <AnswersTitle
        translations={props.translations}
        answersNum={answersList.length}
      />
      {answersList[0].content && [
        <AcceptedAnswer key="accepted-answer" {...props} />,
        <AnswersList key="answer-list" {...props} />,
      ]}
    </div>
  );
};

Answers.propTypes = {
  questionData: PropTypes.object,
  translations: PropTypes.object,
};

export default Answers;
