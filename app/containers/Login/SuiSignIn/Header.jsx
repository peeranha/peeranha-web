import { styles } from 'containers/Login/Login.styled';
import React from 'react';
import { useTranslation } from 'react-i18next';

const BoxComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 css={styles.signIn}>{t('common.signIn')}</h2>

      <span css={styles.hintText}>{t('login.walletInOne')}</span>
    </>
  );
};

export default BoxComponent;
