import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';
import { scrollToErrorField } from 'utils/animation';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import signUpMessages from 'containers/SignUp/messages';

import { validateEmail, required } from 'components/FormFields/validate';

import { EMAIL_FIELD, EMAIL_FORM, PASSWORD_FIELD } from './constants';

const EmailForm = ({
  handleSubmit,
  locale,
  sendEmail,
  sendEmailProcessing,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...commonMessages.show} />{' '}
      <FormattedMessage {...signUpMessages.eosOwnerPrivateKey} />
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

      <Field
        name={PASSWORD_FIELD}
        disabled={sendEmailProcessing}
        label={translationMessages[locale][signUpMessages.password.id]}
        component={TextInputField}
        validate={required}
        warn={required}
        type="password"
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
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailForm);

FormClone = connect((_, props) => ({
  enableReinitialize: true,
  initialValues: {
    [EMAIL_FIELD]: props.loginData.email,
  },
}))(FormClone);

export default FormClone;
