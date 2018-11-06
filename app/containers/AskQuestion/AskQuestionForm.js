import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import AuthenticatedButton from 'containers/AuthenticatedButton';

import { strLength20, required } from 'components/RenderFields/validate';
import renderTextInput from 'components/RenderFields/renderTextInput';
import renderTextEditor from 'components/RenderFields/renderTextEditor';

import messages from './messages';
import { FORM_TITLE, FORM_CONTENT } from './constants';

import Box from './Box';

const AskQuestionForm = props => (
  <Box onSubmit={props.handleSubmit(props.postQuestion)}>
    <h4 className="header text-uppercase">
      {props.translations[messages.title.id]}
    </h4>
    <div>
      <Field
        name={FORM_TITLE}
        component={renderTextInput}
        disabled={props.askQuestionLoading}
        label={props.translations[messages.titleLabel.id]}
        validate={[strLength20, required]}
        warn={[strLength20, required]}
      />
      <Field
        name={FORM_CONTENT}
        component={renderTextEditor}
        disabled={props.askQuestionLoading}
        label={props.translations[messages.contentLabel.id]}
      />
    </div>
    <div>
      <AuthenticatedButton
        userIsInSystem={props.userIsInSystem}
        buttonClass="btn btn-success form-control"
        buttonContent={props.translations[messages.postQuestion.id]}
        isLoading={props.askQuestionLoading}
        disabled={props.invalid || props.submitting || props.askQuestionLoading}
        buttonType="submit"
      />
    </div>
  </Box>
);

AskQuestionForm.propTypes = {
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  askQuestionLoading: PropTypes.bool.isRequired,
  userIsInSystem: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  postQuestion: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'AskQuestionForm',
})(AskQuestionForm);
