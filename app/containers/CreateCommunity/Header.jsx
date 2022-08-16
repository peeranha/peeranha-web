import React from 'react';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';
import { TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';

import createCommunityHeader from 'images/communitiesHeader.svg?inline';
import closeIcon from 'images/closeCircle.svg?external';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';
import { MediumImageStyled } from 'components/Img/MediumImage';
import { IconMd } from 'components/Icon/IconWithSizes';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

export const Header = ({ headerDescriptor }) => {
  const { t } = useTranslation();
  const isSingleCommunityMode = !!isSingleCommunityWebsite();
  const nextRoute = isSingleCommunityMode ? routes.feed : routes.communities;

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumImageStyled src={createCommunityHeader} alt="Community icon" />
        {t(headerDescriptor || 'createCommunity.newCommunity')}
      </H3>

      <WrapperRightPanel className="right-panel">
        <A to={nextRoute()}>
          <button>
            <IconMd
              className="mr-1"
              icon={closeIcon}
              fill={BORDER_PRIMARY}
              isColorImportant={true}
            />
            <Span color={TEXT_PRIMARY} className="button-label">
              {t('common.close')}
            </Span>
          </button>
        </A>
      </WrapperRightPanel>
    </Wrapper>
  );
};

export default Header;
