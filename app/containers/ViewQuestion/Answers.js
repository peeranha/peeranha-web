import React from 'react';
import PropTypes from 'prop-types';

import AnswersTitle from './AnswersTitle';
import AnswersList from './AnswersList';
import AcceptedAnswer from './AcceptedAnswer';

const Answers = /* istanbul ignore next */ props => {
  const answersList = props.questionData.answers;

  if (!answersList.length) return null;

  return (
    <div>
      <AnswersTitle answersNum={answersList.length} />

      {answersList[0].content && (
        <React.Fragment>
          <AcceptedAnswer {...props} />
          <AnswersList {...props} />
        </React.Fragment>
      )}
    </div>
  );
};

Answers.propTypes = {
  questionData: PropTypes.object,
};

export default React.memo(Answers);
