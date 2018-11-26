import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import LoadingIndicator from 'components/LoadingIndicator';

import {
  strLength30000,
  strLength20x100,
  required,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import TextEditorField from 'components/FormFields/TextEditorField';

import { FORM_TITLE, FORM_CONTENT } from './constants';

import messages from './messages';
import Box from './Box';

/* eslint-disable-next-line */
let QuestionForm = props => (
  <Box onSubmit={props.handleSubmit(props.sendQuestion)}>
    <h4 className="header text-uppercase">{props.formTitle}</h4>
    <div>
      <Field
        name={FORM_TITLE}
        component={TextInputField}
        disabled={props.questionLoading}
        label={props.translations[messages.titleLabel.id]}
        validate={[strLength20x100, required]}
        warn={[strLength20x100, required]}
      />
      <Field
        name={FORM_CONTENT}
        component={TextEditorField}
        disabled={props.questionLoading}
        label={props.translations[messages.contentLabel.id]}
        validate={[strLength30000, required]}
        warn={[strLength30000, required]}
      />
    </div>
    <div>
      <button
        id={props.submitButtonId}
        type="submit"
        className="btn btn-success form-control"
        style={props.questionLoading ? { opacity: 0.5 } : null}
        disabled={props.invalid || props.submitting}
      >
        {props.questionLoading ? <LoadingIndicator /> : props.submitButtonName}
      </button>
    </div>
  </Box>
);

QuestionForm.propTypes = {
  invalid: PropTypes.bool,
  formTitle: PropTypes.string,
  submitButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  sendQuestion: PropTypes.func,
  submitting: PropTypes.bool,
  questionLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  translations: PropTypes.object,
};

QuestionForm = reduxForm({})(QuestionForm);

QuestionForm = connect((state, props) => ({
  initialValues: {
    [FORM_TITLE]: props.questionTitle,
    [FORM_CONTENT]: props.questionContent,
  },
}))(QuestionForm);

export default QuestionForm;
