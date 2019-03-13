import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import NoQuestions from './NoQuestions';
import QuestionsHeader from './QuestionsHeader';
import QuestionsContent from './QuestionsContent';

const QuestionsContainer = props => (
  <div>
    <QuestionsHeader {...props} />
    <QuestionsContent {...props} />

    {!props.questionsList.length &&
      !props.questionsLoading &&
      !props.communitiesLoading && <NoQuestions />}

    {(props.questionsLoading || props.communitiesLoading) && (
      <LoadingIndicator />
    )}
  </div>
);

QuestionsContainer.propTypes = {
  questionsList: PropTypes.array,
  questionsLoading: PropTypes.bool,
  communitiesLoading: PropTypes.bool,
};

export default React.memo(QuestionsContainer);
