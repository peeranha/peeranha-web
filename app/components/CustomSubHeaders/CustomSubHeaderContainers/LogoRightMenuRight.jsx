import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import * as routes from 'routes-config';

import communitiesConfig from 'communities-config';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

import { Links } from '../CustomSubHeader';

import peeranhaLogo from 'images/LogoBlack.svg?inline';

const TopContainer = styled.div`
  display: flex;
  min-height: ${({ headerHeight }) => (headerHeight ? headerHeight - 80 : 0)}px;
`;

const TopLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-right: 20px;
`;

const TopMenuContainer = styled.div`
  flex: 1 1 0px;
  display: flex;
  justify-content: flex-end;

  > div {
    display: flex;
  }
`;

const SubHeaderLogo = styled.div`
  display: inline-block;

  img {
    width: 140px;
    height: 49px;
  }
`.withComponent(Link);

const LogoRightMenuRight = () => {
  const src = singleCommunityStyles().withoutSubHeader
    ? communitiesConfig[isSingleCommunityWebsite()].src
    : peeranhaLogo;

  const { links, styles } = singleCommunityStyles().customSubHeaderConfig;

  return (
    <TopContainer headerHeight={singleCommunityStyles().headerHeight}>
      <TopLogoContainer>
        <SubHeaderLogo to={routes.questions()}>
          <img src={src} alt="logo" />
        </SubHeaderLogo>
      </TopLogoContainer>
      <TopMenuContainer>
        {!!links && !!styles ? <Links links={links} styles={styles} /> : null}
      </TopMenuContainer>
    </TopContainer>
  );
};

export default LogoRightMenuRight;
