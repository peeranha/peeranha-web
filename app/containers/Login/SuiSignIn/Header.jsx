import { styles } from 'containers/Login/Login.styled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';

import { graphCommunityColors } from 'utils/communityManagement';
const graphCommunity = graphCommunityColors();

const BoxComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 css={{ ...styles.signIn, ...(graphCommunity && { color: '#E1E1E4' }) }}>
        {t('common.signIn')}
      </h2>

      <span css={{ ...styles.hintText, ...(graphCommunity && { color: '#E1E1E4' }) }}>
        {t('login.walletInOne')}
      </span>
    </>
  );
};

export default BoxComponent;
