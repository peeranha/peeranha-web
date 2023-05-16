import React from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './Header.styled';

const Header: React.FC<{ notificationsNumber: number }> = ({
  notificationsNumber,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div css={styles.container}>
      <h3 css={styles.notificationsTitle}>{t('common.notificationCenter')}</h3>
      <span css={styles.notificationsNumber}>{notificationsNumber}</span>
    </div>
  );
};

export default Header;
