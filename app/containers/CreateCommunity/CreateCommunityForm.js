import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import AvatarField from 'components/FormFields/AvatarField';

import {
  imageValidation,
  strLength3x20,
  required,
  strLength20x1000,
} from 'components/FormFields/validate';

import messages from './messages';
import { AVATAR_FIELD, NAME_FIELD, DESCRIPTION_FIELD } from './constants';

/* eslint-disable-next-line */
export const CreateCommunityForm = /* istanbul ignore next */ ({
  handleSubmit,
  createCommunity,
  createCommunityLoading,
  translations,
  invalid,
  submitting,
}) => (
  <form onSubmit={handleSubmit(createCommunity)}>
    <div>
      <Field
        disabled={createCommunityLoading}
        name={AVATAR_FIELD}
        label={translations[messages.avatar.id]}
        component={AvatarField}
        validate={imageValidation}
        warn={imageValidation}
      />
      <Field
        disabled={createCommunityLoading}
        name={NAME_FIELD}
        component={TextInputField}
        label={translations[messages.name.id]}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
      />
      <Field
        disabled={createCommunityLoading}
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
        disabled={invalid || submitting || createCommunityLoading}
        type="submit"
      >
        {translations[messages.createCommunity.id]}
      </button>
    </div>
  </form>
);

CreateCommunityForm.propTypes = {
  handleSubmit: PropTypes.func,
  createCommunity: PropTypes.func,
  createCommunityLoading: PropTypes.bool,
  translations: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'CreateCommunityForm',
})(CreateCommunityForm);
