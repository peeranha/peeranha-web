import React from 'react';
import { useTranslation } from 'react-i18next';

import tutorialPageHeader from 'images/tutorialPageHeader.svg?external';

import { MediumIconStyled } from 'components/Icon/MediumIcon';
import Icon from 'components/Icon';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumIconStyled>
          <Icon icon={tutorialPageHeader} width="38" />
        </MediumIconStyled>

        <span className="">{t('common.tutorial')}</span>
      </H3>
    </Wrapper>
  );
};

export default Header;
