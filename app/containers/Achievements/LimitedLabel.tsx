import React from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './Achievements.styled';

const LimitedLabel = (): JSX.Element => {
  const { t } = useTranslation();

  return <div css={styles.limitedLabel}>{t('common.limitedEdition')}</div>;
};

export default LimitedLabel;
