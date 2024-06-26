import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://peeranha.io/';

export const customSubHeaderConfig = {
  design: 'Engenious_style',
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

export const EngeniousStyles = {
  name: 'engenious',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/engenious/engenious-logo.svg',
  favicon: 'https://images.peeranha.io/communities/engenious/engenious-favicon.svg',
  colors: {
    mainSubHeaderBgColor: 'rgba(255, 255, 255, 1)',
    mainBackground: 'rgba(238, 240, 246, 1)',
    linkColor: 'rgba(61, 64, 213, 1)',
    linkCookieColor: 'rgba(61, 64, 213, 1)',
    linkColorTransparent: 'rgba(61, 64, 213, 1)',
    headerPrimary: 'rgba(61, 64, 213, 1)',
    commentOption: 'rgba(61, 64, 213, 1)',
    contentHeader: 'rgba(61, 64, 213, 1)',
    blockedInfoArea: 'rgba(61, 64, 213, 1)',
    transparentIconColor: '#FFFF',
    loaderColor: 'rgba(61, 64, 213, 1)',
    votingIconColor: 'rgba(61, 64, 213, 1)',
    linkColorSecondary: 'rgba(61, 64, 213, 1)',
    walletButton: 'rgba(61, 64, 213, 1)',
    btnColor: 'rgba(61, 64, 213, 1)',
    btnHoverColor: 'rgba(61, 64, 213, 1)',
    btnHeaderColor: 'rgba(61, 64, 213, 1)',
    btnHeaderHoverColor: 'rgba(61, 64, 213, 1)',
    tagColor: 'rgba(61, 64, 213, 1)',
    localeArrowColor: 'rgba(61, 64, 213, 1)',
    textColor: 'rgba(61, 64, 213, 1)',
    textColorShadow: 'rgba(61, 64, 213, 1)',
    commHeadElemColor: 'rgba(20, 20, 22, 1)',
    commLangColor: 'rgba(61, 64, 213, 1)',
    tooltipColor: 'rgba(20, 20, 22, 1)',
    darkBlue: 'rgba(61, 64, 213, 1)',
    paginationButtonBackgroundColor: 'rgba(61, 64, 213, 1)',
    paginationButtonTextColor: 'rgba(255, 255, 255, 1)',
    footerText: 'rgba(20, 20, 22, 1)',
    footerBackgroundColor: 'rgba(238, 240, 246, 1)',
    userInformation: 'rgba(61, 64, 213, 0.05)',
    pinnedPostBackground: 'rgba(61, 64, 213, 1)',
    secondaryAdditional: 'rgba(61, 64, 213, 1)',
  },
  cookieConsentPopupStyles: {
    background: 'rgba(20, 20, 22, 1)',
    color: 'rgba(255, 255, 255, 1)',

    button: {
      color: 'rgba(255, 255, 255, 1)',
      borderColor: 'rgba(61, 64, 213, 1)',
      background: 'rgba(61, 64, 213, 1)',
      ':hover': {
        color: 'rgba(255,255,255, 1)',
        borderColor: 'rgba(61, 64, 213, 1)',
        background: 'rgba(61, 64, 213, 1)',
      },
    },
  },
  headerHeight: 80,
  // projectBorderRadius: '20px',
  domainName,
  communityBorderStyle: '2px solid rgba(61, 64, 213, 1)',
  dropDownIconStyles: css`
    path {
      stroke: rgba(61, 64, 213, 1) !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: rgba(61, 64, 213, 1);
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    border: 2px solid rgba(61, 64, 213, 1);
    color: rgba(61, 64, 213, 1);
    :hover {
      background: rgba(61, 64, 213, 1) !important;
    }
  `,
};
