import React from 'react';

import { useTranslation } from 'react-i18next';
import BaseRounded from 'components/Base/BaseRounded';
import styles from './Moderation.styled';

const Header = () => {
  const { t } = useTranslation();
  return (
    <BaseRounded
      css={{
        ...styles.baseContainer,
        ...{
          border: 'none',
          background: 'none',
        },
      }}
    >
      <h3 css={styles.headerTitle}>{t('common.moderationHeader')}</h3>
    </BaseRounded>
  );
};

export default Header;
