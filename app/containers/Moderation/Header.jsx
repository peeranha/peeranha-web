import React from 'react';
import { useTranslation } from 'react-i18next';

import { APP_FONT, TEXT_DARK } from 'style-constants';
import { singleCommunityFonts } from 'utils/communityManagement';
import BaseRounded from 'components/Base/BaseRounded';

const fonts = singleCommunityFonts();

const titleStyles = {
  color: `${TEXT_DARK}`,
  fontWeight: '600',
  fontSize: '38px',
  lineHeight: '48px',
  display: 'flex',
  alignItems: 'center',
  fontFamily: `${fonts.h3 || APP_FONT}`,
  letterSpacing: `${fonts.h3LetterSpacing || APP_FONT}`,
  '@media only screen and (max-width: 576px)': {
    fontSize: '28px',
    lineHeight: '28px',
  },
};

const Header = () => {
  const { t } = useTranslation();
  return (
    <BaseRounded css={{ marginBottom: '16px' }}>
      <h3 css={titleStyles}>{t('common.moderationHeader')}</h3>
    </BaseRounded>
  );
};

export default Header;
