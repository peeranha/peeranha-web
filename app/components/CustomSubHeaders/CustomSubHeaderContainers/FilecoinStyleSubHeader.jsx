import React from 'react';
import styled from 'styled-components';

import communitiesConfig from 'communities-config';

import peeranhaLogo from 'images/LogoBlack.svg?inline';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

import { Links } from '../CustomSubHeader';

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: ${({ headerHeight }) => (headerHeight ? headerHeight - 80 : 0)}px;
  ${({ topContainerStyles }) => topContainerStyles};
`;

const TopLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-right: 20px;

  ${({ topLogoContainerStyles }) => topLogoContainerStyles};
`;

const TopMenuContainer = styled.div`
  flex: 1 1 0px;
  display: flex;
  justify-content: flex-start;
  width: 100%;

  > div {
    display: flex;
    width: 100%;
  }
`;

const SubHeaderLogo = styled.a`
  display: inline-block;

  img {
    width: 140px;
    height: 49px;
  }

  ${({ subHeaderLogoStyles }) => subHeaderLogoStyles};
`;

const LogoTitle = styled.span`
  ${({ styles }) => styles};
`;

const LogoRightMenuRight = () => {
  const src = singleCommunityStyles().withoutSubHeader
    ? communitiesConfig[isSingleCommunityWebsite()].src
    : peeranhaLogo;

  const { links, styles } = singleCommunityStyles().customSubHeaderConfig;
  const { logoTitleText, logoTitleStyles } = singleCommunityStyles();

  return (
    <TopContainer
      headerHeight={singleCommunityStyles().headerHeight}
      topContainerStyles={styles.topContainerStyles}
    >
      <TopLogoContainer topLogoContainerStyles={styles.topLogoContainerStyles}>
        <SubHeaderLogo
          href={singleCommunityStyles().domainName}
          subHeaderLogoStyles={styles.subHeaderLogoStyles}
        >
          <img src={src} alt="logo" />
          {logoTitleText && (
            <LogoTitle styles={logoTitleStyles}>{logoTitleText}</LogoTitle>
          )}
        </SubHeaderLogo>
      </TopLogoContainer>
      <TopMenuContainer>
        {!!links && !!styles ? (
          <Links
            links={links}
            styles={styles}
            isDropdownMenuArrow={singleCommunityStyles().isDropdownMenuArrow}
          />
        ) : null}
      </TopMenuContainer>
    </TopContainer>
  );
};

export default LogoRightMenuRight;
