import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://ipfs.tech/';

export const customSubHeaderConfig = {
  design: 'IPFS_style',
  styles: {
    bg: {
      header: '#FFFFFF',
      dropdown: '#FFFFFF',
    },
    color: {
      a: '#999999',
    },
    header: {
      background: '#FFFFFF',
    },
    subHeader: css`
      border-bottom: 1px solid #cecece;
      a,
      span {
        transition: all 0.3s ease-out;
      }
      a:hover,
      span:hover {
        color: #000000 !important;
        opacity: 1 !important;
      }
    `,
    subitems: css`
      left: 50% !important;
      top: 100% !important;
      padding: 25px 30px !important;
      border-radius: 3px !important;
      min-width: 100% !important;
      transform: translate(-50%, -5%) !important;
      animation: ani 0.3s both;
      @keyframes ani {
        0% {
          opacity: 0;
          transform: translate(-50%, -10%);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -5%);
        }
      }
      ::before {
        content: '';
        width: 20px;
        height: 20px;
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        transition: background-color 0.3s;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        background: #ffffff;
        z-index: 9999;
      }
      @media only screen and (max-width: 991px) {
        a {
          padding: 0 0 0 30px !important;
        }
      }
      @media only screen and (min-width: 992px) {
        a {
          padding: 5px 0 !important;
          line-height: 1.6 !important;
        }
      }
    `,
    subHeaderItem: css`
      position: relative;
      @media only screen and (min-width: 900px) {
        font-size: 14px;
      }
      @media only screen and (min-width: 1440px) {
        font-size: 15px;
      }
      font-weight: bold;
      > div {
        font-weight: normal;
      }
      padding: 10px 15px !important;
      @media only screen and (min-width: 992px) {
        padding: 0;
        margin-left: 30px;
        :first-child {
          margin-left: 0;
        }
      }
      margin: 0 !important;
    `,
    CustomSubHeader: css`
      margin: 0 !important;
    `,
    subHeaderContainerStyles: css``,
    topLogoContainerStyles: css`
      width: 80px !important;
      margin: 0 !important;
      margin-right: 60px !important;
      display: flex;
      justify-content: center;
      align-content: center;
    `,
    subHeaderLogoStyles: css`
      height: 40px;
      > img {
        height: 100%;
      }
    `,

    Highlighted: css``,
  },
  links: [
    {
      text: 'Store',
      href: `${domainName}/store/`,
    },
    {
      text: 'Provide',
      href: `${domainName}/provide/`,
    },
    {
      text: 'Build',
      href: `${domainName}/build/`,
      subitems: [
        {
          text: 'Docs',
          href: `${domainName}/build/#benefits-banner`,
        },
        {
          text: 'Tools & services',
          href: `${domainName}/build/#tools-and-more`,
        },
        {
          text: 'Grants',
          href: `${domainName}/build/#grants`,
        },
        {
          text: 'Roadmap',
          href: `${domainName}/build/#usp`,
        },
        {
          text: 'Videos',
          href: `${domainName}/build/#videos`,
        },
        {
          text: 'Sui Community',
          href: `${domainName}/build/#community`,
        },
        {
          text: 'Events',
          href: `${domainName}/build/#events`,
        },
      ],
    },
    {
      text: 'Blog',
      href: `${domainName}/provide/`,
    },
  ],
};

export const IPFSStyles = {
  name: 'ipfs',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/ipfs/ipfs-favicon.svg',
  favicon: 'https://images.peeranha.io/communities/ipfs/ipfs-favicon.svg',
  colors: {
    mainSubHeaderBgColor: 'rgba(39, 69, 95, 1)',
    mainBackground: 'rgba(241, 243, 242, 1)',
    linkColor: 'rgba(56, 119, 121, 1)',
    linkCookieColor: 'rgba(87, 185, 188, 1)',
    linkColorTransparent: 'rgba(56, 119, 121, 1)',
    headerPrimary: 'rgba(87, 185, 188, 1)',
    commentOption: 'rgba(56, 119, 121, 1)',
    contentHeader: 'rgba(87, 185, 188, 1)',
    blockedInfoArea: 'rgba(56, 119, 121, 1)',
    transparentIconColor: '#FFFF',
    loaderColor: 'rgba(56, 119, 121, 1)',
    votingIconColor: 'rgba(87, 185, 188, 1)',
    linkColorSecondary: 'rgba(56, 119, 121, 1)',
    walletButton: 'rgba(87, 185, 188, 0.1)',
    btnColor: 'rgba(87, 185, 188, 1)',
    btnHoverColor: 'rgba(87, 185, 188, 1)',
    btnHeaderColor: 'rgba(87, 185, 188, 1)',
    btnHeaderHoverColor: 'rgba(87, 185, 188, 1)',
    tagColor: 'rgba(87, 185, 188, 1)',
    localeArrowColor: 'rgba(255, 255, 255, 1)',
    textColor: 'rgba(56, 119, 121, 1)',
    textColorShadow: 'rgba(56, 119, 121, 1)',
    commHeadElemColor: 'rgba(255, 255, 255, 1)',
    commLangColor: 'rgba(87, 185, 188, 1)',
    tooltipColor: '#282828',
    darkBlue: 'rgba(56, 119, 121, 1)',
    paginationButtonBackgroundColor: 'rgba(56, 119, 121, 1)',
    paginationButtonTextColor: 'rgba(255, 255, 255, 1)',
    footerText: '#282828',
    footerBackgroundColor: 'rgba(241, 243, 242, 1)',
    userInformation: 'rgba(87, 185, 188, 0.1)',
    pinnedPostBackground: 'rgba(56, 119, 121, 1)',
    secondaryAdditional: 'rgba(56, 119, 121, 1)',
  },
  cookieConsentPopupStyles: {
    background: 'rgba(10, 27, 42, 1)',
    color: 'rgba(255, 255, 255, 1)',

    button: {
      color: 'rgba(255, 255, 255, 1)',
      borderColor: 'rgba(87, 185, 188, 1)',
      background: 'rgba(87, 185, 188, 1)',
      ':hover': {
        color: 'rgba(255,255,255, 1)',
        borderColor: 'rgba(87, 185, 188, 0.8)',
        background: 'rgba(87, 185, 188, 0.8)',
      },
    },
  },
  headerHeight: 80,
  // projectBorderRadius: '20px',
  domainName,
  communityBorderStyle: '2px solid rgba(56, 119, 121, 1)',
  dropDownIconStyles: css`
    path {
      stroke: rgba(87, 185, 188, 1) !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: rgba(87, 185, 188, 1);
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    border: 2px solid rgba(87, 185, 188, 1);
    color: rgba(87, 185, 188, 1);
    :hover {
      background: rgba(87, 185, 188, 1) !important;
    }
  `,
};
