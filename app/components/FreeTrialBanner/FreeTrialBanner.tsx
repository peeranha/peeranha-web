import React from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './FreeTrialBanner.styled';

import ideaBox from 'images/ideaBox.svg?inline';
type Props = {
  isMenuVisible: boolean;
};

const FreeTrialBanner = ({ isMenuVisible }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div css={{ ...styles.container, ...(isMenuVisible && styles.visibleMenu) }}>
      <h3 css={styles.h3}>{t('common.bannerText')}</h3>
      <img css={styles.img} src={ideaBox} />
      <a
        className="df jcc aic fz16"
        href="https://docs.google.com/forms/d/1CUJdcntRUtavuURb0fcvjakfhVDYl6Q5nSjESth_Evo/edit"
        target="_blank"
        css={styles.button}
      >
        {t('common.createCommunity')}
      </a>
    </div>
  );
};

export default FreeTrialBanner;
