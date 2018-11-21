import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import LoadingIndicator from 'components/LoadingIndicator';
import TextareaField from 'components/FormFields/TextareaField';
import { strLength1000, required } from 'components/FormFields/validate';

import { TEXTAREA_COMMENT_FORM, POST_COMMENT_BUTTON } from './constants';
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
        <button
          id={`${POST_COMMENT_BUTTON}${props.answerId}`}
          type="submit"
          className="btn btn-secondary"
          disabled={
            props.invalid || props.submitting || props.postCommentLoading
          }
        >
          {props.postCommentLoading ? (
            <LoadingIndicator />
          ) : (
            props.translations[messages.postCommentButton.id]
          )}
        </button>
      </div>
    </form>
  </div>
);

AddCommentForm.propTypes = {
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleSubmit: PropTypes.func,
  postComment: PropTypes.func,
  postCommentLoading: PropTypes.bool,
  translations: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default reduxForm({})(AddCommentForm);
