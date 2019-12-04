import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import { scrollToErrorField } from 'utils/animation';
import { strLength25x30000, required } from 'components/FormFields/validate';

import TextEditorField from 'components/FormFields/TextEditorField';
import LargeButton from 'components/Button/Contained/InfoLarge';
import FormBox from 'components/Form';

import { TEXT_EDITOR_ANSWER_FORM } from './constants';

export const AnswerForm = ({
  handleSubmit,
  sendAnswer,
  sendAnswerLoading,
  sendButtonId,
  submitButtonName,
}) => (
  <FormBox onSubmit={handleSubmit(sendAnswer)}>
    <Field
      name={TEXT_EDITOR_ANSWER_FORM}
      component={TextEditorField}
      disabled={sendAnswerLoading}
      validate={[strLength25x30000, required]}
      warn={[strLength25x30000, required]}
    />
    <LargeButton id={sendButtonId} disabled={sendAnswerLoading} type="submit">
      {submitButtonName}
    </LargeButton>
  </FormBox>
);

AnswerForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnswer: PropTypes.func,
  sendButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
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
