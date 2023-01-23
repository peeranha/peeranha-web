import React from 'react';
import { useTranslation } from 'react-i18next';

import { css } from '@emotion/react';
import * as routes from 'routes-config';
import { TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';

import createCommunityHeader from 'images/communitiesHeader.svg?external';
import closeIcon from 'images/closeCircle.svg?external';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import { IconMd } from 'components/Icon/IconWithSizes';
import Icon from 'components/Icon';
import {
  isSingleCommunityWebsite,
  singleCommunityColors,
} from 'utils/communityManagement';

const colors = singleCommunityColors();

export const Header = ({ headerDescriptor }) => {
  const { t } = useTranslation();
  const isSingleCommunityMode = !!isSingleCommunityWebsite();
  const nextRoute = isSingleCommunityMode ? routes.feed : routes.communities;

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumIconStyled>
          <Icon
            icon={createCommunityHeader}
            width="43"
            css={css` circle {stroke: ${colors.btnColor ||
              BORDER_PRIMARY}}; path {fill: ${colors.btnColor ||
              BORDER_PRIMARY}};`}
          />
        </MediumIconStyled>
        {t(headerDescriptor || 'createCommunity.newCommunity')}
      </H3>

      <WrapperRightPanel className="right-panel">
        <A to={nextRoute()}>
          <button>
            <IconMd
              className="mr-1"
              icon={closeIcon}
              fill={colors.btnColor || BORDER_PRIMARY}
              color={colors.btnColor || BORDER_PRIMARY}
              isColorImportant={true}
            />
            <Span
              color={colors.btnColor || TEXT_PRIMARY}
              className="button-label"
            >
              {t('common.close')}
            </Span>
          </button>
        </A>
      </WrapperRightPanel>
    </Wrapper>
  );
};

export default Header;
