import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';

import P from 'components/P';
import H4 from 'components/H4';
import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';

import letterImg from 'images/letter-smile.svg?inline';

import { OLD_EMAIL_FORM, OLD_EMAIL_FIELD } from './constants';

const EmailForm = ({
  handleSubmit,
  locale,
  sendOldEmail,
  sendOldEmailProcessing,
  emailAddress,
  closeModal,
}) => {
  return (
    <div>
      <H4 className="text-center pb-3">{t('common.confirmNewEmail')}</H4>

      <div className="text-center pb-3">
        <img src={letterImg} alt="check your email" />
        <P
          className="text-center py-2"
          css={{ color: 'var(--color-gray-dark)' }}
        >
          {t('profile.verificationCodeText')}
        </P>
        <div className="semi-bold">{emailAddress}</div>
      </div>
      <TransparentButton
        onClick={closeModal}
        className="db mb-3"
        css={{ margin: 'auto' }}
      >
        {t('profile.changeEmail')}
      </TransparentButton>

      <form onSubmit={handleSubmit(sendOldEmail)}>
        <Button disabled={sendOldEmailProcessing} className="w-100 mb-3">
          {t('profile.sendCode')}
        </Button>
      </form>
    </div>
  );
};

EmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendOldEmail: PropTypes.func,
  sendOldEmailProcessing: PropTypes.bool,
};

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: OLD_EMAIL_FORM,
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(EmailForm);

FormClone = connect((_, props) => ({
  enableReinitialize: true,
  initialValues: {
    [OLD_EMAIL_FIELD]: props.loginData.email,
  },
}))(FormClone);

export default FormClone;
