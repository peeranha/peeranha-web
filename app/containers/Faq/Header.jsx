import React from 'react';
import * as routes from 'routes-config';
import { useTranslation } from 'react-i18next';

import { TEXT_PRIMARY } from 'style-constants';
import faqPageHeader from 'images/faqPageHeader.svg?inline';
import infoIcon from 'images/icon-information.svg?inline';

import { MediumImageStyled } from 'components/Img/MediumImage';
import H3 from 'components/H3';
import Span from 'components/Span';
import A from 'components/A';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumImageStyled src={faqPageHeader} alt="faq-header" />

        <span className="d-none d-md-inline-block">
          {t('common.faqPage.faq')}
        </span>

        <span className="d-inline-block d-md-none text-uppercase">
          {t('common.faq')}
        </span>
      </H3>

      <WrapperRightPanel className="right-panel">
        <A to={routes.support()}>
          <button>
            <img className="mr-1" src={infoIcon} alt="x" />
            <Span color={TEXT_PRIMARY} className="button-label">
              {t('common.support')}
            </Span>
          </button>
        </A>
      </WrapperRightPanel>
    </Wrapper>
  );
};

export default React.memo(Header);
