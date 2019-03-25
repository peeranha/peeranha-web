import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';

import {
  required,
  strLength2x15,
  strLength20x1000,
} from 'components/FormFields/validate';

import messages from './messages';
import { NAME_FIELD, DESCRIPTION_FIELD } from './constants';

/* eslint-disable-next-line */
export const CreateTagForm = /* istanbul ignore next */ ({
  createTagLoading,
  invalid,
  submitting,
  createTag,
  handleSubmit,
  translations,
}) => (
  <form onSubmit={handleSubmit(createTag)}>
    <div>
      <Field
        disabled={createTagLoading}
        name={NAME_FIELD}
        component={TextInputField}
        label={translations[messages.name.id]}
        validate={[strLength2x15, required]}
        warn={[strLength2x15, required]}
      />
      <Field
        disabled={createTagLoading}
        name={DESCRIPTION_FIELD}
        component={TextareaField}
        label={translations[messages.descriptionField.id]}
        validate={[strLength20x1000, required]}
        warn={[strLength20x1000, required]}
      />
    </div>
    <div>
      <button
        className="btn btn-success form-control"
        disabled={invalid || submitting || createTagLoading}
        type="submit"
      >
        {translations[messages.createTag.id]}
      </button>
    </div>
  </form>
);

CreateTagForm.propTypes = {
  createTagLoading: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  createTag: PropTypes.func,
  handleSubmit: PropTypes.func,
  translations: PropTypes.object,
};

export default reduxForm({
  form: 'CreateTagForm',
})(CreateTagForm);
