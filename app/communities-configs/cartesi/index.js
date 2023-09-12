import React from 'react';
import { css } from 'styled-components';

const domainName = 'https://cartesi.io/';

export const customSubHeaderConfig = {
  design: 'cartesi_style',
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

export const CartesiStyles = {
  name: 'cartesi',
  withoutCopyright: true,
  withoutSubHeader: true,
  withoutAdditionalLinks: true,
  poweredByPeeranha: true,
  logoWhite: true,
  signUpPageLogo: 'https://images.peeranha.io/communities/cartesi/logo.svg',
  colors: {
    appWindowsColor: '#008DA5',
    appSafarieColor: '#008DA5',
    mainSubHeaderBgColor: 'rgb(255,255,255)',
    mainBackground: '#F1F7F9',
    border: '#D0DAE6',
    linkColor: '#008DA5',
    linkCookieColor: '#008DA5',
    linkColorTransparent: 'rgba(0, 141, 165, 0.4)',
    headerPrimary: '#008DA5',
    commentOption: '#008DA5',
    contentHeader: '#008DA5',
    blockedInfoArea: '#DAEEFF',
    transparentIconColor: '#FFFF',
    loaderColor: '#008DA5',
    votingIconColor: '#008DA5',
    linkColorSecondary: '#008DA5',
    walletButton: '#008DA5',
    btnColor: '#008DA5',
    btnHoverColor: '#008DA5',
    btnHeaderColor: '#1B1A1E',
    // btnHeaderHoverColor: '#008DA5',
    tagColor: '#008DA5',
    // localeArrowColor: '#95A3B0',
    textColor: '#008DA5',
    textColorShadow: '#008DA5',
    commHeadElemColor: '#1B1A1E',
    darkBlue: '#00F6FF',
    paginationButtonBackgroundColor: '#008DA5',
    footerBackgroundColor: '#1B1A1E',
    footerText: '#FFF',
    footerBorderColor: '#3D3C40',
    userInformation: 'rgba(0, 141, 165, 0.1)',
    pinnedPostBackground: '#00F6FF',
    newPostButtonText: '#FFF',
    secondaryAdditional: '#008DA5',
    newPostMediaBackgroundColor: 'rgba(0, 246, 255, 0.06)',
  },
  cookieConsentPopupStyles: {
    background: '#1B1A1E',
    color: '#FFF',

    button: {
      color: '#FFF',
      borderColor: '#008DA5',
      background: '#008DA5',
      ':hover': {
        background: '#FFF',
        color: '#008DA5',
        borderColor: '#008DA5',
      },
    },
  },
  headerHeight: 80,
  // projectBorderRadius: '20px',
  domainName,
  communityBorderStyle: '2px solid #008DA5',
  dropDownIconStyles: css`
    path {
      stroke: #008da5 !important;
      stroke-width: 1.5px;
      fill: none !important;
    }
    circle {
      stroke: #008da5;
      stroke-width: 1.5px;
      fill: none;
    }
  `,
  headerLoginButtonStyles: css`
    border: 1px solid #008da5;
    color: #008da5;
    :hover {
      background: #008da5 !important;
    }
  `,
  documentationColors: {
    headerBackground: '#008DA5',
    headerText: '#F3F3F3',
    buttonBackground: 'transparent',
    buttonText: '#F3F3F3',
    buttonBorder: '#F3F3F3',

    publishBackground: '#F3F3F3',
    publishText: '#008DA5',
    publishBackgroundHover: 'rgba(243,243,243,0.7)',
    publishTextHover: '#008DA5',

    linkColor: '#008DA5',
    iconsFillColor: '#008DA5',

    saveDraftButtonBackground: '#008DA5',
    saveDraftButtonText: '#008DA5',
    saveDraftButtonHover: '#008DA5',
  },
};
