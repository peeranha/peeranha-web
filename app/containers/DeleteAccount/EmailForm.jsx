import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';

import Cookies from 'utils/cookies';
import { STORED_EMAIL } from 'containers/Login/constants';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import signUpMessages from 'containers/SignUp/messages';

import {
  validateEmail,
  required,
  strLength3x20,
} from 'components/FormFields/validate';

import { EMAIL_FIELD, EMAIL_FORM } from './constants';

import messages from './messages';

const EmailForm = ({
  handleSubmit,
  locale,
  sendEmail,
  sendEmailProcessing,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...messages.deleteAccount} />
    </H4>

    <form onSubmit={handleSubmit(sendEmail)}>
      <Field
        name={EMAIL_FIELD}
        disabled
        label={translationMessages[locale][signUpMessages.email.id]}
        component={TextInputField}
        validate={[validateEmail, strLength3x20, required]}
        warn={[validateEmail, strLength3x20, required]}
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
    [EMAIL_FIELD]: Cookies.get(STORED_EMAIL),
  },
}))(FormClone);

export default FormClone;
