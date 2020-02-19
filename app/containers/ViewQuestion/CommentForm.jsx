import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import messages from 'common-messages';

import InfoButton from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/TransparentLarge';
import TextareaField from 'components/FormFields/TextareaField';
import { strLength1x1000, required } from 'components/FormFields/validate';

import { TEXTAREA_COMMENT_FORM } from './constants';

const CommentForm = ({
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
        validate={[strLength1x1000, required]}
        warn={[strLength1x1000, required]}
      />
    </div>
    <div>
      <InfoButton
        id={`${submitButtonId}${answerId}`}
        disabled={sendCommentLoading}
        typeAttr="submit"
      >
        {submitButtonName}
      </InfoButton>

      <TransparentButton
        disabled={sendCommentLoading}
        onClick={() => toggleView(true)}
        typeAttr="button"
      >
        <FormattedMessage {...messages.cancel} />
      </TransparentButton>
    </div>
  </form>
);

CommentForm.propTypes = {
  answerId: PropTypes.number,
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

let Form = reduxForm({})(CommentForm);

Form = connect((_, props) => ({
  enableReinitialize: true,
  initialValues: {
    [TEXTAREA_COMMENT_FORM]: props.comment,
  },
}))(Form);

export default React.memo(Form);
