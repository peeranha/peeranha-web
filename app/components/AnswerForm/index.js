import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import { strLength25x30000, required } from 'components/FormFields/validate';

import TextEditorField from 'components/FormFields/TextEditorField';
import LargeButton from 'components/Button/Contained/InfoLarge';

import { TEXT_EDITOR_ANSWER_FORM } from './constants';

/* eslint-disable-next-line */
export let AnswerForm = /* istanbul ignore next */ ({
  handleSubmit,
  sendAnswer,
  sendAnswerLoading,
  sendButtonId,
  submitButtonName,
}) => (
  <form onSubmit={handleSubmit(sendAnswer)}>
    <div>
      <Field
        name={TEXT_EDITOR_ANSWER_FORM}
        component={TextEditorField}
        disabled={sendAnswerLoading}
        validate={[strLength25x30000, required]}
        warn={[strLength25x30000, required]}
      />
    </div>
    <div>
      <LargeButton
        id={sendButtonId}
        className="my-3"
        disabled={sendAnswerLoading}
        typeAttr="submit"
      >
        {submitButtonName}
      </LargeButton>
    </div>
  </form>
);

AnswerForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnswer: PropTypes.func,
  sendButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  sendAnswerLoading: PropTypes.bool,
};

AnswerForm = reduxForm({})(AnswerForm);

AnswerForm = connect((state, props) => ({
  initialValues: {
    [TEXT_EDITOR_ANSWER_FORM]: props.answer,
  },
}))(AnswerForm);

export default React.memo(AnswerForm);
