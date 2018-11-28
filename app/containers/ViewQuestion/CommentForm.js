import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import LoadingIndicator from 'components/LoadingIndicator';
import TextareaField from 'components/FormFields/TextareaField';
import { strLength1000, required } from 'components/FormFields/validate';

import { TEXTAREA_COMMENT_FORM } from './constants';

/* eslint-disable-next-line */
let CommentForm = props => (
  <form onSubmit={props.handleSubmit(props.sendComment)}>
    <div>
      <Field
        name={TEXTAREA_COMMENT_FORM}
        disabled={props.sendCommentLoading}
        component={TextareaField}
        validate={[strLength1000, required]}
        warn={[strLength1000, required]}
      />
    </div>
    <div>
      <button
        id={`${props.submitButtonId}${props.answerId}`}
        style={props.sendCommentLoading ? { opacity: 0.5 } : null}
        type="submit"
        className="btn btn-secondary"
        disabled={props.invalid || props.submitting}
      >
        {props.sendCommentLoading ? (
          <LoadingIndicator />
        ) : (
          props.submitButtonName
        )}
      </button>
    </div>
  </form>
);

CommentForm.propTypes = {
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  submitButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  handleSubmit: PropTypes.func,
  sendComment: PropTypes.func,
  sendCommentLoading: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

CommentForm = reduxForm({})(CommentForm);

CommentForm = connect((state, props) => ({
  enableReinitialize: true,
  initialValues: {
    [TEXTAREA_COMMENT_FORM]: props.comment,
  },
}))(CommentForm);

export default CommentForm;
