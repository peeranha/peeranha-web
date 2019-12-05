import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';
import { TEXT_PRIMARY } from 'style-constants';

import { scrollToErrorField } from 'utils/animation';

import P from 'components/P';
import H4 from 'components/H4';
import Span from 'components/Span';
import TransparentButton from 'components/Button/Contained/TransparentSmall';

import { validateEmail, required } from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import Checkbox from 'components/Input/Checkbox';

import signupMessages from 'containers/SignUp/messages';

import { EMAIL_FIELD, PASSWORD_FIELD, REMEMBER_ME_FIELD } from './constants';

import loginMessages from './messages';

import { LoginWithScatter } from './EmailForm';

const EmailPasswordForm = /* istanbul ignore next */ ({
  handleSubmit,
  login,
  locale,
  loginProcessing,
  showIForgotPasswordModal,
  loginWithScatter,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...commonMessages.login} />
    </H4>

    <P className="py-3">
      <FormattedMessage {...loginMessages.authUserHasMore} />
    </P>

    <form onSubmit={handleSubmit(login)}>
      <Field
        name={EMAIL_FIELD}
        disabled={loginProcessing}
        label={translationMessages[locale][signupMessages.email.id]}
        component={TextInputField}
        validate={[validateEmail, required]}
        warn={[validateEmail, required]}
      />

      <Field
        name={PASSWORD_FIELD}
        disabled={loginProcessing}
        label={translationMessages[locale][signupMessages.password.id]}
        component={TextInputField}
        validate={required}
        warn={required}
        type="password"
      />

      <Button disabled={loginProcessing} className="w-100 mb-3">
        <FormattedMessage {...signupMessages.continue} />
      </Button>

      <div className="d-flex align-items-center justify-content-between">
        <Field
          name={REMEMBER_ME_FIELD}
          disabled={loginProcessing}
          component={Checkbox}
          label={
            <Span fontSize="14" lineHeight="20" color={TEXT_PRIMARY}>
              <FormattedMessage {...loginMessages.staySignedIn} />
            </Span>
          }
        />

        <TransparentButton onClick={showIForgotPasswordModal}>
          <FormattedMessage {...loginMessages.iForgotPassword} />
        </TransparentButton>
      </div>
    </form>

    <LoginWithScatter loginWithScatter={loginWithScatter} />
  </div>
);

EmailPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  login: PropTypes.func,
  locale: PropTypes.string,
  loginProcessing: PropTypes.bool,
  showIForgotPasswordModal: PropTypes.func,
  loginWithScatter: PropTypes.func,
};

const formName = 'EmailPasswordForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailPasswordForm);

FormClone = connect(
  /* istanbul ignore next */ (state, props) => ({
    initialValues: {
      [EMAIL_FIELD]: props.email,
    },
  }),
)(FormClone);

export default FormClone;
