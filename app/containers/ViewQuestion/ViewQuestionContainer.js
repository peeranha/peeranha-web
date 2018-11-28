import React from 'react';
import PropTypes from 'prop-types';
import AnswerForm from 'components/AnswerForm';

import Box from './Box';
import Question from './Question';
import Answers from './Answers';

import { POST_ANSWER_BUTTON, ADD_ANSWER_FORM } from './constants';
import messages from './messages';

const ViewQuestionContainer = props => (
  <Box>
    <Question {...props} />
    <Answers {...props} />
    <AnswerForm
      form={ADD_ANSWER_FORM}
      formHeader={props.translations[messages.yourAnswer.id]}
      sendButtonId={`${POST_ANSWER_BUTTON}${0}`}
      translations={props.translations}
      sendAnswer={props.postAnswer}
      sendAnswerLoading={props.postAnswerLoading}
      submitButtonName={props.translations[messages.postAnswerButton.id]}
    />
  </Box>
);

ViewQuestionContainer.propTypes = {
  translations: PropTypes.object,
  postAnswer: PropTypes.func,
  postAnswerLoading: PropTypes.bool,
};

export default ViewQuestionContainer;
