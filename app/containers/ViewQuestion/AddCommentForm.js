import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import AuthenticatedButton from 'containers/AuthenticatedButton';

import { strLength1000, required } from 'components/FormFields/validate';

import TextareaField from 'components/FormFields/TextareaField';

import { TEXTAREA_COMMENT_FORM } from './constants';
import messages from './messages';

const AddCommentForm = props => (
  <div className="add-comment">
    <form onSubmit={props.handleSubmit(props.postComment)}>
      <div>
        <Field
          name={TEXTAREA_COMMENT_FORM}
          disabled={props.postCommentLoading}
          component={TextareaField}
          validate={[strLength1000, required]}
          warn={[strLength1000, required]}
        />
      </div>
      <div>
        <AuthenticatedButton
          isLoading={props.postCommentLoading}
          className="btn btn-secondary"
          content={props.translations[messages.postCommentButton.id]}
          disabled={
            props.invalid || props.submitting || props.postCommentLoading
          }
        />
      </div>
    </form>
  </div>
);

AddCommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  postComment: PropTypes.func,
  postCommentLoading: PropTypes.bool,
  translations: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default reduxForm({})(AddCommentForm);
