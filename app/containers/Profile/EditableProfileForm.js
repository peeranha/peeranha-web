import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import renderTextInput from './renderTextInput';
import renderTextarea from './renderTextarea';
import renderFileInput from './renderFileInput';

import { imageValidation, strLength20, strLength96 } from './validate';

const EditableProfileForm = props => {
  const { handleSubmit, submitting, invalid } = props;

  return (
    <form submit={handleSubmit}>
      <div>
        <Field
          name="avatar"
          label="Avatar"
          component={renderFileInput}
          validate={imageValidation}
          warn={imageValidation}
        />
        <Field
          name="displayName"
          component={renderTextInput}
          label="Display name"
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          name="title"
          component={renderTextInput}
          label="Title"
          validate={strLength20}
          warn={strLength20}
        />
        <Field
          name="about"
          component={renderTextarea}
          label="About me"
          validate={strLength96}
          warn={strLength96}
        />
        <Field name="location" component={renderTextInput} label="Location" />
      </div>
      <div>
        <button
          className="btn btn-success form-control"
          disabled={invalid || submitting}
          type="submit"
        >
          Button
        </button>
      </div>
    </form>
  );
};

EditableProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'EditableProfileForm',
})(EditableProfileForm);
