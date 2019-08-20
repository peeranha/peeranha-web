import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import signUpMessages from 'containers/SignUp/messages';

import {
  strLength3x20,
  required,
  validateEmail,
} from 'components/FormFields/validate';

import { NEW_EMAIL_FIELD, PASSWORD_FIELD } from './constants';

const ChangeEmailForm = ({
  handleSubmit,
  locale,
  changeEmail,
  changeEmailProcessing,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...commonMessages.change} />{' '}
      <FormattedMessage {...signUpMessages.email} />
    </H4>

    <form onSubmit={handleSubmit(changeEmail)}>
      <Field
        name={NEW_EMAIL_FIELD}
        disabled={changeEmailProcessing}
        label={translationMessages[locale][signUpMessages.email.id]}
        component={TextInputField}
        validate={[validateEmail, strLength3x20, required]}
        warn={[validateEmail, strLength3x20, required]}
      />

      <Field
        name={PASSWORD_FIELD}
        disabled={changeEmailProcessing}
        label={translationMessages[locale][signUpMessages.password.id]}
        component={TextInputField}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
        type="password"
      />

      <Button disabled={changeEmailProcessing} className="w-100 mb-3">
        <FormattedMessage {...commonMessages.submit} />
      </Button>
    </form>
  </div>
);

ChangeEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  changeEmail: PropTypes.func,
  locale: PropTypes.string,
  changeEmailProcessing: PropTypes.bool,
};

export default reduxForm({
  form: 'ChangeEmailForm',
})(ChangeEmailForm);
