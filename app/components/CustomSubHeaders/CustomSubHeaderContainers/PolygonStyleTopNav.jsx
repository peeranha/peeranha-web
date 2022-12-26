import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import communitiesConfig from 'communities-config';
import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';
import peeranhaLogo from 'images/LogoBlack.svg?inline';
import polygonPoSLogo from 'communities-configs/polygon/images/polygon-pos.svg?inline';
import polygonEdgeLogo from 'communities-configs/polygon/images/polygon-edge.svg?inline';
import polygonAvailLogo from 'communities-configs/polygon/images/polygon-avail.svg?inline';
import polygonZeloLogo from 'communities-configs/polygon/images/polygon-zero.svg?inline';
import polygonMidenLogo from 'communities-configs/polygon/images/polygon-miden.svg?inline';
import polygonHermezLogo from 'communities-configs/polygon/images/polygon-hermez.svg?inline';
import polygonNightfallLogo from 'communities-configs/polygon/images/polygon-nightfall.svg?inline';
import {
  LocalLink,
  Subitems,
} from 'components/CustomSubHeaders/CustomSubHeader';

const logosSVG = {
  polygonPoS: polygonPoSLogo,
  polygonEdge: polygonEdgeLogo,
  polygonAvail: polygonAvailLogo,
  polygonZero: polygonZeloLogo,
  polygonMiden: polygonMidenLogo,
  polygonHermez: polygonHermezLogo,
  polygonNightfall: polygonNightfallLogo,
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SubHeaderNav = styled.div`
  display: flex;
  justify-content: flex-center;

  > div {
    display: flex;
    align-items: center;
    > div {
      padding: 0px 1rem 0px 0px;
      opacity: 1;
      a,
      span {
        line-height: 1.25;
        font-size: 0.9rem;
        letter-spacing: 0.4px;
      }
    }
    > div:hover {
      a,
      span {
        opacity: 1;
        color: var(--color-violet);
      }
    }
  }
`;

const SubHeaderNavButtons = styled.div`
  display: flex;
  justify-content: flex-center;
  > div {
    display: flex;
    align-items: center;
    > div {
      padding: 0;
      line-height: 1.25;
    }
    > div:hover {
      a {
        opacity: 1;
        color: var(--color-white);
        border-color: var(--color-violet);
        background-color: var(--color-violet) !important;
      }
    }
  }
`;

const SubHeaderLogo = styled.a`
  display: flex;
  justify-content: flex-center;
  img {
    width: 100%;
    height: auto;
  }
`;

const NavItem = styled.div`
  position: relative;
  z-index: 9999;
  > div {
    left: -8.2rem;
    right: -0px;
  }
  :hover {
    > div {
      display: block;
    }
  }
`;

const Links = ({ links, styles }) => (
  <div>
    {links.map(({ text, href, isHighlighted, subitems, target }) => (
      <NavItem key={href}>
        {href ? (
          <LocalLink
            href={href}
            target={target || '_blank'}
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
              {subitems.map((item) => (
                <LocalLink
                  styles={styles}
                  key={item.href}
                  href={item.href}
                  target={item.target || '_blank'}
                >
                  <img src={logosSVG[item.logo]} />
                  <div>
                    <h5>
                      {item.text} <span>{item.mode}</span>
                    </h5>
                    <p>{item.description}</p>
                  </div>
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
const PolygonStyleTopNav = () => {
  const src = singleCommunityStyles().withoutSubHeader
    ? communitiesConfig[isSingleCommunityWebsite()].src
    : peeranhaLogo;
  const { links, styles } = singleCommunityStyles().customSubHeaderConfig;
  return (
    <Container>
      <SubHeaderLogo href={singleCommunityStyles().domainName}>
        <img src={src} alt="logo" />
      </SubHeaderLogo>
      <SubHeaderNav>
        {!!links && !!styles ? (
          <Links
            links={links.filter((link) => !link.isHighlighted)}
            styles={styles}
          />
        ) : null}
      </SubHeaderNav>
      <SubHeaderNavButtons>
        {!!links && !!styles ? (
          <Links
            links={links.filter((link) => link.isHighlighted)}
            styles={styles}
          />
        ) : null}
      </SubHeaderNavButtons>
    </Container>
  );
};
export default PolygonStyleTopNav;
