import React from 'react';
import PropTypes from 'prop-types';

import AnswerForm from 'components/AnswerForm';
import Base from 'components/Base/BaseRounded';

import Question from './Question';
import Answers from './Answers';

import messages from './messages';

import {
  POST_ANSWER_BUTTON,
  ADD_ANSWER_FORM,
  QUESTION_IS_RENDERED_ID,
} from './constants';

export const ViewQuestionContainer = props => (
  <article id={QUESTION_IS_RENDERED_ID}>
    <Question {...props} />
    <Answers {...props} />

    <Base className="mt-3">
      <AnswerForm
        form={ADD_ANSWER_FORM}
        formHeader={props.translations[messages.yourAnswer.id]}
        sendButtonId={`${POST_ANSWER_BUTTON}${0}`}
        sendAnswer={props.postAnswer}
        sendAnswerLoading={props.postAnswerLoading}
        submitButtonName={props.translations[messages.postAnswerButton.id]}
      />
    </Base>
  </article>
);

ViewQuestionContainer.propTypes = {
  postAnswer: PropTypes.func,
  postAnswerLoading: PropTypes.bool,
  translations: PropTypes.object,
};

export default React.memo(ViewQuestionContainer);
