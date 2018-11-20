import React from 'react';
import PropTypes from 'prop-types';

import Box from './Box';
import Question from './Question';
import Answers from './Answers';
import AnswerQuestionForm from './AnswerQuestionForm';

const ViewQuestionContainer = props => (
  <Box>
    <Question {...props} />
    <Answers {...props} />
    <AnswerQuestionForm
      translations={props.translations}
      postAnswer={props.postAnswer}
      postAnswerLoading={props.postAnswerLoading}
    />
  </Box>
);

ViewQuestionContainer.propTypes = {
  translations: PropTypes.object,
  postAnswer: PropTypes.func,
  postAnswerLoading: PropTypes.bool,
};

export default ViewQuestionContainer;
