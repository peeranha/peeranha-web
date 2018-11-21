import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import LoadingIndicator from 'components/LoadingIndicator';

import {
  strLength30000,
  strLength20x100,
  required,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import TextEditorField from 'components/FormFields/TextEditorField';

import messages from './messages';
import { FORM_TITLE, FORM_CONTENT, POST_QUESTION_BUTTON } from './constants';

import Box from './Box';

const AskQuestionForm = props => (
  <Box onSubmit={props.handleSubmit(props.postQuestion)}>
    <h4 className="header text-uppercase">
      {props.translations[messages.title.id]}
    </h4>
    <div>
      <Field
        name={FORM_TITLE}
        component={TextInputField}
        disabled={props.askQuestionLoading}
        label={props.translations[messages.titleLabel.id]}
        validate={[strLength20x100, required]}
        warn={[strLength20x100, required]}
      />
      <Field
        name={FORM_CONTENT}
        component={TextEditorField}
        disabled={props.askQuestionLoading}
        label={props.translations[messages.contentLabel.id]}
        validate={[strLength30000, required]}
        warn={[strLength30000, required]}
      />
    </div>
    <div>
      <button
        id={`${POST_QUESTION_BUTTON}`}
        type="submit"
        className="btn btn-success form-control"
        disabled={props.invalid || props.submitting || props.askQuestionLoading}
      >
        {props.askQuestionLoading ? (
          <LoadingIndicator />
        ) : (
          props.translations[messages.postQuestion.id]
        )}
      </button>
    </div>
  </Box>
);

AskQuestionForm.propTypes = {
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  askQuestionLoading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  postQuestion: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'AskQuestionForm',
})(AskQuestionForm);
