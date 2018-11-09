import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator';

import Box from './Box';
import NoQuestions from './NoQuestions';
import QuestionsHeader from './QuestionsHeader';
import QuestionsContent from './QuestionsContent';

const QuestionsForm = props => (
  <Box>
    <QuestionsHeader {...props} />
    <QuestionsContent {...props} />
    {!props.questionsList.size && <NoQuestions />}
    {props.questionsLoading && <LoadingIndicator />}
  </Box>
);

QuestionsForm.propTypes = {
  questionsList: PropTypes.object,
  questionsLoading: PropTypes.bool,
};

export default QuestionsForm;
