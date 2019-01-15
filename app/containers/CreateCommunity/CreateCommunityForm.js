import React from 'react';
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
export const CreateCommunityForm = sendProps => (
  <form onSubmit={sendProps.handleSubmit(sendProps.createCommunity)}>
    <div>
      <Field
        disabled={sendProps.createCommunityLoading}
        name={AVATAR_FIELD}
        label={sendProps.translations[messages.avatar.id]}
        component={AvatarField}
        sendProps={sendProps}
        validate={imageValidation}
        warn={imageValidation}
      />
      <Field
        disabled={sendProps.createCommunityLoading}
        name={NAME_FIELD}
        component={TextInputField}
        label={sendProps.translations[messages.name.id]}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
      />
      <Field
        disabled={sendProps.createCommunityLoading}
        name={DESCRIPTION_FIELD}
        component={TextareaField}
        label={sendProps.translations[messages.descriptionField.id]}
        validate={[strLength20x1000, required]}
        warn={[strLength20x1000, required]}
      />
    </div>
    <div>
      <button
        className="btn btn-success form-control"
        disabled={
          sendProps.invalid ||
          sendProps.submitting ||
          sendProps.createCommunityLoading
        }
        type="submit"
      >
        {sendProps.translations[messages.createCommunity.id]}
      </button>
    </div>
  </form>
);

export default reduxForm({
  form: 'CreateCommunityForm',
})(CreateCommunityForm);
