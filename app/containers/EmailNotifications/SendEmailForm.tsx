import React from 'react';
import { reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import letterImg from 'images/letter.svg?inline';

import { SEND_EMAIL_FORM, CHECK_EMAIL_IMG_ALT } from './constants';
import { styles } from './EmailNotifications.styled';
import { SendEmailFormProps } from './types';

const SendEmailForm: React.FC<SendEmailFormProps> = ({
  handleSubmit,
  sendEmail,
  sendEmailProcessing,
  emailAddress,
  closeModal,
}): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div css={styles.sendEmailForm}>
      <h4>{t('common.confirmNewEmail')}</h4>
      <div>
        <img src={letterImg} alt={CHECK_EMAIL_IMG_ALT} />
        <p>{t('profile.verificationCodeText')}</p>
        <div>{emailAddress}</div>
      </div>
      <button css={styles.timerButton} onClick={closeModal}>
        {t('profile.changeEmail')}
      </button>
      <form onSubmit={handleSubmit(sendEmail)}>
        <button css={styles.verifyButton} disabled={sendEmailProcessing}>
          {t('profile.sendCode')}
        </button>
      </form>
    </div>
  );
};

export default reduxForm<any, any>({
  form: SEND_EMAIL_FORM,
})(SendEmailForm);
