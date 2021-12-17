import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import { scrollToErrorField } from 'utils/animation';

import { validateEmail, required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';

import signupMessages from 'containers/SignUp/messages';

import Header from './Header';
import { EMAIL_FIELD } from '../constants';
import messages from '../messages';

const EmailForm = ({
  handleSubmit,
  emailChecking,
  checkEmail,
  translations,
  modal,
}) => (
  <div>
    <Header />

    <form onSubmit={handleSubmit(checkEmail)} modal={modal}>
      <Field
        name={EMAIL_FIELD}
        label={translations[messages.email.id]}
        component={TextInputField}
        validate={[validateEmail, required]}
        warn={[validateEmail, required]}
        disabled={emailChecking}
      />

      <Button className="w-100" disabled={emailChecking}>
        <FormattedMessage {...signupMessages.continue} />
      </Button>
    </form>
  </div>
);

EmailForm.propTypes = {
  locale: PropTypes.string,
  handleSubmit: PropTypes.func,
  showEmailPasswordForm: PropTypes.func,
  loginWithWalletProcessing: PropTypes.bool,
  loginWithWallet: PropTypes.func,
  loginWithEmailProcessing: PropTypes.bool,
};

export default reduxForm({
  form: 'EmailForm',
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailForm);
