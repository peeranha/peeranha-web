import React from 'react';
import letterCompleteImg from 'images/EmailComplete.svg?inline';
import { useTranslation } from 'react-i18next';
import { styles } from './EmailNotifications.styled';
import { CHECK_EMAIL_IMG_ALT } from './constants';
const ChangeEmailForm: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div css={styles.changeEmailForm}>
      <h4>{t('profile.excellent')}</h4>
      <div>{t('profile.excellentText')}</div>
      <div>
        <img src={letterCompleteImg} alt={CHECK_EMAIL_IMG_ALT} />
      </div>
    </div>
  );
};

export default ChangeEmailForm;
