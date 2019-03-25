import React from 'react';
import PropTypes from 'prop-types';

import AnswerForm from 'components/AnswerForm';
import Base from 'components/Base/BaseRounded';

import Question from './Question';
import Answers from './Answers';

import { POST_ANSWER_BUTTON, ADD_ANSWER_FORM } from './constants';
import messages from './messages';

const ViewQuestionContainer = props => (
  <div>
    <Question {...props} />
    <Answers {...props} />

    <Base className="mt-5">
      <AnswerForm
        form={ADD_ANSWER_FORM}
        formHeader={props.translations[messages.yourAnswer.id]}
        sendButtonId={`${POST_ANSWER_BUTTON}${0}`}
        sendAnswer={props.postAnswer}
        sendAnswerLoading={props.postAnswerLoading}
        submitButtonName={props.translations[messages.postAnswerButton.id]}
      />
    </Base>
  </div>
);

ViewQuestionContainer.propTypes = {
  postAnswer: PropTypes.func,
  postAnswerLoading: PropTypes.bool,
  translations: PropTypes.object,
};

export default ViewQuestionContainer;
