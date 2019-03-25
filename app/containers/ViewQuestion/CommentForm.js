import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import { blue } from 'style-constants';
import messages from 'common-messages';

import LargeButton from 'components/Button/LargeButton';
import TextareaField from 'components/FormFields/TextareaField';
import { strLength20x1000, required } from 'components/FormFields/validate';

import { TEXTAREA_COMMENT_FORM } from './constants';

const CancelButton = LargeButton.extend`
  background: none;
  border: none;
  box-shadow: none;
  color: ${blue};
`;

/* eslint-disable-next-line */
let CommentForm = /* istanbul ignore next */ ({
  handleSubmit,
  sendComment,
  sendCommentLoading,
  submitButtonId,
  answerId,
  toggleView,
  submitButtonName,
  className,
}) => (
  <form className={className} onSubmit={handleSubmit(sendComment)}>
    <div>
      <Field
        name={TEXTAREA_COMMENT_FORM}
        disabled={sendCommentLoading}
        component={TextareaField}
        validate={[strLength20x1000, required]}
        warn={[strLength20x1000, required]}
      />
    </div>
    <div>
      <LargeButton
        id={`${submitButtonId}${answerId}`}
        disabled={sendCommentLoading}
        typeAttr="submit"
      >
        {submitButtonName}
      </LargeButton>

      <CancelButton onClick={() => toggleView(true)} typeAttr="button">
        <FormattedMessage {...messages.cancel} />
      </CancelButton>
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
  toggleView: PropTypes.func,
  className: PropTypes.string,
};

CommentForm = reduxForm({})(CommentForm);

CommentForm = connect((state, props) => ({
  enableReinitialize: true,
  initialValues: {
    [TEXTAREA_COMMENT_FORM]: props.comment,
  },
}))(CommentForm);

export default React.memo(CommentForm);
