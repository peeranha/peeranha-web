import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import { strLength25x30000, required } from 'components/FormFields/validate';

import LoadingIndicator from 'components/LoadingIndicator';
import TextEditorField from 'components/FormFields/TextEditorField';

import { TEXT_EDITOR_ANSWER_FORM } from './constants';

/* eslint-disable-next-line */
let AnswerForm = props => (
  <div className="answer-question">
    <form onSubmit={props.handleSubmit(props.sendAnswer)}>
      <h4 className="header text-uppercase">{props.formHeader}</h4>
      <div>
        <Field
          name={TEXT_EDITOR_ANSWER_FORM}
          component={TextEditorField}
          disabled={props.sendAnswerLoading}
          validate={[strLength25x30000, required]}
          warn={[strLength25x30000, required]}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-secondary"
          disabled={props.invalid || props.submitting}
          id={props.sendButtonId}
          style={props.sendAnswerLoading ? { opacity: 0.5 } : null}
        >
          {props.sendAnswerLoading ? (
            <LoadingIndicator />
          ) : (
            props.submitButtonName
          )}
        </button>
      </div>
    </form>
  </div>
);

AnswerForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendAnswer: PropTypes.func,
  formHeader: PropTypes.string,
  sendButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  sendAnswerLoading: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

AnswerForm = reduxForm({})(AnswerForm);

AnswerForm = connect((state, props) => ({
  initialValues: {
    [TEXT_EDITOR_ANSWER_FORM]: props.answer,
  },
}))(AnswerForm);

export default AnswerForm;
