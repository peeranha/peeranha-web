import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';

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
      <h4>{t('common.confirmNewEmail')}</h4>
      <div>
        <img src={letterImg} alt="check your email" />
        <p>{t('profile.verificationCodeText')}</p>
        <div>{emailAddress}</div>
      </div>
      <button css={styles.timerButton} onClick={closeModal}>
        {t('profile.changeEmail')}
      </button>

      <form onSubmit={handleSubmit(sendOldEmail)}>
        <button css={styles.verifyButton} disabled={sendOldEmailProcessing}>
          {t('profile.sendCode')}
        </button>
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
