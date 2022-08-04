import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { TEXT_PRIMARY } from 'style-constants';

import { scrollToErrorField } from 'utils/animation';

import Span from 'components/Span';
import TransparentButton from 'components/Button/Contained/TransparentSmall';

import { validateEmail, required } from 'components/FormFields/validate';

import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import Checkbox from 'components/Input/Checkbox';

import { EMAIL_FIELD, PASSWORD_FIELD, REMEMBER_ME_FIELD } from './constants';

import Header from './Header';
import Footer from './Footer';

const EmailPasswordForm = ({
  handleSubmit,
  login,
  loginWithEmailProcessing,
  showIForgotPasswordModal,
  loginWithWalletProcessing,
  loginWithWallet,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />

      <form onSubmit={handleSubmit(login)}>
        <Field
          name={EMAIL_FIELD}
          disabled={loginWithEmailProcessing || loginWithWalletProcessing}
          label={t('signUp.email')}
          component={TextInputField}
          validate={[validateEmail, required]}
          warn={[validateEmail, required]}
        />

        <Field
          name={PASSWORD_FIELD}
          disabled={loginWithEmailProcessing || loginWithWalletProcessing}
          label={t('signUp.password')}
          component={TextInputField}
          validate={required}
          warn={required}
          type="password"
        />

        <Button
          disabled={loginWithEmailProcessing || loginWithWalletProcessing}
          className="w-100 mb-3"
        >
          {t('signUp.continue')}
        </Button>

        <div className="d-flex align-items-center justify-content-between">
          <Field
            name={REMEMBER_ME_FIELD}
            disabled={loginWithEmailProcessing || loginWithWalletProcessing}
            component={Checkbox}
            label={
              <Span fontSize="14" lineHeight="20" color={TEXT_PRIMARY}>
                {t('login.staySignedIn')}
              </Span>
            }
          />

          <TransparentButton
            disabled={loginWithEmailProcessing || loginWithWalletProcessing}
            onClick={showIForgotPasswordModal}
            type="button"
          >
            {t('login.iForgotPassword')}
          </TransparentButton>
        </div>
      </form>

      <Footer
        walletAction={loginWithWallet}
        loginWithWalletProcessing={loginWithWalletProcessing}
        loginWithEmailProcessing={loginWithEmailProcessing}
      />
    </div>
  );
};

EmailPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  login: PropTypes.func,
  loginWithEmailProcessing: PropTypes.bool,
  showIForgotPasswordModal: PropTypes.func,
  loginWithWallet: PropTypes.func,
  loginWithWalletProcessing: PropTypes.bool,
};

const formName = 'EmailPasswordForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailPasswordForm);

FormClone = connect((state, props) => ({
  initialValues: {
    [EMAIL_FIELD]: props.email,
  },
}))(FormClone);

export default FormClone;
