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

import letterImg from 'images/letter.svg?inline';

import { OLD_EMAIL_FORM, OLD_EMAIL_FIELD } from './constants';
import { styles } from './ChangeEmail.styled';

const EmailForm = ({
  handleSubmit,
  sendOldEmail,
  sendOldEmailProcessing,
  emailAddress,
  closeModal,
}) => {
  const { t } = useTranslation();
  return (
    <div css={styles.sendEmailForm}>
      <H4>{t('common.confirmNewEmail')}</H4>
      <div>
        <img src={letterImg} alt="check your email" />
        <P>{t('profile.verificationCodeText')}</P>
        <div>{emailAddress}</div>
      </div>
      <TransparentButton onClick={closeModal}>
        {t('profile.changeEmail')}
      </TransparentButton>

      <form onSubmit={handleSubmit(sendOldEmail)}>
        <Button disabled={sendOldEmailProcessing}>
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
  emailAddress: PropTypes.string,
  closeModal: PropTypes.func,
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
