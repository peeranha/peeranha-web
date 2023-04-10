import React from 'react';
import letterCompleteImg from 'images/EmailComplete.svg?inline';
import { useTranslation } from 'react-i18next';
import { styles } from './ChangeEmail.styled';

const ChangeEmailForm = () => {
  const { t } = useTranslation();

  return (
    <div css={styles.changeEmailForm}>
      <h4>{t('profile.excellent')}</h4>
      <div>{t('profile.excellentText')}</div>
      <div>
        <img src={letterCompleteImg} alt="check your email" />
      </div>
    </div>
  );
};

export default ChangeEmailForm;
