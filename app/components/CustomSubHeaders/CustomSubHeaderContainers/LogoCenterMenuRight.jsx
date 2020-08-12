import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';

import communitiesConfig from 'communities-config';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

import peeranhaLogo from 'images/LogoBlack.svg?inline';

import { LocalLink, Subitems } from '../CustomSubHeader';

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopLeftContainer = styled.div`
  flex: 1 1 0px;
`;

const TopCenterContainer = styled.div`
  flex: 0 0 auto;
`;

const TopRightContainer = styled.div`
  flex: 1 1 0px;
  display: flex;
  justify-content: flex-end;

  > div {
    display: flex;
    align-items: center;
  }
`;

const SubHeaderLogo = styled.a`
  display: inline-block;

  img {
    width: 140px;
    height: 49px;
  }
`;

const NavItem = styled.div`
  position: relative;

  > div {
    left: auto;
    right: -20px;
  }

  :hover {
    > div {
      display: block;
    }
  }
`;

const Links = ({ links, styles }) => (
  <div>
    {links.map(({ text, href, isHighlighted, subitems }) => (
      <NavItem>
        {href ? (
          <LocalLink
            href={href}
            target="_blank"
            styles={styles}
            isHighlighted={isHighlighted}
          >
            {text}
          </LocalLink>
        ) : (
          <span>{text}</span>
        )}
        {subitems ? (
          <Subitems styles={styles.subitems}>
            <div>
              {subitems.map(({ text, href }) => (
                <LocalLink
                  styles={styles}
                  key={href}
                  href={href}
                  target="_blank"
                >
                  {text}
                </LocalLink>
              ))}
            </div>
          </Subitems>
        ) : null}
      </NavItem>
    ))}
  </div>
);

Links.propTypes = {
  links: PropTypes.array.isRequired,
  styles: PropTypes.object,
};

const LogoCenterMenuRight = () => {
  const src = singleCommunityStyles().withoutSubHeader
    ? communitiesConfig[isSingleCommunityWebsite()].src
    : peeranhaLogo;

  const { links, styles } = singleCommunityStyles().customSubHeaderConfig;

  return (
    <TopContainer>
      <TopLeftContainer />
      <TopCenterContainer>
        <SubHeaderLogo href={singleCommunityStyles().domainName}>
          <img src={src} alt="logo" />
        </SubHeaderLogo>
      </TopCenterContainer>
      <TopRightContainer>
        {!!links && !!styles ? <Links links={links} styles={styles} /> : null}
      </TopRightContainer>
    </TopContainer>
  );
};

export default LogoCenterMenuRight;
