import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';

import letterImg from 'images/letter-smile.svg?inline';

import P from 'components/P';
import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import signUpMessages from 'containers/SignUp/messages';

import { required } from 'components/FormFields/validate';

import { CODE_FIELD } from './constants';

const SubmitEmailForm = ({
  handleSubmit,
  locale,
  submitEmail,
  submitEmailProcessing,
  sendAnotherCode,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...commonMessages.change} />{' '}
      <FormattedMessage {...signUpMessages.password} />
    </H4>

    <div className="text-center pb-3">
      <img src={letterImg} alt="check your email" />
      <P className="text-center py-2">
        <FormattedMessage {...signUpMessages.checkYourEmail} />
      </P>
    </div>

    <form onSubmit={handleSubmit(submitEmail)}>
      <Field
        name={CODE_FIELD}
        disabled={submitEmailProcessing}
        label={translationMessages[locale][signUpMessages.verificationCode.id]}
        component={TextInputField}
        validate={required}
        warn={required}
      />

      <Button
        disabled={submitEmailProcessing}
        className="w-100 mb-3"
        type="submit"
      >
        <FormattedMessage {...commonMessages.submit} />
      </Button>

      <TransparentButton onClick={sendAnotherCode} type="button">
        <FormattedMessage {...commonMessages.sendAnotherCode} />
      </TransparentButton>
    </form>
  </div>
);

SubmitEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitEmail: PropTypes.func,
  sendAnotherCode: PropTypes.func,
  locale: PropTypes.string,
  submitEmailProcessing: PropTypes.bool,
};

export default reduxForm({
  form: 'SubmitEmailInChangePasswordForm',
})(SubmitEmailForm);
