import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import LoadingIndicator from 'components/LoadingIndicator';

import {
  strLength25x30000,
  strLength15x100,
  strLength1x5,
  required,
} from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import TextEditorField from 'components/FormFields/TextEditorField';
import SelectField from 'components/FormFields/SelectField';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
} from './constants';

import messages from './messages';
import Box from './Box';

/* eslint-disable-next-line */
let QuestionForm = ({
  sendQuestion,
  formTitle,
  questionLoading,
  translations,
  communities,
  submitButtonId,
  submitButtonName,
  invalid,
  submitting,
  handleSubmit,
  change,
  formValues,
}) => {
  change(FORM_COMMUNITY, formValues[FORM_COMMUNITY]);
  change(FORM_TAGS, formValues[FORM_TAGS]);

  return (
    <Box onSubmit={handleSubmit(sendQuestion)}>
      <h4 className="header text-uppercase">{formTitle}</h4>
      <div>
        <Field
          name={FORM_TITLE}
          component={TextInputField}
          disabled={questionLoading}
          label={translations[messages.titleLabel.id]}
          validate={[strLength15x100, required]}
          warn={[strLength15x100, required]}
        />
        <Field
          name={FORM_CONTENT}
          component={TextEditorField}
          disabled={questionLoading}
          label={translations[messages.contentLabel.id]}
          validate={[strLength25x30000, required]}
          warn={[strLength25x30000, required]}
        />
        <Field
          name={FORM_COMMUNITY}
          label={translations[messages.communityLabel.id]}
          onChange={() => change(FORM_TAGS, '')}
          disabled={questionLoading}
          component={SelectField}
          options={communities}
          isSearchable
          isClearable
          validate={[required]}
          warn={[required]}
        />
        <Field
          name={FORM_TAGS}
          label={translations[messages.tagsLabel.id]}
          component={SelectField}
          disabled={questionLoading || !formValues[FORM_COMMUNITY]}
          options={
            (formValues[FORM_COMMUNITY] && formValues[FORM_COMMUNITY].tags) ||
            []
          }
          isSearchable
          isClearable
          isMulti
          validate={[required, strLength1x5]}
          warn={[required, strLength1x5]}
        />
      </div>
      <div>
        <button
          id={submitButtonId}
          type="submit"
          className="btn btn-success form-control"
          style={questionLoading ? { opacity: 0.5 } : null}
          disabled={invalid || submitting}
        >
          {questionLoading ? <LoadingIndicator /> : submitButtonName}
        </button>
      </div>
    </Box>
  );
};

QuestionForm.propTypes = {
  invalid: PropTypes.bool,
  formTitle: PropTypes.string,
  submitButtonId: PropTypes.string,
  submitButtonName: PropTypes.string,
  sendQuestion: PropTypes.func,
  change: PropTypes.func,
  submitting: PropTypes.bool,
  questionLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  translations: PropTypes.object,
  formValues: PropTypes.object,
  communities: PropTypes.array,
};

QuestionForm = reduxForm({})(QuestionForm);

QuestionForm = connect((state, props) => {
  let initialValues = {};
  let formValues = {};

  if (props.question) {
    initialValues = {
      [FORM_TITLE]: props.question.title,
      [FORM_CONTENT]: props.question.content,
      [FORM_COMMUNITY]: props.question.community,
      [FORM_TAGS]: props.question.chosenTags,
    };
  }

  const form = state.toJS().form[props.form];

  if (form) {
    formValues = form.values;
  }

  return {
    formValues,
    initialValues,
  };
})(QuestionForm);

export default QuestionForm;
