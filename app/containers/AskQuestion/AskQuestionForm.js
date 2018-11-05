import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from 'components/LoadingIndicator';

import messages from './messages';
import { strLength20, required } from './validate';
import { FORM_TITLE, FORM_CONTENT } from './constants';

import renderTextInput from './renderTextInput';
import renderTextarea from './renderTextarea';

import Box from './Box';

const AskQuestionForm = props => (
  <Box onSubmit={props.handleSubmit(props.postQuestion)}>
    <h4 className="header">
      {props.translations[messages.title.id].toUpperCase()}
    </h4>
    <div>
      <Field
        name={FORM_TITLE}
        component={renderTextInput}
        disabled={props.askQuestionLoading}
        translations={props.translations}
        validate={[strLength20, required]}
        warn={[strLength20, required]}
      />
      <Field
        name={FORM_CONTENT}
        component={renderTextarea}
        disabled={props.askQuestionLoading}
        translations={props.translations}
        handleEditorChange={props.handleEditorChange}
      />
    </div>
    <div>
      <button
        className="btn btn-success form-control"
        disabled={props.invalid || props.submitting || props.askQuestionLoading}
        type="submit"
      >
        {props.askQuestionLoading && <LoadingIndicator />}
        {!props.askQuestionLoading && (
          <FormattedMessage {...messages.postQuestion} />
        )}
      </button>
    </div>
  </Box>
);

AskQuestionForm.propTypes = {
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  askQuestionLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleEditorChange: PropTypes.func.isRequired,
  postQuestion: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'AskQuestionForm',
})(AskQuestionForm);
