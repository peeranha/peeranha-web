import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';

import { AUTOLOGIN_DATA } from 'containers/Login/constants';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import signUpMessages from 'containers/SignUp/messages';

import { validateEmail, required } from 'components/FormFields/validate';

import { EMAIL_FIELD, EMAIL_FORM } from './constants';

const EmailForm = ({
  handleSubmit,
  locale,
  sendEmail,
  sendEmailProcessing,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...commonMessages.change} />{' '}
      <FormattedMessage {...signUpMessages.password} />
    </H4>

    <form onSubmit={handleSubmit(sendEmail)}>
      <Field
        name={EMAIL_FIELD}
        disabled
        label={translationMessages[locale][signUpMessages.email.id]}
        component={TextInputField}
        validate={[validateEmail, required]}
        warn={[validateEmail, required]}
      />

      <Button disabled={sendEmailProcessing} className="w-100 mb-3">
        <FormattedMessage {...commonMessages.submit} />
      </Button>
    </form>
  </div>
);

EmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendEmail: PropTypes.func,
  locale: PropTypes.string,
  sendEmailProcessing: PropTypes.bool,
};

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: EMAIL_FORM,
})(EmailForm);

FormClone = connect(() => ({
  initialValues: {
    [EMAIL_FIELD]: JSON.parse(localStorage.getItem(AUTOLOGIN_DATA)).email,
  },
}))(FormClone);

export default FormClone;
