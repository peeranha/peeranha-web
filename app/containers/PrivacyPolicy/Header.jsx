import React from 'react';
import { useTranslation } from 'react-i18next';

import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>{t('common.privacyPolicy')}</H3>
    </Wrapper>
  );
};

export default Header;
