import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import { scrollToErrorField } from 'utils/animation';
import { strLength25x30000, required } from 'components/FormFields/validate';

import TextEditorField from 'components/FormFields/TextEditorField';
import Button from 'components/Button/Contained/InfoLarge';
import FormBox from 'components/Form';

import { TEXT_EDITOR_ANSWER_FORM } from './constants';

export const AnswerForm = ({
  handleSubmit,
  sendAnswer,
  sendAnswerLoading,
  sendButtonId,
  submitButtonName,
  label,
  previewLabel,
}) => (
  <FormBox onSubmit={handleSubmit(sendAnswer)}>
    <Field
      name={TEXT_EDITOR_ANSWER_FORM}
      component={TextEditorField}
      disabled={sendAnswerLoading}
      validate={[strLength25x30000, required]}
      warn={[strLength25x30000, required]}
      label={label}
      previewLabel={previewLabel}
    />
    <Button id={sendButtonId} disabled={sendAnswerLoading} type="submit">
      {submitButtonName}
    </Button>
  </FormBox>
);

AnswerForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnswer: PropTypes.func,
  sendButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  label: PropTypes.string,
  previewLabel: PropTypes.string,
  sendAnswerLoading: PropTypes.bool,
};

let FormClone = reduxForm({
  onSubmitFail: errors => scrollToErrorField(errors),
})(AnswerForm);

FormClone = connect((_, props) => ({
  enableReinitialize: true,
  initialValues: {
    [TEXT_EDITOR_ANSWER_FORM]: props.answer,
  },
}))(FormClone);

export default React.memo(FormClone);
