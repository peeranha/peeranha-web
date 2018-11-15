import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import { strLength30000, required } from 'components/FormFields/validate';

import AuthenticatedButton from 'containers/AuthenticatedButton';
import TextEditorField from 'components/FormFields/TextEditorField';

import { ADD_ANSWER_FORM, TEXT_EDITOR_ANSWER_FORM } from './constants';
import messages from './messages';

const AnswerQuestionForm = props => (
  <div className="answer-question">
    <form onSubmit={props.handleSubmit(props.postAnswer)}>
      <div>
        <Field
          name={TEXT_EDITOR_ANSWER_FORM}
          component={TextEditorField}
          disabled={props.postAnswerLoading}
          label={props.translations[messages.yourAnswer.id]}
          validate={[strLength30000, required]}
          warn={[strLength30000, required]}
        />
      </div>
      <div>
        <AuthenticatedButton
          isLoading={props.postAnswerLoading}
          className="btn btn-secondary"
          buttonContent={props.translations[messages.postAnswerButton.id]}
          disabled={
            props.invalid || props.submitting || props.postAnswerLoading
          }
          type="submit"
        />
      </div>
    </form>
  </div>
);

AnswerQuestionForm.propTypes = {
  handleSubmit: PropTypes.func,
  postAnswer: PropTypes.func,
  postAnswerLoading: PropTypes.bool,
  translations: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: ADD_ANSWER_FORM,
})(AnswerQuestionForm);
