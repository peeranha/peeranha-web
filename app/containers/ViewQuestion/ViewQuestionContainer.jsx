import React from 'react';
import PropTypes from 'prop-types';
import { translationMessages } from 'i18n';
import commonMessages from 'common-messages';

import AnswerForm from 'components/AnswerForm';
import Base from 'components/Base/BaseRounded';

import Question from './Question';
import Answers from './Answers';

import messages from './messages';

import { POST_ANSWER_BUTTON, ADD_ANSWER_FORM } from './constants';

export const ViewQuestionContainer = props => {
  const msg = translationMessages[props.locale];

  return (
    <article>
      <Question {...props} />
      <Answers {...props} />

      <Base className="mt-3">
        <AnswerForm
          form={ADD_ANSWER_FORM}
          formHeader={msg[messages.yourAnswer.id]}
          sendButtonId={POST_ANSWER_BUTTON}
          sendAnswer={props.postAnswer}
          sendAnswerLoading={props.postAnswerLoading}
          submitButtonName={msg[messages.postAnswerButton.id]}
          previewLabel={msg[commonMessages.preview.id]}
        />
      </Base>
    </article>
  );
};

ViewQuestionContainer.propTypes = {
  postAnswer: PropTypes.func,
  postAnswerLoading: PropTypes.bool,
  locale: PropTypes.string,
  translations: PropTypes.object,
};

export default React.memo(ViewQuestionContainer);
