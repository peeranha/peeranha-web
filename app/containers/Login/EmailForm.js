import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';
import { scrollToErrorField } from 'utils/animation';

import scatterLogo from 'images/scatterLogo.svg?inline';

import { validateEmail, required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import SecondaryLargeButton from 'components/Button/Outlined/SecondaryLarge';
import P from 'components/P';
import H4 from 'components/H4';

import signupMessages from 'containers/SignUp/messages';

import { EMAIL_FIELD } from './constants';

import loginMessages from './messages';

export const LoginWithScatter = /* istanbul ignore next */ ({
  loginWithScatter,
}) => (
  <div className="pt-5">
    <P fontSize="14" className="text-center text-uppercase mb-3">
      <FormattedMessage {...signupMessages.or} />
    </P>

    <SecondaryLargeButton className="w-100" onClick={loginWithScatter}>
      <img src={scatterLogo} alt="scatter logo" />
    </SecondaryLargeButton>
  </div>
);

const EmailForm = /* istanbul ignore next */ ({
  handleSubmit,
  showEmailPasswordForm,
  locale,
  loginWithScatter,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...commonMessages.login} />
    </H4>

    <P className="py-3">
      <FormattedMessage {...loginMessages.authUserHasMore} />
    </P>

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
    </form>

    <LoginWithScatter loginWithScatter={loginWithScatter} />
  </div>
);

LoginWithScatter.propTypes = {
  loginWithScatter: PropTypes.func,
};

EmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  showEmailPasswordForm: PropTypes.func,
  loginWithScatter: PropTypes.func,
  locale: PropTypes.string,
};

export default reduxForm({
  form: 'EmailForm',
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailForm);
