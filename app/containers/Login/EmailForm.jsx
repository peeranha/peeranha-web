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

import { EMAIL_FIELD } from './constants';

import Header from './Header';
import Footer from './Footer';
import IDontHaveAnAccount from './IdontHaveAnAccount';

const EmailForm = ({
  handleSubmit,
  showEmailPasswordForm,
  locale,
  loginWithScatter,
  loginWithScatterProcessing,
}) => (
  <div>
    <Header />

    <form onSubmit={handleSubmit(showEmailPasswordForm)}>
      <Field
        name={EMAIL_FIELD}
        label={translationMessages[locale][signupMessages.email.id]}
        component={TextInputField}
        validate={[validateEmail, required]}
        warn={[validateEmail, required]}
      />

      <Button className="w-100">
        <FormattedMessage {...signupMessages.continue} />
      </Button>

      <IDontHaveAnAccount />
    </form>

    <Footer action={loginWithScatter} processing={loginWithScatterProcessing} />
  </div>
);

EmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  showEmailPasswordForm: PropTypes.func,
  loginWithScatter: PropTypes.func,
  locale: PropTypes.string,
  loginWithScatterProcessing: PropTypes.bool,
};

export default reduxForm({
  form: 'EmailForm',
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailForm);
